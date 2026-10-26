const assert = require("node:assert/strict");
const test = require("node:test");
const { greeting } = require("../src/greeting");

test("greets a named user", () => {
  assert.equal(greeting("Mona"), "Hello, Mona!");
});

test("greets the world by default", () => {
  assert.equal(greeting(), "Hello, world!");
});
