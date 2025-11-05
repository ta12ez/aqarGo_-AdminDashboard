import React, { useEffect, useState } from "react";
import "./offecesPage.css";
import { Link } from "react-router-dom";
import api from "../component/axiosConfig"; 
const OfficesPage = () => {
  const [offices, setOffices] = useState([]);
  const [loading, setLoading] = useState(true);

  
  const [showModal, setShowModal] = useState(false);
  const [selectedOfficeId, setSelectedOfficeId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    api
      .get("/getAllOfficesWithProperties", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("Offices response:", res.data);
        setOffices(res.data.offices);
      })
      .catch((err) => {
        console.error("Error fetching offices:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleShowMore = (officeId) => {
    console.log(`عرض المزيد للمكتب ID: ${officeId}`);
  };


  const confirmDelete = (id) => {
    setSelectedOfficeId(id);
    setShowModal(true);
  };


  const handleDelete = () => {
    if (!selectedOfficeId) return;

    const token = localStorage.getItem("token");
    api
      .delete(`/deleteOffice/${selectedOfficeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("Office deleted:", res.data);
       
        setOffices((prev) =>
          prev.filter((office) => office.id !== selectedOfficeId)
        );
      })
      .catch((err) => {
        console.error("Error deleting office:", err);
      })
      .finally(() => {
        setShowModal(false);
        setSelectedOfficeId(null);
      });
  };

  if (loading) return <p>جاري تحميل المكاتب...</p>;

  return (
    <div className="row justify-content-between">
      <div className="card overflow-auto col-lg-12">
        <div className="card-body">
          <h5 className="card-title">Real Estate Offices</h5>

          <table className="table table-borderless datatable">
            <thead className="table-light">
              <tr>
                <th>اسم المكتب</th>
                <th>عدد العقارات</th>
                <th>نسبة الربح (%)</th>
                <th>الخيارات</th>
              </tr>
            </thead>
            <tbody>
              {offices && offices.length > 0 ? (
                offices.map((office) => (
                  <tr key={office.id}>
                    <td>{office.Office_name}</td>
                    <td>{office.properties_count}</td>
                    <td>{office.percentage}%</td>
                    <td>
                      <Link to={`/OfficeDetails/${office.id}`}>
                        <button
                          className="btn btn-sm Button me-2"
                          onClick={() => handleShowMore(office.id)}
                        >
                          عرض المزيد
                        </button>
                      </Link>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => confirmDelete(office.id)}
                      >
                        حذف
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">لا توجد مكاتب حالياً.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

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
                <p>هل أنت متأكد أنك تريد حذف هذا المكتب؟</p>
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

export default OfficesPage;
