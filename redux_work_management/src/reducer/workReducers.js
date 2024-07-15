import { createSlice } from "@reduxjs/toolkit";

//Khởi tạo
const initialState = {
    works: [
        {id: 1, workname: 'Tìm hiểu về Git', nameworker: 'Đỗ Văn Quý', complete: 'New'}
    ],
    nextId: 2,
};

//tạo slice cho works
const worksSlice = createSlice({
    name: 'works', //Tên slice
    initialState, //trạng thái ban đầu
    reducers: {
        getWorks: (state) => state,
        createWork: (state, action) => {
            state.works.push({ id: state.nextId,...action.payload, complete: 'New'});
            state.nextId +=1;
        },
        updateWork: (state, action) => {
            const index = state.works.findIndex(work => work.id === action.payload.id);
            if (index !== -1) {
                state.works[index] = action.payload;
            }
        },
        deleteWork: (state, action) => {
            state.works = state.works.filter(work => work.id !== action.payload);
        },
    },
});

export const { getWorks, createWork, updateWork, deleteWork } = worksSlice.actions;
export default worksSlice.reducer;