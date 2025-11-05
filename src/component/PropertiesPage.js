import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../component/axiosConfig";

const PropertiesPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false); 
  const [selectedPropertyId, setSelectedPropertyId] = useState(null); 

  useEffect(() => {
    const token = localStorage.getItem("token");
    api
      .get("/getPropertiesWithUser", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("Properties response:", res.data);
        setProperties(res.data.properties);
      })
      .catch((err) => {
        console.error("Error fetching properties:", err);
      })
      .finally(() => setLoading(false));
  }, []);


  const confirmDelete = (id) => {
    setSelectedPropertyId(id);
    setShowModal(true);
  };


  const handleDelete = () => {
    if (!selectedPropertyId) return;

    const token = localStorage.getItem("token");
    api
      .delete(`/deleteProperty/${selectedPropertyId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("Property deleted:", res.data);
        setProperties((prev) =>
          prev.filter((property) => property.id !== selectedPropertyId)
        );
      })
      .catch((err) => {
        console.error("Error deleting property:", err);
      })
      .finally(() => {
        setShowModal(false);
        setSelectedPropertyId(null);
      });
  };

  if (loading) return <p>جاري تحميل العقارات...</p>;

  return (
    <div className="row justify-content-between">
      <div className="card overflow-auto col-lg-12">
        <div className="card-body">
          <h5 className="card-title">Properties</h5>

          <table className="table table-borderless datatable">
            <thead className="table-light">
              <tr>
                <th>الصورة</th>
                <th>السعر</th>
                <th>المساحة (م²)</th>
                <th>نوع العقار</th>
                <th>تصنيف العقار</th>
                <th>الحالة</th>
                <th>العمليات</th>
              </tr>
            </thead>
            <tbody>
              {properties && properties.length > 0 ? (
                properties.map((property) => (
                  <tr key={property.id}>
                    <td>
                      <img
                        src={
                          `http://192.168.2.111:8000/storage/${property.images?.[0]?.image_path}` ||
                          "https://via.placeholder.com/80x60"
                        }
                        alt="صورة العقار"
                        style={{
                          width: "80px",
                          height: "60px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                    </td>
                    <td>{property.price.toLocaleString()} $</td>
                    <td>{property.space} م²</td>
                    <td>{property.property_type}</td>
                    <td>{property.property_category}</td>
                    <td>
                      {property.contract_type === "rent" ? "إيجار" : "بيع"}
                    </td>
                    <td>
                      <Link to={`/PropertyDetails/${property.id}`} state={{ property }}>
                        <button
                          className="btn btn-sm me-2"
                          style={{
                            backgroundColor: "#8BC83F",
                            color: "#fff",
                          }}
                        >
                          عرض المزيد
                        </button>
                      </Link>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => confirmDelete(property.id)}
                      >
                        حذف
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">لا توجد عقارات حالياً.</td>
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
                <p>هل أنت متأكد أنك تريد حذف هذا العقار؟</p>
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

export default PropertiesPage;
