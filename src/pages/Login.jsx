import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, register } from '../redux/modules/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [isRegisterMode, setIsRegisterMode] = useState(false); // 회원가입 모드를 나타내는 상태 추가

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({ username: loginUsername, password: loginPassword }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(register({ username: registerUsername, password: registerPassword }));
  };

  const toggleMode = () => {
    setIsRegisterMode((prevMode) => !prevMode); // 회원가입 모드 토글
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      {isRegisterMode ? ( // 회원가입 모드일 때 회원가입 폼을 렌더링
        <>
          <h2>회원가입</h2>
          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="아이디"
              value={registerUsername}
              onChange={(e) => setRegisterUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="비밀번호"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
            />
            <button type="submit">회원가입</button>
          </form>
          <button onClick={toggleMode}>로그인으로 전환</button>
        </>
      ) : ( // 회원가입 모드가 아닐 때 로그인 폼을 렌더링
        <>
          <h2>로그인</h2>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="아이디"
              value={loginUsername}
              onChange={(e) => setLoginUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="비밀번호"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            <button type="submit">로그인</button>
          </form>
          <button onClick={toggleMode}>회원가입으로 전환</button>
        </>
      )}
    </div>
  );
};

export default Login;
