import React from 'react';

const AddCityCard = ({ onClose, onAdd }) => {
  const [name, setName] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === '') return;
    onAdd(name);
    setName('');
  };

  return (
    <div className="card shadow-sm p-3 mb-3" style={{ maxWidth: '400px', margin: '0 auto', backgroundColor: '#f9f9f9' }}>
      <h5 className="mb-3">إضافة مدينة جديدة</h5>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">اسم المدينة</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="d-flex justify-content-between">
          <button type="button" className="btn btn-danger" onClick={onClose}>
            رجوع
          </button>
          <button type="submit" className="btn" style={{ backgroundColor: "#8BC83F" }}>
            إضافة
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCityCard;
