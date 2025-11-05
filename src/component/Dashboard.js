import React, { useEffect, useState } from "react";
import "./dashboard.css";
import DashboardCard from "./DashboardCard";
import api from "../component/axiosConfig"; // axios instance

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchDashboardData = () => {
      const token = localStorage.getItem("token");

      api
        .get("/indexAllData", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setStats(res.data);
          console.log("✅ Dashboard Data:", res.data);
        })
        .catch((err) => {
          console.error("خطأ بجلب بيانات الداشبورد:", err);
        });
    };

    fetchDashboardData();
  }, []);

  if (!stats) {
    return <p>جاري تحميل البيانات...</p>;
  }

  return (
    <section className="dashboard section">
      <div className="row">
        <div className="col-lg-">
          <div className="row">
            <DashboardCard
              name={"الارباح"}
              icon={"bi bi-currency-dollar"}
              amount={stats.profits.total}
            />
            <DashboardCard
              name={"المستخدمين"}
              icon={"bi bi-people"}
              amount={stats.users.count}
            />
          </div>
        </div>
        <div className="col-lg-12">
          <div className="row">
            <DashboardCard
              name={"العقارات"}
              icon={"bi bi-house-door"}
              amount={stats.properties.count}
            />
            <DashboardCard
              name={"المكاتب"}
              icon={"bi bi-building"}
              amount={stats.offices.count}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
