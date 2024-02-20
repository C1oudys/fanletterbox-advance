import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { __logIn, __signUp } from "../redux/modules/authSlice";

function Login() {
  const [isLogin, setIsLogin] = useState(false);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [isValid, setIsValid] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin) {
      setIsValid(id.length >= 4 && id.length <= 10 && password.length >= 4 && password.length <= 15);
    } else {
      setIsValid(
        id.length >= 4 && id.length <= 10 &&
        password.length >= 4 && password.length <= 15 &&
        nickname.length >= 1 && nickname.length <= 10
      );
    }
  }, [id, password, nickname, isLogin]);

  const handleIdInputChange = (e) => setId(e.target.value);
  const handlePasswordInputChange = (e) => setPassword(e.target.value);
  const handleNicknameChange = (e) => setNickname(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { id, password, ...(nickname && { nickname }) };
    if (isLogin) {
      dispatch(__logIn(userData));
      navigate("/");
    } else {
      dispatch(__signUp(userData));
      setId("");
      setPassword("");
      setNickname("");
      setIsLogin(true); 
    }
  };

  return (
    <StWrapper>
      <StForm onSubmit={handleSubmit}>
        <StLogInSignUp>{isLogin ? "로그인" : "회원가입"}</StLogInSignUp>
        <StId
          type="text"
          placeholder="아이디 (4~10글자)"
          minLength={4}
          maxLength={10}
          onChange={handleIdInputChange}
          value={id}
          required
        />
        <StPw
          type="password"
          placeholder="비밀번호 (4~15글자)"
          minLength={4}
          maxLength={15}
          onChange={handlePasswordInputChange}
          value={password}
          required
        />
        {!isLogin && (
          <StNickname
            type="text"
            placeholder="닉네임 (1~10글자)"
            minLength={1}
            maxLength={10}
            onChange={handleNicknameChange}
            value={nickname}
            required
          />
        )}
        <StLoginButton type="submit" disabled={!isValid}>
          {isLogin ? "로그인" : "회원가입"}
        </StLoginButton>
        <StToggleFormButton onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "회원가입하기" : "로그인하기"}
        </StToggleFormButton>
      </StForm>
    </StWrapper>
  );
}

export default Login;

const StWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #151515;
  `

const StForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 12px 18px;
  border-radius: 12px;
  background-color: lightblue;
  width: 300px; 
`;

const StLogInSignUp = styled.h1`
  font-size: 24px; 
  margin-bottom: 24px;
`;

const StId = styled.input`
  margin-bottom: 16px;
  padding: 8px;
  border: 1px solid gray;
  border-radius: 4px;
`;

const StPw = styled.input`
  margin-bottom: 16px;
  padding: 8px;
  border: 1px solid gray;
  border-radius: 4px;
`;

const StNickname = styled.input`
  margin-bottom: 16px;
  padding: 8px;
  border: 1px solid gray;
  border-radius: 4px;
`;

const StLoginButton = styled.button`
  background-color: ${props => props.disabled ? 'gray' : 'blue'};
  color: white;
  padding: 10px;
  margin-bottom: 12px;
  border: none;
  border-radius: 4px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
`;

const StToggleFormButton = styled.button`
  background: none;
  border: none;
  color: gray;
  cursor: pointer;
`;
