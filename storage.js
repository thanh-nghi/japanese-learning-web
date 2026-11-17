import { isValidVocabulary } from "./validators.js";

export function saveVocabularies(items) {
    localStorage.setItem("vocabularies", JSON.stringify(items));
}
export function loadVocabularies(fallback) {
    try {
        const savedVocab = localStorage.getItem("vocabularies");
        if (savedVocab === null) {
            return fallback;
        }
        const parsedVocab = JSON.parse(savedVocab);
        if (!Array.isArray(parsedVocab)) {
            return fallback;
        }
        for (const vocab of parsedVocab) {
            const isValid = isValidVocabulary(vocab);
            if (isValid === false) {
                return fallback;
            }
        } return parsedVocab
    } catch (error) {
        return fallback;
    }
}