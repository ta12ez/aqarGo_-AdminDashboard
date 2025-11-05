import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import users from '../data/users'; // نفس ملف المستخدمين

const EditUserPage = () => {
  const { id } = useParams(); // أخذ ID المستخدم من الـ URL
  const [user, setUser] = useState(null);

  useEffect(() => {
    const foundUser = users.find(u => u.id === parseInt(id));
    setUser(foundUser);
  }, [id]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated User:', user);
    // هون ترسل البيانات المعدّلة للـ backend
  };

  if (!user) return <p>User not found</p>;

  return (
    <div className='container mt-4'>
      <h3>Edit User</h3>
      <form onSubmit={handleSubmit} className='mt-3'>
        <div className='mb-3'>
          <label className='form-label'>Name</label>
          <input
            type='text'
            className='form-control'
            name='name'
            value={user.name}
            onChange={handleChange}
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Email</label>
          <input
            type='email'
            className='form-control'
            name='email'
            value={user.email}
            onChange={handleChange}
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Phone</label>
          <input
            type='text'
            className='form-control'
            name='phone'
            value={user.phone}
            onChange={handleChange}
          />
        </div>
        <button type='submit' className='btn btn-primary'>Save Changes</button>
      </form>
    </div>
  );
};

export default EditUserPage;
