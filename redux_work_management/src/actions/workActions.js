//Định nghĩ hành động cho công việc
export const getWorks = () => ({
    type: 'GET_WORKS',
});

export const createWork = (work) => ({
    type: 'CREATE_WORK',
    payload: work,
});

export const updateWork = (work) => ({
    type: 'UPDATE_WORK',
    payload: work,
});

export const deleteWork = (id) => ({
    type: 'DELETE_WORK',
    payload: id,
});