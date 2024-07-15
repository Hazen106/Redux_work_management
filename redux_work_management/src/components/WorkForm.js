import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createWork, updateWork } from '../reducer/workReducers';
import { useNavigate, useParams } from 'react-router-dom';

const WorkForm = () => {
  const { id } = useParams(); // Lấy id từ URL
  const works = useSelector((state) => state.works.works); 
  const work = works.find((work) => work.id === parseInt(id)); 

  const [workname, setWorkname] = useState(work ? work.workname : ''); 
  const [nameworker, setNameworker] = useState(work ? work.nameworker : ''); 
  const [complete, setComplete] = useState(work ? work.complete : '');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (work) {
      dispatch(updateWork({ id: work.id, workname, nameworker, complete }));
    } else {
      const newWork = { workname, nameworker, complete };
      dispatch(createWork(newWork));
    }
    navigate('/'); 
  };

  useEffect(() => {
    if (work) {
        setWorkname(work.workname);
        setNameworker(work.nameworker);
        setComplete(work.complete);
    }
  }, [work]);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Tên công việc:</label>
        <input type="text" value={workname} onChange={(e) => setWorkname(e.target.value)} required />
      </div>
      <div>
        <label>Người thực hiện:</label>
        <input type="text" value={nameworker} onChange={(e) => setNameworker(e.target.value)} required />
      </div>
      <div>
        <label>Tình trạng:</label>
        <select value={complete} onChange={(e) => setComplete(e.target.value)} required>
            <option value="New">Mới tạo</option>
            <option value="In-progress">Đang thực hiện</option>
            <option value="Completed">Hoàn thành</option>
            <option value="Closed">Đóng</option>
        </select>
      </div>
      <button type="submit">{work ? 'Update Work' : 'Add Work'}</button>
    </form>
  );
};

export default WorkForm;
