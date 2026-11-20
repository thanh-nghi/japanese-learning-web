export function isValidPost(item) {
    if ((item === null) || (typeof item !== "object")) {
        return false;
    }
    if ((Number.isInteger(item.id)) && (item.id > 0) && (typeof item.title === "string") && (typeof item.body === "string")) {
        return true;
    } else {
        return false;
    }
}

export function isValidVocabulary(item) {
    if ((item === null) || (typeof item !== "object")) {
        return false;
    }
    if ((typeof item.word === "string") && (typeof item.meaning === "string")) {
        if ((item.word.trim() === "") || (item.meaning.trim() === "")) {
            return false;
        }
    } else {
        return false;
    }
    if (!Number.isInteger(item.reviewCount) || (item.reviewCount < 0)) {
        return false;
    }
    return true;
}
