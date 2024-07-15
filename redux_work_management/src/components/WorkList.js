import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWorks } from "../actions/workActions";
import WorkTable from './WorkTable';
import {Link} from 'react-router-dom';

const WorkList = () => {
    const dispatch = useDispatch(); 
    const works = useSelector((state) => state.works.works); 

    useEffect(() => {
        dispatch(getWorks());
    }, [dispatch]); 

    return (
        <div>
            <h2>Danh sách công việc</h2>
            <Link to="/add">
                <button>Add</button> 
            </Link>
            <WorkTable works={works} /> 
        </div>
      );
};

export default WorkList;