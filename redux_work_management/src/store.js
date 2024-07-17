import { configureStore } from "@reduxjs/toolkit";
import workerReducers from "./reducer/workerReducers";

const store = configureStore({
    reducer: {
        workers: workerReducers,
    },
});

export default store; 