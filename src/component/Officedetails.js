import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../component/axiosConfig";
import "./PropertyDetails.css";

const Officedetails = () => {
  const { id } = useParams();
  const [office, setOffice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    api
      .get(`/getOfficeWithProperties/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("Office details response:", res.data);
        setOffice(res.data);
      })
      .catch((err) => {
        console.error("Error fetching office details:", err);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>جاري تحميل تفاصيل المكتب...</p>;
  if (!office) return <p>لم يتم العثور على المكتب.</p>;

  return (
    <div className="property-details-container">
      {/* معلومات المكتب */}
      <div className="property-info-section mb-4">
        <img
          src={office.image || "/default-office.png"}
          alt={office.Office_name}
          className="property-image mb-3"
        />
        <h2>{office.Office_name}</h2>
        <p>{office.description}</p>
        <p>
          <b>📞 الهاتف:</b> {office.PhoneNumberOffice}
        </p>
        <p>
          <b>نسبة الربح:</b> {office.percentage}%
        </p>
        <p>
          <b>عدد العقارات:</b> {office.properties_count}
        </p>
      </div>

      {/* جدول العقارات */}
      <div>
        <h3 className="mb-3">عقارات المكتب</h3>
        {office.properties && office.properties.length > 0 ? (
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>الصورة</th>
                <th>العنوان</th>
                <th>المساحة</th>
                <th>السعر</th>
                <th>النوع</th>
                <th>الفئة</th>
                <th>الموقع</th>
                <th>الحالة</th>
              </tr>
            </thead>
            <tbody>
              {office.properties.map((prop) => (
                <tr key={prop.id}>
                  <td>
                    <img
                      src={
                        prop.images && prop.images.length > 0
                          ? prop.images[0].image_path
                          : "/default-property.png"
                      }
                      alt={prop.title}
                      style={{ width: "100px", borderRadius: "8px" }}
                    />
                  </td>
                  <td>{prop.title}</td>
                  <td>{prop.space} م²</td>
                  <td>{prop.price} ر.س</td>
                  <td>{prop.property_type}</td>
                  <td>{prop.property_category}</td>
                  <td>
                    {prop.region?.region_Name} - {prop.region?.state?.state_name}
                  </td>
                  <td>{prop.pivot?.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>لا توجد عقارات لهذا المكتب حالياً.</p>
        )}
      </div>

      {/* زر رجوع */}
      <Link to="/OfficesPage">
        <button className="btn btn-secondary mt-3">⬅ رجوع</button>
      </Link>
    </div>
  );
};

export default Officedetails;
