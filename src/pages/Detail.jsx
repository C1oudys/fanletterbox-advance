import React, { useState } from "react";
import styled from "styled-components";
import { useParams, Link, useNavigate } from "react-router-dom";
import backgroundImage from "../assets/background.png";
import { useSelector, useDispatch } from "react-redux";
import { deleteFanLetter, editFanLetter } from "../redux/modules/fanLettersSlice"; // 수정된 경로

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const fanLetters = useSelector((state) => state.fanLetters.fanLetters);
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState("");

  const selectedLetter = fanLetters.find((letter) => letter.id === id);

  if (!selectedLetter) {
    return <div>팬레터를 찾을 수 없습니다.</div>;
  }

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedContent(selectedLetter.content);
  };

  const handleSaveClick = () => {
    if (editedContent === selectedLetter.content) {
      alert("아무런 수정사항이 없습니다.");
    } else {
      const updatedLetter = { ...selectedLetter, content: editedContent };
      dispatch(editFanLetter({ id: updatedLetter.id, content: updatedLetter.content }));
      setIsEditing(false);
      setEditedContent("");
    }
  };
  
  const handleDeleteClick = () => {
    const isConfirmed = window.confirm("정말로 삭제하시겠습니까?");
    if (isConfirmed) {
      dispatch(deleteFanLetter(id));
      navigate("/");
    }
  };
  
  return (
    <StContainer>
      <StBackground>
        <StDetailContainer>
          <StDetailContent>
            <StAvatar src={selectedLetter.avatar} alt="아바타" />
            <StWritedTo>
              <strong>To.</strong> {selectedLetter.writedTo}
            </StWritedTo>
            <StCreatedAt>
              <strong>작성 시간:</strong> {selectedLetter.createdAt}
            </StCreatedAt>
            {isEditing ? (
              <StContent>
                <textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                />
              </StContent>
            ) : (
              <StContent>
               {selectedLetter.content}
              </StContent>
            )}
            <StNickname>
              <strong>From.</strong> {selectedLetter.nickname}
            </StNickname>
          </StDetailContent>
          {isEditing ? (
            <StEditBtnContainer>
              <StSaveButton onClick={handleSaveClick}>수정 완료</StSaveButton>
              <StBackButton to="/">취소</StBackButton>
            </StEditBtnContainer>
          ) : (
            <StEditBtnContainer>
              <StEditButton onClick={handleEditClick}>수정</StEditButton>
              <StDeleteButton onClick={handleDeleteClick}>삭제</StDeleteButton>
            </StEditBtnContainer>
          )}
          <StBackButton to="/">홈으로 돌아가기</StBackButton>
        </StDetailContainer>
      </StBackground>
    </StContainer>
  );
};


const StContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: url(${backgroundImage});
  background-size: cover;
`;

const StBackground = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
`;

const StDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
`;

const StDetailContent = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px;
  background-color: rgba(178, 34, 34, 0.7);
  border-radius: 3%;
  width: 750px;
  height: 550px;
`;

const StNickname = styled.p`
  font-weight: bold;
  color: #f5f5f5;
  margin-bottom: 10px;
  font-size: 20px;
`;

const StCreatedAt = styled.p`
  color: #e6e6fa;
  margin-bottom: 5px;
  font-size: 20px;
  margin-bottom: 20px;
`;

const StWritedTo = styled.p`
  color: #e6e6fa;
  margin-bottom: 5px;
  font-size: 25px;
  font-weight: bolder;
  margin-bottom: 20px;
`;

const StContent = styled.p`
  margin: 5px;
  padding: 10px;
  width: 650px;
  height: 300px;
  color: #fffaf0;
  background-color: rgba(255, 69, 0, 0.4);
  line-height: 1.2;
  font-size: 18px;
  margin-bottom: 40px;

  textarea {
    width: 100%;
    height: 100%;
    border: none;
    background-color: transparent;
    color: #fffaf0;
    font-size: 18px;
    line-height: 1.2;
    resize: none;
  }
`;

const StBackButton = styled(Link)`
  background-color: #f08080;
  padding: 10px 20px;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  margin-top: 10px;
  margin-bottom: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #800000;
  }
`;

const StDeleteButton = styled.button`
  background-color: #dc3545;
  padding: 10px 20px;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  margin: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c82333;
  }
`;

const StEditBtnContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const StEditButton = styled.button`
  background-color: #4caf50;
  padding: 10px 20px;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  margin: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;

const StSaveButton = styled.button`
  background-color: #008CBA;
  padding: 10px 20px;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  margin-right: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #007a8a;
  }
`;

const StAvatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin: 10px;
`;

export default Detail;
