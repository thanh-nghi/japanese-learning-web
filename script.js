import { fetchPost, fetchPosts } from "./api.js";
import { saveVocabularies, loadVocabularies } from "./storage.js";
const greeting = "Xin chào";
console.log(greeting);
const japaneseWord = "学生";
const meaning = "sinh viên";
console.log(japaneseWord);
console.log(meaning);

let reviewCount = 0;
console.log(reviewCount);
reviewCount += 1;
console.log(reviewCount);

const vocabularySummary = `${japaneseWord} - ${meaning} (đã ôn ${reviewCount} lần)`;
console.log(vocabularySummary);

function checkReview(count) {
    if (count >= 3) {
        return ("Đã ôn đủ");
    } else {
        return ("Cần ôn thêm");
    }
}

const reviewCounts = [0, 1, 3, 4];
for (const count of reviewCounts) {
    console.log(`${count} lần: ${checkReview(count)}`);
}

const vocabulary = {
    word: "学生",
    meaning: "sinh viên",
    reviewCount: 1
};

console.log(`${vocabulary.word} - ${vocabulary.meaning}: ${checkReview(vocabulary.reviewCount)}`)
vocabulary.reviewCount = 3;
console.log(`${vocabulary.word} - ${vocabulary.meaning}: ${checkReview(vocabulary.reviewCount)}`)

let vocabularies = [
    { word: "学生", meaning: "sinh viên", reviewCount: 1 },
    { word: "日本語", meaning: "tiếng Nhật", reviewCount: 3 },
    { word: "本", meaning: "sách", reviewCount: 0 },
    { word: "私", meaning: "tôi", reviewCount: 3 },
    { word: "旅行する", meaning: "đi du lịch", reviewCount: 2 }
]

vocabularies = loadVocabularies(vocabularies);

for (const vocabulary of vocabularies) {
    console.log(`${vocabulary.word} - ${vocabulary.meaning}: ${checkReview(vocabulary.reviewCount)}`)
}

for (const vocabulary of vocabularies) {
    if ((vocabulary.reviewCount < 3) && (vocabulary.word === "学生")) {
        vocabulary.reviewCount = 3
    }
    console.log(`${vocabulary.word} - ${vocabulary.meaning}: ${checkReview(vocabulary.reviewCount)}`)
}

const element = document.querySelector("#vocabulary-count");
element.textContent = `Có ${vocabularies.length} từ vựng`

const button = document.querySelector("#show-meaning");
const meaningElement = document.querySelector("#word-meaning");

let isMeaningVisible = false;
function showMeaning() {
    if (vocabularies.length === 0) {
        meaningElement.textContent = "Chưa có từ để hiện nghĩa"
        return;
    }
    isMeaningVisible = !isMeaningVisible
    if (isMeaningVisible) {
        meaningElement.textContent = vocabularies[0].meaning;
        button.textContent = "Ẩn nghĩa";
    } else {
        meaningElement.textContent = "Chưa hiện nghĩa";
        button.textContent = "Hiện nghĩa";
    }
}

button.addEventListener("click", showMeaning)

const searchInput = document.querySelector("#vocabulary-search");
const searchStatus = document.querySelector("#search-status");

const vocabularyList = document.querySelector("#vocabulary-list");

function renderVocabularyList() {
    vocabularyList.textContent = "";
    const keyword = searchInput.value.trim().toLowerCase();
    let matchedCount = 0;
    for (const vocabulary of vocabularies) {
        if ((vocabulary.word.toLocaleLowerCase().includes(keyword)) || (vocabulary.meaning.toLocaleLowerCase().includes(keyword))) {
            const item = document.createElement("li");
            matchedCount += 1;
            item.textContent = `${vocabulary.word} - ${vocabulary.meaning}`;
            vocabularyList.appendChild(item);
        }
    }
    return matchedCount;
}

function updateSearch() {
    const keyword = searchInput.value.trim();
    const matchedCount = renderVocabularyList();
    element.textContent = `Có ${matchedCount}/${vocabularies.length} từ vựng`

    if (keyword === "") {
        searchStatus.textContent = "Nhập từ để tìm";
    } else if (matchedCount == 0) {
        searchStatus.textContent = "Không tìm thấy từ phù hợp"
    } else {
        searchStatus.textContent = `Đang tìm: ${keyword}`
    }
}

searchInput.addEventListener("input", updateSearch);
updateSearch();

function handleSubmit(event) {
    event.preventDefault();
    const newWord = document.querySelector("#new-word");
    const newMeaning = document.querySelector("#new-meaning");
    const formStatus = document.querySelector("#form-status");
    if ((newWord.value.trim() == "") || (newMeaning.value.trim() == "")) {
        formStatus.textContent = "Nhập đủ từ và nghĩa";
    } else {
        const wordToCheck = newWord.value.trim().toLowerCase();
        for (const vocabulary of vocabularies) {
            if (wordToCheck === vocabulary.word.trim().toLowerCase()) {
                formStatus.textContent = "Từ này đã có";
                return;
            }
        }
        const vocab = { word: newWord.value.trim(), meaning: newMeaning.value.trim(), reviewCount: 0 };
        vocabularies.push(vocab);
        saveVocabularies(vocabularies);
        searchInput.value = "";
        updateSearch();
        formStatus.textContent = `Đã thêm ${newWord.value.trim()} - ${newMeaning.value.trim()}`;
        newWord.value = "";
        newMeaning.value = "";
    }
}

const form = document.querySelector("#add-vocabulary-form");
form.addEventListener("submit", handleSubmit);

let isLoadingPost = false;

async function loadPost() {
    if (isLoadingPost === true) {
        return;
    }
    apiTitle.textContent = "";
    apiBody.textContent = "";
    const postId = Number(postInput.value);
    if (!Number.isInteger(postId) || postId <= 0) {
        apiStatus.textContent = "Nhập mã bài là số nguyên dương";
        return;
    }
    try {
        apiStatus.textContent = "Đang tải...";
        loadPostButton.disabled = true;
        isLoadingPost = true;
        postInput.disabled = true;
        const post = await fetchPost(postId);
        apiTitle.textContent = post.title;
        apiBody.textContent = post.body;
        apiStatus.textContent = "Đã tải bài viết";
        console.log(post.id, post.title);
    } catch (error) {
        console.error("Không tải được bài viết", error);
        apiStatus.textContent = `Có lỗi ${error.message}`;
    } finally {
        loadPostButton.disabled = false;
        isLoadingPost = false;
        postInput.disabled = false;
    }
}
const apiStatus = document.querySelector("#api-status");
const apiTitle = document.querySelector("#api-title");
const apiBody = document.querySelector("#api-body");
const loadPostButton = document.querySelector("#load-post");
loadPostButton.addEventListener("click", loadPost);
const postInput = document.querySelector("#post-id");
loadPost();

function renderPosts(posts) {
    postsList.textContent = "";
    for (const post of posts) {
        const postItem = document.createElement("li");
        postItem.textContent = `${post.id} - ${post.title}`;
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = "Xem bài";
        button.addEventListener("click", function () {
            if (isLoadingPost === true) {
                return;
            }
            postInput.value = post.id;
            loadPost();
        })
        postItem.appendChild(button);
        postsList.appendChild(postItem);
    }
}

let allPosts = [];


const postSearch = document.querySelector("#post-search");

const postsStatus = document.querySelector("#post-status");
const postsList = document.querySelector("#posts-list");
const reloadPosts = document.querySelector("#reload-posts");

function searchPosts(keyword) {
    const normalizeKeyword = keyword.trim().toLowerCase();
    let li = [];
    for (const post of allPosts) {
        if (post.title.toLowerCase().includes(normalizeKeyword)) {
            li.push(post)
        }
    }
    return li;
}

function updatePostSearch() {
    const list = searchPosts(postSearch.value);
    renderPosts(list);
    postsStatus.textContent = `Có ${list.length}/${allPosts.length} bài viết`;
}
postSearch.addEventListener("input", updatePostSearch);


async function loadPosts() {
    try {
        postsList.textContent = "";
        postsStatus.textContent = "Đang tải...";
        postSearch.disabled = true;
        reloadPosts.disabled = true;
        const posts = await fetchPosts();
        allPosts = posts;
        updatePostSearch();
    } catch (error) {
        console.error("Không tải được danh sách bài viết", error);
        postsStatus.textContent = `Có lỗi: ${error.message}`;
        allPosts = [];
    } finally {
        postSearch.disabled = false;
        reloadPosts.disabled = false;
    }
}
reloadPosts.addEventListener("click", loadPosts);

loadPosts();

