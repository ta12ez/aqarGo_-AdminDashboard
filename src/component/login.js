import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../component/axiosConfig"; // axios instance جاهز
import "./login.css";
import logo from "../images/logo.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log("Existing token found:", token);
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("email", username);
    formData.append("password", password);
    formData.append("PhoneNumberAdmin", "093874634");


    api.post("/loginAdmin", formData)
      .then(res => {
        const { access_token, admin } = res.data;

        // طباعة التوكن بالكونسول
        console.log("Access Token:", access_token);

        // تخزين التوكن وبيانات المسؤول
        localStorage.setItem("token", access_token);
        localStorage.setItem("admin", JSON.stringify(admin));
        setLoading(false);
        // إعادة التوجيه للداشبورد
        navigate("/");
      })
      .catch(err => {
        console.error("Login error:", err);
        setError("البريد الإلكتروني أو كلمة المرور غير صحيحة");
        setLoading(false);
      });
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2 className="login-title">تسجيل الدخول</h2>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "18px" }}>
          <img src={logo} alt="Logo" style={{ maxWidth: "150px", maxHeight: "150px" }} />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="login-field">
          <label htmlFor="username"> البريد الالكتروني</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoFocus
          />
        </div>
        <div className="login-field">
          <label htmlFor="password">كلمة المرور</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="login-btn" type="submit" disabled={loading}>
          {loading ? "جاري تسجيل الدخول..." : "دخول"}
        </button>
      </form>
    </div>
  );
};

export default Login;
