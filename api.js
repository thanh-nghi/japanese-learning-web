import { isValidPost } from "./validators.js";

export async function fetchPost(postId) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    if (!response.ok) {
        throw new Error(`Lỗi ${response.status}`)
    }
    const post = await response.json();
    const isValid = isValidPost(post);
    if (isValid === false) {
        throw new Error("Dữ liệu bài viết không hợp lệ")
    }
    return post;
}

export async function fetchPosts() {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!response.ok) {
        throw new Error(`Lỗi: ${response.status}`);
    }
    const posts = await response.json();
    if (!Array.isArray(posts)) {
        throw new Error("Không tải được danh sách bài viết");
    }
    for (const post of posts) {
        const isValid = isValidPost(post);
        if (isValid === false) {
            throw new Error("Bài viết không hơp lệ");
        }
    }
    return posts;
}