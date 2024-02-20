// Layout.jsx
import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <nav>
        <ul style={{ listStyleType: "none", padding: 0, backgroundColor: "#f0f0f0", marginBottom: "20px" }}>
          <li style={{ display: "inline", marginRight: "10px" }}>
            <Link to="/">HOME</Link>
          </li>
          <li style={{ display: "inline", marginRight: "10px" }}>
            <Link to="/profile">내 프로필</Link>
          </li>
          <li style={{ display: "inline" }}>
            <Link to="/login" onClick={handleLogout}>로그아웃</Link>
          </li>
        </ul>
      </nav>
      {/* Outlet을 사용해 자식 라우트를 렌더링 */}
      <Outlet />
    </div>
  );
};

const handleLogout = () => {
  // 로그아웃 로직 구현
  console.log('로그아웃 처리');
  // 예: localStorage에서 토큰 제거, 리덕스 상태 업데이트 등
};

export default Layout;
