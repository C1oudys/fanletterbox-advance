import React from "react";
import styled from "styled-components";
import Letter from "./Letter";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const StyledLink = styled(RouterLink)`
  text-decoration: none;
`;

const LetterList = ({ activeTab, fanLetters, onLetterClick }) => {
  if (!fanLetters) {
    return null;
  }

  return (
    <div>
      {fanLetters
        .filter((letter) => activeTab === "all" || letter.writedTo === activeTab)
        .map((letter) => (  
          <StyledLink key={letter.id} to={`/detail/${letter.id}`} onClick={() => onLetterClick(letter.id)}>
            <Letter letter={letter} />
          </StyledLink>
        ))}
    </div>
  );
};

export default LetterList;
