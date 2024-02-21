import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { userLogin } from '../redux/modules/authSlice';
import api from '../axios/api'; 

const Profile = () => {
  const { userId, nickname, avatar } = useSelector((state) => state.auth);
  const [editMode, setEditMode] = useState(false);
  const [newNickname, setNewNickname] = useState(nickname);
  const [newAvatar, setNewAvatar] = useState(null);
  const [previewAvatar, setPreviewAvatar] = useState(avatar);
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("accessToken");


  useEffect(() => {
    setNewNickname(nickname);
    setPreviewAvatar(avatar);
  }, [nickname, avatar]);

  const handleNicknameChange = (e) => {
    setNewNickname(e.target.value);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setNewAvatar(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewAvatar(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const cancelEdit = () => {
    setEditMode(false);
    setNewNickname(nickname);
    setPreviewAvatar(avatar);
    setNewAvatar(null);
  };

  const saveChanges = async () => {
    const formData = new FormData();
    formData.append('avatar', newAvatar);
    formData.append('nickname', newNickname);
  
    try {
      const response = await api.patch('/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      const { nickname, message, success } = response; 
  
      if (success) {
        dispatch(userLogin({
          accessToken: localStorage.getItem("accessToken"), 
          userId: userId,
          nickname: nickname,
          avatar: previewAvatar
        }));
        toast.success(message); 
        setEditMode(false);
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error('프로필 업데이트 실패:', error);
      toast.error('프로필 업데이트 실패. 다시 시도해주세요.');
    }
  };
  
  return (
    <ProfileContainer>
      <ProfileAvatar src={previewAvatar} alt="Profile Avatar" onClick={() => document.getElementById('avatarInput').click()} />
      <input id="avatarInput" type="file" accept="image/*" onChange={handleAvatarChange} style={{ display: 'none' }} />
      {!editMode ? (
        <>
          <ProfileInfo>ID: {userId}</ProfileInfo>
          <ProfileInfo>Nickname: {nickname}</ProfileInfo>
          <EditButton onClick={() => setEditMode(true)}>수정하기</EditButton>
        </>
      ) : (
        <>
          <NicknameInput value={newNickname} onChange={handleNicknameChange} />
          <ButtonContainer>
            <CancelButton onClick={cancelEdit}>취소</CancelButton>
            <SaveButton onClick={saveChanges} disabled={newNickname === nickname && !newAvatar}>수정완료</SaveButton>
          </ButtonContainer>
        </>
      )}
    </ProfileContainer>
  );
};

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const ProfileAvatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  cursor: pointer;
`;

const ProfileInfo = styled.p`
  margin: 10px 0;
`;

const NicknameInput = styled.input`
  margin: 10px 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

const EditButton = styled.button``;

const CancelButton = styled.button``;

const SaveButton = styled.button``;

export default Profile;
