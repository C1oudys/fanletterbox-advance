import React from 'react';
import { useNavigate, Outlet, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { userLogout } from '../redux/modules/authSlice'
import { toast } from 'react-toastify';

const Layout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        // 로그아웃 처리
        dispatch(userLogout()); // userLogout 액션 디스패치
        localStorage.clear(); // 로컬 스토리지 클리어 (옵션)
        toast.info('로그아웃 되었습니다.'); // 로그아웃 토스트 메시지 표시
        navigate('/login'); // 로그인 페이지로 리디렉션
    }
    
  return (
    <div>
      <StNav>
        <StUl>
          <StLi>
            <StLink to="/">HOME</StLink>
          </StLi>
          <StLi>
            <StLink to="/profile">My Profile</StLink>
          </StLi>
          <StLi>
            <StLink to="/login" onClick={handleLogout}>Log out</StLink>
          </StLi>
        </StUl>
      </StNav>
      <Outlet />
    </div>
  );
};

export default Layout;

const StNav = styled.nav`
  position: fixed;
  border-radius: 10px;
  top: 3px;
  width: 800px;
  background-color: #151515;
  border-bottom: 1.5px solid #ff66b2;
  padding: 10px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000; 
`;

const StUl = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0 auto;
  display: flex;
  justify-content: center; 
`
const StLi = styled.li`
  margin: 0 80px;
`;

const StLink = styled(Link)`
  text-decoration: none;
  color: white;
  &:hover {
    text-shadow: 0 0 7px #ff66b2, 0 0 10px #ff66b2, 0 0 21px #ff66b2, 0 0 42px #ff66b2,
    0 0 82px #ff66b2, 0 0 92px #ff66b2, 0 0 102px #ff66b2, 0 0 151px #ff66b2;
  color: #fff;
  }
`;