import React, { useEffect, useState } from "react";
import api from "../component/axiosConfig";

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false); // حالة عرض المودال
  const [selectedUserId, setSelectedUserId] = useState(null); // المستخدم المحدد للحذف

  useEffect(() => {
    const token = localStorage.getItem("token");
    api
      .get("/getAllUsers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("Users response:", res.data);
        setUsers(res.data.data);
      })
      .catch((err) => {
        console.error("Error fetching Users:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  const confirmDelete = (id) => {
    setSelectedUserId(id); // خزّن id
    setShowModal(true); // افتح المودال
  };

  const handleDelete = () => {
    if (!selectedUserId) return;

    const token = localStorage.getItem("token");
    api
      .delete(`/deleteUser/${selectedUserId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("Deleted:", res.data);
        // حدث اللستة بعد الحذف
        setUsers((prev) => prev.filter((user) => user.id !== selectedUserId));
      })
      .catch((err) => {
        console.error("Error deleting user:", err);
      })
      .finally(() => {
        setShowModal(false);
        setSelectedUserId(null);
      });
  };

  const handleEdit = (id) => {
    console.log("Edit user with ID:", id);
  };

  return (
    <div className="row justify-content-between">
      <div className="card overflow-auto col-lg-12">
        <div className="card-body">
          <h5 className="card-title">Users</h5>
          {loading ? (
            <div className="text-center my-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <table className="table table-borderless datatable">
              <thead className="table-light">
                <tr>
                  <th scope="col">معرف المستخدم</th>
                  <th scope="col">الاسم</th>
                  <th scope="col">الكنية</th>
                  <th scope="col">البريد الالكتروني</th>
                  <th scope="col">الهاتف</th>
                  <th scope="col">خيارات</th>
                </tr>
              </thead>
              <tbody>
                {users && users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.FirstName}</td>
                      <td>{user.LastName}</td>
                      <td>{user.email}</td>
                      <td>{user.PhoneNumber}</td>
                      <td>
                        <i
                          className="bi bi-pencil-square text-primary me-3"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleEdit(user.id)}
                          title="Edit"
                        ></i>
                        <i
                          className="bi bi-trash text-danger"
                          style={{ cursor: "pointer" }}
                          onClick={() => confirmDelete(user.id)}
                          title="Delete"
                        ></i>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">لا يوجد مستخدمين</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* 🔹 Modal للتأكيد */}
      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">تأكيد الحذف</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>هل أنت متأكد أنك تريد حذف هذا المستخدم؟</p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  إلغاء
                </button>
                <button className="btn btn-danger" onClick={handleDelete}>
                  تأكيد الحذف
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPage;
