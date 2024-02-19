import React, { useState } from "react";
import styled from "styled-components";
import YujinImage from "../assets/Yujin.png";
import GaeulImage from "../assets/Gaeul.png";
import ReiImage from "../assets/Rei.png";
import WonyoungImage from "../assets/Wonyoung.png";
import LizImage from "../assets/Liz.png";
import LeeseoImage from "../assets/Leeseo.png";
import AllImage from "../assets/IveLogo.jpeg";


const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const ArtistTab = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  filter: brightness(50%);
  position: relative;
  transition: filter 0.3s ease;

  &:hover {
    filter: brightness(110%);
  }

  ${(props) =>
    props.isActive &&
    `
    filter: brightness(110%);
  `}
`;

const ArtistInfoContainer = styled.div`
  position: absolute;
  bottom: 5%;
  font-size: 25px;
  font-weight: bolder;
  text-shadow: 0 0 7px #f00, 0 0 10px #f00, 0 0 21px #f00, 0 0 42px #f00,
  0 0 82px #f00, 0 0 92px #f00, 0 0 102px #f00, 0 0 151px #f00;
  color: white;
  width: 100%;
  padding: 5px;
  box-sizing: border-box;
  text-align: center;
`;

const Header = ({ setActiveTab, activeTab }) => {
  const artists = ["all", "유진", "가을", "레이", "원영", "리즈", "이서"];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const artistImages = {
    all: AllImage,
    유진: YujinImage,
    가을: GaeulImage,
    레이: ReiImage,
    원영: WonyoungImage,
    리즈: LizImage,
    이서: LeeseoImage,
  };

  const artistNames = {
    all: "전체보기",
    유진: "안유진",
    가을: "가을",
    레이: "레이",
    원영: "장원영",
    리즈: "리즈",
    이서: "이서",
  };

  return (
    <HeaderContainer>
      {artists.map((artist) => (
        <ArtistTab
          key={artist}
          isActive={activeTab === artist}
          onClick={() => handleTabClick(artist)}
        >
          <img
            src={artistImages[artist]}
            alt={`${artist}`}
            style={{ width: "206px", height: "350px", objectFit: "cover" }}
          />
          <ArtistInfoContainer>
            {artistNames[artist]}
          </ArtistInfoContainer>
        </ArtistTab>
      ))}
    </HeaderContainer>
  );
};

export default Header;
