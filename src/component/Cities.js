import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../component/axiosConfig';
import AddCityCard from './AddCityCard';

function Cities() {
  const location = useLocation();
  const stateId = location.state?.stateId;

  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddCard, setShowAddCard] = useState(false);

  useEffect(() => {
    if (!stateId) return;

    api.get(`/property/getregionToState/${stateId}`)
      .then(res => {
        setCities(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching cities:', err);
        setLoading(false);
      });
  }, [stateId]);

  const handleAddCity = (name) => {
    const formData = new FormData();
    formData.append('region_Name', name);
    formData.append('state_id', stateId);

    api.post('/property/addregion', formData)
      .then(res => {
        const newCity = res.data;
        setCities(prev => [...prev, newCity]);
        setShowAddCard(false);
      })
      .catch(err => {
        console.error('Error adding city:', err);
      });
  };

  return (
    <div className='row justify-content-between'>
      <div className='card overflow-auto col-lg-12'>
        <div className='card-body'>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="card-title mb-0">المدن التابعة للمحافظة رقم {stateId}</h5>
            <button className="btn btn-sm" style={{ backgroundColor: "#012970", color: '#fff' }} onClick={() => setShowAddCard(true)}>
              إضافة مدينة جديدة
            </button>
          </div>

          {showAddCard && (
            <AddCityCard onClose={() => setShowAddCard(false)} onAdd={handleAddCity} />
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
                  <th>معرّف المدينة</th>
                  <th>اسم المدينة</th>
                  <th>العمليات</th>
                </tr>
              </thead>
              <tbody>
                {cities && cities.length > 0 ? (
                  cities.map((city) => (
                    <tr key={city.id}>
                      <td>{city.id}</td>
                      <td>{city.region_Name}</td>
                      <td>
                        <button className='btn btn-sm btn-danger'>
                          حذف
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan='3'>لا توجد مدن حالياً.</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cities;
