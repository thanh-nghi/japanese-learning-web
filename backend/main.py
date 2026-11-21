from fastapi import FastAPI, HTTPException

app = FastAPI()

@app.get("/hello")
def say_hello():
    return {"message": "Xin chao"}

@app.get("/health")
def health_check():
    return {"status": "ok"}

words = [
    {
        "id": 1,
        "word": "学生",
        "meaning": "học sinh, sinh viên"
    },
    {
        "id": 2,
        "word": "おうべい",
        "meaning": "Âu Mỹ"
    },
    {
        "id": 3,
        "word": "湯気",
        "meaning": "hơi nước"
    }
]

@app.get("/words")
def get_words():
    return words

@app.get("/words/{word_id}")
def get_word(word_id: int):
    for word in words:
        if word["id"] == word_id:
            return word
    raise HTTPException(status_code=404, detail="Không tìm thấy từ")