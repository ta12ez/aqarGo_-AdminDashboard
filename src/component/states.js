import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../component/axiosConfig'; // تأكد من المسار الصحيح
import AddStateCard from './AddStateCard';

export const States = () => {
  const [states, setStates] = useState([]);
  const [showAddCard, setShowAddCard] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/property/allstates')
      .then(res => {
        setStates(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching states:', err);
        setLoading(false);
      });
  }, []);

  const handleAddState = (name) => {
    const formData = new FormData();
    formData.append('state_name', name);

    api.post('/property/addstate', formData)
      .then(res => {
        const newState = res.data;
        setStates(prev => [...prev, newState]);
        setShowAddCard(false);
      })
      .catch(err => {
        console.error('Error adding state:', err);
      });
  };

  return (
    <div className='row justify-content-between'>
      <div className='card overflow-auto col-lg-12'>
        <div className='card-body'>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="card-title mb-0">المحافظات</h5>
            <button
              className="btn btn-sm"
              style={{ backgroundColor: "#012970", color: '#fff' }}
              onClick={() => setShowAddCard(true)}
            >
              إضافة محافظة جديدة
            </button>
          </div>

          {showAddCard && (
            <AddStateCard
              onClose={() => setShowAddCard(false)}
              onAdd={handleAddState}
            />
          )}

          {loading ? (
            <div className="text-center my-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <table className='table table-borderless datatable'>
              <thead className='table-light'>
                <tr>
                  <th>معرف المحافظة</th>
                  <th>اسم المحافظة</th>
                  <th>العمليات</th>
                </tr>
              </thead>
              <tbody>
                {states && states.length > 0 ? (
                  states.map((state) => (
                    <tr key={state.id}>
                      <td>{state.id}</td>
                      <td>{state.state_name}</td>
                      <td>
                        <Link to="/Cities" state={{ stateId: state.id }}>
                          <button className='btn btn-sm Button me-2'>
                            المدن التابعة
                          </button>
                        </Link>
                        <button className='btn btn-sm btn-danger'>
                          حذف
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan='3'>لا توجد محافظات حالياً.</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default States;
