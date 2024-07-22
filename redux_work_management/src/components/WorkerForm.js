import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createworker, updateworker } from '../reducer/workerReducers';
//import { useNavigate, useParams } from 'react-router-dom';

const WorkerForm = ({id, onClose}) => {
  // const { id } = useParams(); // Lấy id từ URL
  const workers = useSelector((state) => state.workers.workers); //Lấy danh sách sinh viên từ store
  //const worker = workers.find((worker) => worker.id === parseInt(id)); // Tìm sinh viên theo id parseInt
  const worker = workers.find((worker) => worker.id === id);

  const [workercode, setworkercode] = useState(worker ? worker.workercode : '');
  const [workername, setworkername] = useState(worker ? worker.workername : '');
  const [age, setage] = useState(worker ? worker.age : '');
  const [address, setaddress] = useState(worker ? worker.address : '');
  const [ban, setban] = useState(worker ? worker.ban : '');
  const [error, setError] = useState(''); // Biến trạng thái để lưu trữ thông báo lỗi

  const dispatch = useDispatch(); //useDispath để dispatch các action đến Redux store
  // const navigate = useNavigate(); //useNavigate để điều hướng

  const handleWorkercodeChange = (e) => {
    const value = e.target.value;
    //Nhận giá trị rỗng và số nguyên dương
    if (value === '' || (Number.isInteger(Number(value)) && Number(value) > 0)) {
      setworkercode(value);
    }
  };

  const handleAgeChange = (e) => {
    const value = e.target.value;
    // Chấp nhận cả giá trị trống và số nguyên dương
    if (value === '' || (Number.isInteger(Number(value)) && Number(value) > 0)) {
      setage(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); //Ngăn làm mới trang
    // Tìm nhân viên có mã nhân viên trùng với mã đang nhập vào và không phải là nhân viên hiện tại đang chỉnh sửa
    const duplicateWorker = workers.find((w) => w.workercode === workercode && w.id !== (worker ? worker.id : -1));
    if (duplicateWorker) {
      setError('Mã nhân viên không được trùng.');
      return;
    } //Nếu có trùng báo lỗi
    if (worker) {
      dispatch(updateworker({ id: worker.id,workercode, workername, age, address, ban }));
      //Nếu có thông tin là nhân viên đang chỉnh sửa thì cập nhật
    } else {
      const newworker = { workercode, workername, age, address, ban };
      dispatch(createworker(newworker));
      //Nếu không thì tạo mới
    }
    onClose();
  };

  useEffect(() => {
    if (worker) {
        setworkercode(worker.workercode);
        setworkername(worker.workername);
        setage(worker.age);
        setaddress(worker.address);
        setban(worker.ban);
        //Nếu công việc tồn tại thì cập nhật state bằng thông tin công việc
    }
  }, [worker]);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Mã nhân viên:</label>
        <input type="number" value={workercode} onChange={handleWorkercodeChange} step={1} required />
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
      <div>
        <label>Tên nhân viên:</label>
        <input type="text" value={workername} onChange={(e) => setworkername(e.target.value)} required />
      </div>
      <div>
        <label>Tuổi:</label>
        <input type="number" value={age} onChange={handleAgeChange} step={1} required />
      </div>
      <div>
        <label>Quê quán:</label>
        <input type="text" value={address} onChange={(e) => setaddress(e.target.value)} required />
      </div>
      <div>
        <label>Ban</label>
        <select value={ban} onChange={(e) => setban(e.target.value)} required>
            <option value="">--- Chọn ban ---</option>
            <option value="Công nghệ thông tin">Công nghệ thông tin</option>
            <option value="Đào tạo và PTNL">Đào tạo và PTNL</option>
            <option value="Tài Chính">Tài chính</option>
        </select>
      </div>
      <button type="submit">{worker ? 'Update worker' : 'Add worker'}</button>
    </form>
  );
};

export default WorkerForm;
