import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteworker } from '../reducer/workerReducers';
import { Link } from 'react-router-dom'; // Import Link từ react-router-dom
import './WorkerTable.css';

const WorkerTable = ({ workers }) => {
  const dispatch = useDispatch(); //Nhận prop để dispatch action

  const handleDelete = (id) => {
    const confimed = window.confirm("Bạn có chắc chắn muốn xóa không?")
    if (confimed){
      dispatch(deleteworker(id));  //Nhận id dispatch hành động deleteworker
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Tên nhân viên</th>
          <th>Tuổi</th>
          <th>Quê quán</th>
          <th>Ban</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {workers.map((worker) => (
          <tr key={worker.id}>
            <td>{worker.id}</td>
            <td>{worker.workername}</td>
            <td>{worker.age}</td>
            <td>{worker.address}</td>
            <td>{worker.ban}</td>
            <td>
              <Link to={`/edit/${worker.id}`}>
                <button>Edit</button>
              </Link>
              <button onClick={() => handleDelete(worker.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default WorkerTable;
