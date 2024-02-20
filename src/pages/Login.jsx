import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../redux/modules/authSlice';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import api from '../axios/api';
import { ToastContainer } from 'react-toastify';

function Login() {
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn && window.location.pathname === '/login') {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);
  

  const toggleForm = () => {
    setShowLoginForm((prevState) => !prevState);
  };

  const handleIdInput = (e) => {
    const idValue = e.target.value;
    setId(idValue);
    idValue.length >= 4 ? setIsValid(true) : setIsValid(false);
  };

  const handlePasswordInput = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);
    passwordValue.length >= 4 ? setIsValid(true) : setIsValid(false);
  };

  const handleNicknameInput = (e) => {
    const nicknameValue = e.target.value;
    setNickname(nicknameValue);
    nicknameValue.length >= 1 ? setIsValid(true) : setIsValid(false);
  };

  const loginHandler = async (e) => {
    e.preventDefault(); // 폼 제출에 의한 새로고침 방지
    try {
      const loginInfo = {
        id: id,
        password: password
      };
      const response = await api.post('/login', loginInfo);
      dispatch(userLogin(response)); 
      localStorage.setItem('response', JSON.stringify(response)); 

      const loginCompleteMsg = () => {
        toast.success('로그인 완료!');
      };
      loginCompleteMsg();
      navigate(`/`);
    } catch (error) {
      toast.error(`로그인에 실패. 다시 시도해주세요.`);
      console.log(error);
    }
  };

  const sineupHandler = async () => {
    try {
      const newMember = {
        id: id,
        password: password,
        nickname: nickname
      };
      await api.post('/register', newMember);
      toast.success('회원가입 완료!');
      setShowLoginForm(true); // 회원가입 성공 후 로그인 폼으로 전환
    } catch (error) {
      // 409 Conflict 오류 처리
      if (error.response && error.response.status === 409) {
        toast.error('이미 사용 중인 아이디나 이메일입니다.');
      } else {
        toast.error('회원가입에 실패했습니다.');
      }
      console.error('회원가입 오류:', error);
    }
  };

  return (
    <StContainer>
        <ToastContainer />
      {showLoginForm ? (
        <StLogin
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <StTitle>Login</StTitle>
          <StInput
            type="text"
            value={id}
            onChange={handleIdInput}
            placeholder="아이디 (4~10글자)"
            minLength="4"
            maxLength="10"
          />
          <StInput
            type="password"
            value={password}
            onChange={handlePasswordInput}
            placeholder="비밀번호 (4~15글자)"
            minLength="4"
            maxLength="15"
          />
          <StSubmitBtn type="submit" onClick={loginHandler} style={{ backgroundColor: isValid ? '#b296aa' : '#f2f2f2' }}>
            로그인
          </StSubmitBtn>
          <StToggleBtn onClick={toggleForm}>회원가입 하기</StToggleBtn>
        </StLogin>
      ) : (
        <StSignup
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <StTitle>Sign Up</StTitle>
          <StInput
            type="text"
            value={id}
            onChange={handleIdInput}
            placeholder="아이디 (4~10글자)"
            minLength="4"
            maxLength="10"
          />
          <StInput
            type="password"
            value={password}
            onChange={handlePasswordInput}
            placeholder="비밀번호 (4~15글자)"
            minLength="4"
            maxLength="15"
          />
          <StInput
            type="text"
            value={nickname}
            onChange={handleNicknameInput}
            placeholder="닉네임 (1~10글자)"
            minLength="1"
            maxLength="10"
          />
          <StSubmitBtn
            type="submit"
            onClick={sineupHandler}
            style={{ backgroundColor: isValid ? '#b296aa' : '#f2f2f2'  }}
          >
            회원가입
          </StSubmitBtn>
          <StToggleBtn onClick={toggleForm}>로그인 하기</StToggleBtn>
        </StSignup>
      )}
    </StContainer>
  );
}

const StContainer = styled.div`
  background-color: black;
  height: 100vh;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StLogin = styled.form`
  background-color: #151515;
  width: 500px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  padding: 30px;
  padding-top: 50px;
  padding-bottom: 50px;
  gap: 8px;
`;

const StTitle = styled.span`
  font-size: 20pt;
  color: #ff66b2;
  font-weight: 600;
  margin-bottom: 40px;
`;

const StInput = styled.input`
  height: 40px;
  width: 80%;
  margin: auto;
  padding-left: 10px;   
  font-size: 15px;
`;

const StSubmitBtn = styled.button`
  height: 40px;
  width: 80%;
  border: none;
  border-radius: 15px;
  color: black;
  margin: auto;
  margin-top: 20px;
  font-size: 13pt;
  font-weight: 600;
  cursor: pointer;
`;

const StToggleBtn = styled.span`
  margin-top: 10px;
  text-align: center;
  font-weight: bolder;
  height: 30px;
  font-size: 18px;
  color: white;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    color: #fff;
    text-shadow:
      0 0 5px rgba(239, 105, 203, 0.7),
      0 0 10px rgba(239, 105, 203, 0.8),
      0 0 15px rgba(239, 105, 203, 0.9),
      0 0 20px rgba(239, 105, 203, 1),
      0 0 25px rgba(239, 105, 203, 1);
  }
`;

const StSignup = styled.form`
  background-color: #151515;
  width: 500px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  padding: 30px;
  padding-top: 50px;
  padding-bottom: 50px;
  gap: 8px;
`;

export default Login;