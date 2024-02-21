import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { userLogin } from '../redux/modules/authSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);

  const [isEditing, setIsEditing] = useState(false);
  const [editedNickname, setEditedNickname] = useState(user.nickname);
  const [editedAvatar, setEditedAvatar] = useState(null);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    if (editedNickname !== user.nickname || editedAvatar) {
      const formData = new FormData();
      formData.append('nickname', editedNickname);
      if (editedAvatar) {
        formData.append('avatar', editedAvatar);
      }
      // Dispatch action to update user information
      dispatch(userLogin({ ...user, nickname: editedNickname }));
      setIsEditing(false);
      // Update local storage
      localStorage.setItem('nickname', editedNickname);
    } else {
      setIsEditing(false);
    }
  };

  const handleNicknameChange = (e) => {
    setEditedNickname(e.target.value);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setEditedAvatar(file);
  };

  return (
    <Container>
      <AvatarContainer>
        <AvatarImg src={user.avatar} alt="프로필 이미지" />
        <UserId>userId: {user.userId}</UserId>
        <Nickname>Nickname: {user.nickname}</Nickname>
        {isEditing && (
          <AvatarInput type="file" accept="image/*" onChange={handleAvatarChange} />
        )}
      </AvatarContainer>
      {!isEditing ? (
        <EditButton onClick={handleEditClick}>프로필 수정</EditButton>
      ) : (
        <>
          <NicknameInput
            type="text"
            value={editedNickname}
            onChange={handleNicknameChange}
          />
          <SaveButton onClick={handleSaveClick}>저장</SaveButton>
          <CancelButton onClick={() => setIsEditing(false)}>취소</CancelButton>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
`;

const AvatarContainer = styled.div`
  position: relative;
`;

const AvatarImg = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
`;

const AvatarInput = styled.input`
  position: absolute;
  bottom: 0;
  right: 0;
  opacity: 0;
`;

const NicknameInput = styled.input`
  margin-top: 20px;
  font-size: 18px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const EditButton = styled.button`
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const SaveButton = styled(EditButton)`
  margin-top: 10px;
  background-color: #28a745;
`;

const CancelButton = styled(EditButton)`
  margin-top: 10px;
  background-color: #dc3545;
`;

const UserId = styled.p`
  margin-top: 20px;
`;

const Nickname = styled.p`
  margin-top: 10px;
`;

export default Profile;
