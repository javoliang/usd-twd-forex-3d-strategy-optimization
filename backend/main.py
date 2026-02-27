from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.data_service import router as data_router
from api.strategy import router as strategy_router

app = FastAPI(title="USD/TWD Smart Converter API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(data_router, prefix="/api")
app.include_router(strategy_router, prefix="/api")

@app.get("/")
def read_root():
    return {"status": "ok"}
