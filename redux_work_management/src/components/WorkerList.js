import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getworkers } from "../actions/workerActions";
import WorkerTable from "./WorkerTable";
import Popup from "./Popup";
import WorkerForm from "./WorkerForm";
import { useState } from "react";
import './WorkerList.css';
//import {Link, useNavigate} from 'react-router-dom';
const WorkerList = () => {
    const dispatch = useDispatch(); 
    const workers = useSelector((state) => state.workers.workers); //Lấy danh sách công việc

    const [isPopupOpen, setPopupOpen] = useState(false);
    const [editWorkerId, setEditWorkerId] = useState(null);

    useEffect(() => {
        dispatch(getworkers()); //Lấy danh sách công việc khi component được mount
    }, [dispatch]); //chạy callback khi mảng được thay đổi

    const openPopup = (id = null) => {
        setEditWorkerId(id);
        setPopupOpen(true);
    };

    const closePopup = () => {
        setEditWorkerId(null);
        setPopupOpen(false);
    };

    return (
        
        <div className="woker-list">
            <h1 className="page-title">Quản lý nhân viên</h1>
            <h2 className="section-title">Danh sách nhân viên</h2>
            {/* <Link to="/add">
                <button>Add</button> 
            </Link>
            <WorkerTable workers={workers} />  */}
            <button onClick={() => openPopup()}>Add with Popup</button>
            <WorkerTable workers={workers} onEdit={openPopup}/>
            <Popup isOpen={isPopupOpen} onClose={closePopup}>
                <WorkerForm id={editWorkerId} onClose={closePopup}></WorkerForm>
            </Popup>
        </div>
      );
};

export default WorkerList;