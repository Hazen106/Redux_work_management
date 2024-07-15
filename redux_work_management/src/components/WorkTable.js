import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteWork } from '../reducer/workReducers';
import { Link } from 'react-router-dom'; // Import Link từ react-router-dom
import './WorkTable.css';

const WorkTable = ({ works }) => {
  const dispatch = useDispatch(); 

  const handleDelete = (id) => {
    dispatch(deleteWork(id)); 
  };

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Tên công việc</th>
          <th>Người thực hiện</th>
          <th>Tình trạng</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {works.map((work) => (
          <tr key={work.id}>
            <td>{work.id}</td>
            <td>{work.workname}</td>
            <td>{work.nameworker}</td>
            <td>{work.complete}</td>
            <td>
              <Link to={`/edit/${work.id}`}>
                <button>Edit</button>
              </Link>
              <button onClick={() => handleDelete(work.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default WorkTable;
