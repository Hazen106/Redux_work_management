import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createworker, updateworker } from '../reducer/workerReducers';
import { useNavigate, useParams } from 'react-router-dom';

const WorkerForm = () => {
  const { id } = useParams(); // Lấy id từ URL
  const workers = useSelector((state) => state.workers.workers); //Lấy danh sách sinh viên từ store
  const worker = workers.find((worker) => worker.id === parseInt(id)); // Tìm sinh viên theo id parseInt

  const [workername, setworkername] = useState(worker ? worker.workername : '');
  const [age, setage] = useState(worker ? worker.age : '');
  const [address, setaddress] = useState(worker ? worker.address : '');
  const [ban, setban] = useState(worker ? worker.ban : '');
  // const [error, setError] = useState('');

  const dispatch = useDispatch(); //useDispath để dispatch các action đến Redux store
  const navigate = useNavigate(); //useNavigate để điều hướng

  const handleSubmit = (e) => {
    e.preventDefault(); //Ngăn làm mới trang
    // if(!ban){
    //   setError("Vui lòng chọn ban");
    //   return;
    // }
    if (worker) {
      dispatch(updateworker({ id: worker.id, workername, age, address, ban }));
      //Nếu có việc thì cập nhật
    } else {
      const newworker = { workername, age, address, ban };
      //Nếu không có tạo việc mới
      dispatch(createworker(newworker));
    }
    navigate('/'); 
  };

  useEffect(() => {
    if (worker) {
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
        <label>Tên nhân viên:</label>
        <input type="text" value={workername} onChange={(e) => setworkername(e.target.value)} required />
      </div>
      <div>
        <label>Tuổi:</label>
        <input type="number" value={age} onChange={(e) => setage(e.target.value)} required />
      </div>
      <div>
        <label>Quê quán:</label>
        <input type="text" value={address} onChange={(e) => setaddress(e.target.value)} required />
      </div>
      <div>
        <label>Ban</label>
        <select value={ban} onChange={(e) => setban(e.target.value)} required>
            <option value="">--- Chọn ban --</option>
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
