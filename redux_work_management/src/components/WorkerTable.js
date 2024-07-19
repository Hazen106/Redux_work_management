import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteworker, updateworker, createworker } from '../reducer/workerReducers';
import './WorkerTable.css';

const WorkerTable = ({ workers, onEdit }) => {
  const dispatch = useDispatch();
  const [newWorker, setNewWorker] = useState({ workercode: '', workername: '', age: '', address: '', ban: '' });
  const [error, setError] = useState('');
  const [EditingWorkerId, setEditingWorkerId] = useState('');

  const handleEditChange = (e, workerId, field) => {
    let value = e.target.value;
    if ((field === 'workercode' || field === 'age') && value < 0) {
      return;
    } //Kiểm tra có <0 không nếu có thì dừng không cập nhật
    const duplicateWorker = workers.find(worker => worker.workercode === value && worker.id !== workerId);
    if (duplicateWorker) {
      setError('Mã nhân viên không được trùng.');
      return;
    } //Kiểm tra xem có worker nào có trùng value mà không phải worker đang chỉnh sửa không
    const updatedWorkers = workers.map(worker => {
      if (worker.id === workerId) {
        return { ...worker, [field]: value };
      }
      return worker;
    }); //tạo bản sao danh sách nhân viên mới với nhân viên vừa cập nhật
    const updatedWorker = updatedWorkers.find(worker => worker.id === workerId);
    dispatch(updateworker(updatedWorker)); //dispath hành động cập nhật nhân viên
    setError('');
  };

  const handleNewWorkerChange = (e,workerId, field) => {
    let value = e.target.value;
    if ((field === 'workercode' || field === 'age') && value < 0) {
      return;
    }
    const duplicateWorker = workers.find(worker => worker.workercode === value && worker.id !== workerId);
    if (duplicateWorker) {
      setError('Mã nhân viên không được trùng.');
      return;
    } //Kiểm tra xem có worker nào có trùng value mà không phải worker đang chỉnh sửa không
    setNewWorker({ ...newWorker, [field]: value });
  }; //Kiểm tra xem có workercode bị trùng hay <0 không nếu có thì dừng lại không thì tạo bản sao dsnv với nhân viên mới

  const handleAddWorker = () => {
    const duplicateWorker = workers.find(worker => worker.workercode === newWorker.workercode);
    if (duplicateWorker) {
      setError('Mã nhân viên không được trùng.');
      return;
    }// Mã nv mới tạo không được trùng
    if (newWorker.workercode && newWorker.workername && newWorker.age && newWorker.address && newWorker.ban) {
      dispatch(createworker(newWorker));
      setNewWorker({ workercode: '', workername: '', age: '', address: '', ban: '' });
      setError('');
    }//cập nhật nv mới và set rạng thái về ban đầu
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm('Bạn có chắc chắn muốn xóa không?');
    if (confirmed) {
      dispatch(deleteworker(id));
    }
  };

  const handleEditSubmit = (workerId) => {
    setEditingWorkerId(null);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Mã nhân viên</th>
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
            <td>
              <input
                type="number"
                value={worker.workercode}
                onChange={(e) => handleEditChange(e, worker.id, 'workercode')}
                min="0"
              />
            </td>
            <td>
              <input
                type="text"
                value={worker.workername}
                onChange={(e) => handleEditChange(e, worker.id, 'workername')}
              />
            </td>
            <td>
              <input
                type="number"
                value={worker.age}
                onChange={(e) => handleEditChange(e, worker.id, 'age')}
                min="0"
              />
            </td>
            <td>
              <input
                type="text"
                value={worker.address}
                onChange={(e) => handleEditChange(e, worker.id, 'address')}
              />
            </td>
            <td>
              <select value={worker.ban} onChange={(e) => handleEditChange(e, worker.id, 'ban')}>
                <option value="Công nghệ thông tin">Công nghệ thông tin</option>
                <option value="Đào tạo và PTNL">Đào tạo và PTNL</option>
                <option value="Tài Chính">Tài chính</option>
              </select>
            </td>
            <td>
              <button onClick={() => onEdit(worker.id)}>Edit</button>
              <button onClick={() => handleDelete(worker.id)}>Delete</button>
              <button onClick={() => handleEditSubmit(worker.id)}>Submit Edit</button>
            </td>
          </tr>
        ))}
        <tr>
          <td>New</td>
          <td>
            <input
              type="number"
              value={newWorker.workercode}
              onChange={(e) => handleNewWorkerChange(e, 'workercode')}
              min="0"
            />
          </td>
          <td>
            <input
              type="text"
              value={newWorker.workername}
              onChange={(e) => handleNewWorkerChange(e, 'workername')}
            />
          </td>
          <td>
            <input
              type="number"
              value={newWorker.age}
              onChange={(e) => handleNewWorkerChange(e, 'age')}
              min="0"
            />
          </td>
          <td>
            <input
              type="text"
              value={newWorker.address}
              onChange={(e) => handleNewWorkerChange(e, 'address')}
            />
          </td>
          <td>
            <select value={newWorker.ban} onChange={(e) => handleNewWorkerChange(e, 'ban')}>
              <option value="">--- Chọn ban ---</option>
              <option value="Công nghệ thông tin">Công nghệ thông tin</option>
              <option value="Đào tạo và PTNL">Đào tạo và PTNL</option>
              <option value="Tài Chính">Tài chính</option>
            </select>
          </td>
          <td>
            <button onClick={handleAddWorker}>Add</button>
            {error && <p className="error">{error}</p>}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default WorkerTable;
