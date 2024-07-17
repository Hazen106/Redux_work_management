//Định nghĩ hành động cho công việc
export const getworkers = () => ({
    type: 'GET_WORKERS',
});

export const createworker = (worker) => ({
    type: 'CREATE_WORKER',
    payload: worker,
});

export const updateworker = (worker) => ({
    type: 'UPDATE_WORKER',
    payload: worker,
});

export const deleteworker = (id) => ({
    type: 'DELETE_WORKER',
    payload: id,
});