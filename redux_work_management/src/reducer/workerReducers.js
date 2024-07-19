import { createSlice } from "@reduxjs/toolkit";

//Khởi tạo
const initialState = {
    workers: [
        {id: 1, workercode: 111111, workername: 'Đỗ Văn Quý', age: 23, address: "Hải Dương", ban: 'Công nghệ thông tin'}
    ],
    nextId: 2,
};

//tạo slice cho workers
const workersSlice = createSlice({
    name: 'workers', //Tên slice
    initialState, //trạng thái ban đầu
    reducers: {
        getworkers: (state) => state, //Lấy danh sách sinh viên
        createworker: (state, action) => {
            state.workers.push({ id: state.nextId,...action.payload});
            state.nextId +=1;
            //spread để sao chép thuộc tính của payload vào công việc mới
        },
        updateworker: (state, action) => {
            const index = state.workers.findIndex(worker => worker.id === action.payload.id);
            if (index !== -1) {
                state.workers[index] = action.payload;
            }
            //Tìm công việc có id trùng với action.payload.id nếu có thì cập nhật dữ liệu từ payload
        },
        deleteworker: (state, action) => {
            state.workers = state.workers.filter(worker => worker.id !== action.payload);
            //Filter danh dách sinh viên để dữ lại sinh viên không trùng với action.payload
            // Cập nhật lại ID của các nhân viên sau khi xóa
            state.workers = state.workers.map((worker, index) => ({
                ...worker,
                id: index + 1
            }));
            // Cập nhật lại nextId
            state.nextId = state.workers.length + 1;
        },
    },
});

export const { getworkers, createworker, updateworker, deleteworker } = workersSlice.actions;
export default workersSlice.reducer;