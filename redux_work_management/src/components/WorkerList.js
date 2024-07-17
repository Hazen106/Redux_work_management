import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getworkers } from "../actions/workerActions";
import WorkerTable from "./WorkerTable";
import {Link} from 'react-router-dom';

const WorkerList = () => {
    const dispatch = useDispatch(); 
    const workers = useSelector((state) => state.workers.workers); //Lấy danh sách công việc

    useEffect(() => {
        dispatch(getworkers()); //Lấy danh sách công việc khi component được mount
    }, [dispatch]); //chạy callback khi mảng được thay đổi

    return (
        <div>
            <h2>Danh sách nhân viên</h2>
            <Link to="/add">
                <button>Add</button> 
            </Link>
            <WorkerTable workers={workers} /> 
        </div>
      );
};

export default WorkerList;