import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/LoginPage.css';
import signpassward from '../assets/signpass.png';
import signstudentnumber from '../assets/signprofile.png';

const LoginPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ studentNumber: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/users/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/'); // ✅ 메인 페이지로 이동
    } catch (err) {
      console.warn('⚠️ 백엔드 로그인 실패 - mock 처리로 우회');

      const mockUser = {
        name: '테스트유저',
        studentNumber: form.studentNumber || '23100000',
        major: 'ITM',
        favorites: ['프론티어관', '다산관'],
      };

      localStorage.setItem('token', 'mock-token');
      localStorage.setItem('user', JSON.stringify(mockUser));
      alert('⚠️ 서버 미연결 상태 - mock 로그인 처리됨');
      navigate('/');
    }
  };

  return (
    <div className="login-page">
      <Header />
      <main className="login-content">
        <div className="login-title-wrapper">
          <h1 className="login-title">
            <span className="highlight">SeoulTech</span> Available Room
          </h1>
        </div>
        <div className="login-box">
          <h2 className="login-label">Log in</h2>
          <div className="input-wrapper">
            <img src={signstudentnumber} alt="student number" className="input-icon" />
            <input name="studentNumber" type="text" placeholder="Student Number" onChange={handleChange} />
          </div>
          <div className="input-wrapper">
            <img src={signpassward} alt="password" className="input-icon" />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} />
          </div>
          <div className="login-buttons">
            <button onClick={handleLogin}>Log in</button>
            <button onClick={() => navigate('/signup')}>Sign in</button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;
