import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import backgroundImage from "../assets/background.png";
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
      <StContainer>
        <ProfileWrapper>
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
        </ProfileWrapper>
      </StContainer>
    </ProfileContainer>
  );
};

const ProfileContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: url(${backgroundImage});
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileAvatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  cursor: pointer;
`;

const ProfileInfo = styled.p`
  margin: 10px 0;
  font-size: 18px;
  color: white;
`;

const NicknameInput = styled.input`
  margin: 10px 0;
  padding: 5px;
  font-size: 16px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 10px;
`;

const EditButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
`;

const CancelButton = styled.button`
  background-color: #dc3545;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  margin-right: 10px;
  cursor: pointer;
  font-size: 16px;
`;

const SaveButton = styled.button`
  background-color: #28a745;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }
`;

export default Profile;
