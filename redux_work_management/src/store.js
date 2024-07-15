import { configureStore } from "@reduxjs/toolkit";
import workReducers from "./reducer/workReducers";

const store = configureStore({
    reducer: {
        works: workReducers,
    },
});

export default store; 