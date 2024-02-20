import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Detail from '../pages/Detail';
import Home from '../pages/Home';
import Login from '../pages/Login'; 
import { useSelector } from 'react-redux';
import Layout from '../components/Layout';
import Profile from '../pages/Profile';

export default function Router() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={!isLoggedIn ? <Login /> : <Navigate replace to="/" />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}