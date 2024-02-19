import React, { useState } from "react";
import styled from "styled-components";
import { useParams, Link, useNavigate } from "react-router-dom";
import backgroundImage from "../assets/background.png";
import { useSelector, useDispatch } from "react-redux";
import { deleteFanLetter, editFanLetter } from "../redux/modules/fanLetters";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: url(${backgroundImage});
  background-size: cover;
`;

const Background = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
`;

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
`;

const DetailContent = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px;
  background-color: rgba(178, 34, 34, 0.7);
  border-radius: 3%;
  width: 750px;
  height: 550px;
`;

const Nickname = styled.p`
  font-weight: bold;
  color: #f5f5f5;
  margin-bottom: 10px;
  font-size: 20px;
`;

const CreatedAt = styled.p`
  color: #e6e6fa;
  margin-bottom: 5px;
  font-size: 20px;
  margin-bottom: 20px;
`;

const WritedTo = styled.p`
  color: #e6e6fa;
  margin-bottom: 5px;
  font-size: 25px;
  font-weight: bolder;
  margin-bottom: 20px;
`;

const Content = styled.p`
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

const BackButton = styled(Link)`
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

const DeleteButton = styled.button`
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

const EditBtnContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const EditButton = styled.button`
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

const SaveButton = styled.button`
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

const Avatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin: 10px;
`;

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
      dispatch(editFanLetter(updatedLetter.id, editedContent));
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
    <Container>
      <Background>
        <DetailContainer>
          <DetailContent>
            <Avatar src={selectedLetter.avatar} alt="아바타" />
            <WritedTo>
              <strong>To.</strong> {selectedLetter.writedTo}
            </WritedTo>
            <CreatedAt>
              <strong>작성 시간:</strong> {selectedLetter.createdAt}
            </CreatedAt>
            {isEditing ? (
              <Content>
                <textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                />
              </Content>
            ) : (
              <Content>
               {selectedLetter.content}
              </Content>
            )}
            <Nickname>
              <strong>From.</strong> {selectedLetter.nickname}
            </Nickname>
          </DetailContent>
          {isEditing ? (
            <EditBtnContainer>
              <SaveButton onClick={handleSaveClick}>수정 완료</SaveButton>
              <BackButton to="/">취소</BackButton>
            </EditBtnContainer>
          ) : (
            <EditBtnContainer>
              <EditButton onClick={handleEditClick}>수정</EditButton>
              <DeleteButton onClick={handleDeleteClick}>삭제</DeleteButton>
            </EditBtnContainer>
          )}
          <BackButton to="/">홈으로 돌아가기</BackButton>
        </DetailContainer>
      </Background>
    </Container>
  );
};

export default Detail;
