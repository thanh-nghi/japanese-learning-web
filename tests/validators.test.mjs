import test from "node:test";
import assert from "node:assert/strict";
import { isValidVocabulary } from "../validators.js";

test("Chấp nhận từ vựng hợp lệ", function () {
    const item = {
        word: "学生",
        meaning: "sinh viên",
        reviewCount: 0
    };

    assert.strictEqual(isValidVocabulary(item), true);
});

test("Từ chối dữ liệu null", function () {
    const item = null

    assert.strictEqual(isValidVocabulary(item), false);
});

test("Từ chối từ chỉ chứa khoảng trắng", function () {
    const item = {
        word: " ",
        meaning: "con mèo",
        reviewCount: 0
    };

    assert.strictEqual(isValidVocabulary(item), false);
});

test("Từ chối số lần ôn âm", function () {
    const item = {
        word: "湯気",
        meaning: "hơi nước",
        reviewCount: -1
    };

    assert.strictEqual(isValidVocabulary(item), false);
});