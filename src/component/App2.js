import React, { useEffect } from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import Main from "./Main";
import Footer from "./Footer";
import api from "./axiosConfig";

const App = () => {
  useEffect(() => {
    const login = async () => {
      try {
        const formData = new FormData();
        formData.append("email", "admin@gmail.com"); // ثابت
        formData.append("password", "12345678"); // ثابت
        formData.append("PhoneNumberAdmin", "093874634");
        const res = await api.post("/loginAdmin", formData);

        // تخزين التوكن
        localStorage.setItem("token", res.data.access_token);
        localStorage.setItem("user", JSON.stringify(res.data.admin));

        console.log("✅ Access Token:", res.data.access_token);
        console.log("تم تسجيل الدخول التلقائي بنجاح");
      } catch (err) {
        console.error("خطأ أثناء تسجيل الدخول:", err);
      }
    };

    login();
  }, []);

  return (
    <>
      <Header />
      <SideBar />
      <Main />
      <Footer />
    </>
  );
};

export default App;