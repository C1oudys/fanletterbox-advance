import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Letter from "./Letter";
import { Link as RouterLink } from "react-router-dom";
import { fetchFanLettersAsync } from "../redux/modules/fanLettersSlice"; 

const StyledLink = styled(RouterLink)`
  text-decoration: none;
`;

const LetterList = ({ activeTab }) => {
  const dispatch = useDispatch();
  const fanLetters = useSelector((state) => state.fanLetters.fanLetters);

  useEffect(() => {
    dispatch(fetchFanLettersAsync());
  }, [dispatch]);

  if (!fanLetters.length) {
    return <div>팬레터가 없습니다.</div>;
  }

  return (
    <div>
      {fanLetters
        .filter((letter) => activeTab === "all" || letter.writedTo === activeTab)
        .map((letter) => (
          <StyledLink key={letter.id} to={`/detail/${letter.id}`}>
            <Letter letter={letter} />
          </StyledLink>
        ))}
    </div>
  );
};

export default LetterList;
