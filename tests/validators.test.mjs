import test from "node:test";
import assert from "node:assert/strict";
import { isValidVocabulary, isValidPost } from "../validators.js";

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

test("Chấp nhận post hợp lệ", function () {
    const item = {
        id: 1,
        title: "Bảng chữ cái",
        body: "aiueo"
    };

    assert.strictEqual(isValidPost(item), true);
});

test("Từ chối dữ liệu post null", function () {
    const item = null;

    assert.strictEqual(isValidPost(item), false);
});

test("Từ chối id:0", function () {
    const item = {
        id: 0,
        title: "Từ vựng N1",
        body: "Thực hành từ vựng N1"
    };

    assert.strictEqual(isValidPost(item), false);
});

test("Từ chối tile là number", function () {
    const item = {
        id: 2,
        title: 9,
        body: "Luyện tập từ vựng N1"
    };

    assert.strictEqual(isValidPost(item), false);
});