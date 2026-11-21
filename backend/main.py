from fastapi import FastAPI

app = FastAPI()

@app.get("/hello")
def say_hello():
    return {"message": "Xin chao"}

@app.get("/health")
def health_check():
    return {"status": "ok"}