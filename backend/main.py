from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

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

class WordCreate(BaseModel):
    word: str = Field(min_length=1)
    meaning: str = Field(min_length=1)

@app.post("/words", status_code=201)
def create_word(data: WordCreate):
    max_id = 0
    if words != None:
        for word in words:
            if word["id"] > max_id:
                max_id = word["id"]
        new_id = max_id + 1
    else: new_id = 1

    new_word = {
        "id": new_id,
        "word": data.word,
        "meaning": data.meaning
    }

    words.append(new_word)
    return new_word
    

