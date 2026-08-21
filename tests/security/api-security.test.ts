/**
 * Security regression tests — run: npm run test:security
 */
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  sanitizeHttpsUrl,
  safeJsonLdStringify,
  stripToPlainText,
} from "../../src/lib/news/sanitize.ts";
import { assertSameOrigin } from "../../src/lib/news/auth.ts";
import { newsAdminPasswordConfigured } from "../../src/lib/news/config.ts";
import { clampField, isEmail, checkSpam } from "../../src/lib/form-guard.ts";

describe("sanitizeHttpsUrl — SSRF / injection", () => {
  it("allows public https URLs", () => {
    assert.equal(
      sanitizeHttpsUrl("https://example.com/a"),
      "https://example.com/a",
    );
  });

  it("rejects http, javascript, data", () => {
    assert.equal(sanitizeHttpsUrl("http://example.com"), null);
    assert.equal(sanitizeHttpsUrl("javascript:alert(1)"), null);
    assert.equal(sanitizeHttpsUrl("data:text/html,hi"), null);
  });

  it("rejects private / metadata hosts", () => {
    assert.equal(sanitizeHttpsUrl("https://127.0.0.1/x"), null);
    assert.equal(sanitizeHttpsUrl("https://localhost/x"), null);
    assert.equal(sanitizeHttpsUrl("https://169.254.169.254/latest"), null);
    assert.equal(sanitizeHttpsUrl("https://10.0.0.5/secret"), null);
    assert.equal(sanitizeHttpsUrl("https://192.168.1.1/"), null);
    assert.equal(sanitizeHttpsUrl("https://172.16.0.1/"), null);
    assert.equal(sanitizeHttpsUrl("https://metadata.google.internal/"), null);
  });

  it("rejects userinfo and non-string (NoSQL-style) input", () => {
    assert.equal(sanitizeHttpsUrl("https://user:pass@example.com/"), null);
    assert.equal(sanitizeHttpsUrl({ $ne: null } as unknown as string), null);
    assert.equal(sanitizeHttpsUrl(["https://evil.com"] as unknown as string), null);
  });
});

describe("stripToPlainText — XSS / mass fields", () => {
  it("strips HTML tags", () => {
    const out = stripToPlainText('<script>alert(1)</script>Hello', 200);
    assert.ok(!out.includes("<script>"));
    assert.ok(out.includes("Hello"));
  });

  it("enforces max length", () => {
    assert.equal(stripToPlainText("a".repeat(500), 10).length, 10);
  });
});

describe("safeJsonLdStringify — script breakout", () => {
  it("escapes angle brackets", () => {
    const s = safeJsonLdStringify({ name: "</script><script>alert(1)</script>" });
    assert.ok(!s.includes("</script>"));
    assert.ok(s.includes("\\u003c"));
  });
});

describe("assertSameOrigin — CSRF", () => {
  it("allows matching Origin", () => {
    const req = new Request("https://headoversea.com/api/news/admin/login", {
      method: "POST",
      headers: { Origin: "https://headoversea.com" },
    });
    assert.equal(assertSameOrigin(req), true);
  });

  it("rejects foreign Origin", () => {
    const req = new Request("https://headoversea.com/api/news/admin/login", {
      method: "POST",
      headers: { Origin: "https://evil.example" },
    });
    assert.equal(assertSameOrigin(req), false);
  });
});

describe("form validation", () => {
  it("rejects oversized / invalid email", () => {
    assert.equal(isEmail("a@b.co"), true);
    assert.equal(isEmail("not-an-email"), false);
    assert.equal(isEmail("a".repeat(250) + "@x.com"), false);
  });

  it("clamps fields", () => {
    assert.equal(clampField("abcdefghij", 5), "abcde");
  });

  it("rejects honeypot and stale timing", () => {
    assert.equal(checkSpam({ honeypot: "bot", formStartedAt: Date.now() - 5000 }).spam, true);
    assert.equal(
      checkSpam({ formStartedAt: Date.now() - 48 * 60 * 60 * 1000 }).spam,
      true,
    );
    assert.equal(
      checkSpam({ formStartedAt: Date.now() - 3000 }).spam,
      false,
    );
  });
});

describe("admin password bootstrap removed", () => {
  it("reports unconfigured when env password vars absent", () => {
    const before = {
      p: process.env.NEWS_ADMIN_PASSWORD,
      s: process.env.NEWS_ADMIN_PASSWORD_SHA256,
      c: process.env.NEWS_ADMIN_CREDENTIALS,
      h: process.env.NEWS_ADMIN_PASSWORD_HASH,
      b: process.env.NEWS_ADMIN_PASSWORD_HASH_B64,
    };
    delete process.env.NEWS_ADMIN_PASSWORD;
    delete process.env.NEWS_ADMIN_PASSWORD_SHA256;
    delete process.env.NEWS_ADMIN_CREDENTIALS;
    delete process.env.NEWS_ADMIN_PASSWORD_HASH;
    delete process.env.NEWS_ADMIN_PASSWORD_HASH_B64;
    try {
      assert.equal(newsAdminPasswordConfigured(), false);
    } finally {
      if (before.p) process.env.NEWS_ADMIN_PASSWORD = before.p;
      if (before.s) process.env.NEWS_ADMIN_PASSWORD_SHA256 = before.s;
      if (before.c) process.env.NEWS_ADMIN_CREDENTIALS = before.c;
      if (before.h) process.env.NEWS_ADMIN_PASSWORD_HASH = before.h;
      if (before.b) process.env.NEWS_ADMIN_PASSWORD_HASH_B64 = before.b;
    }
  });
});
