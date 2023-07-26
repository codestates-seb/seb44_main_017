import { useState } from "react";
import { Link } from "react-router-dom";
import * as S from "./style";
import Logo from "../../assets/logo_footer.svg";
import { Modal, Box } from "@mui/material";

const Footer = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <S.FooterContainer>
      <S.LogoContainer>
        <Link to="/" />
        <S.LogoTitle>RECLOSET</S.LogoTitle>
        <S.LogoIcon src={Logo} />
      </S.LogoContainer>
      <S.ContentContainer>
        <S.ContentBox>
          <S.ContentTitle>
            Copyright©2023 RECLOSET.All rights reserved.
          </S.ContentTitle>
        </S.ContentBox>
        <S.ContentBox>
          <S.ContentTitle>SUPPORT</S.ContentTitle>
          <ul>
            <S.Content onClick={handleOpenModal}>이용약관</S.Content>
            <S.Content onClick={handleOpenModal}>개인정보처리방침</S.Content>
            <S.Content onClick={handleOpenModal}>문의하기</S.Content>
          </ul>
        </S.ContentBox>
        <S.GithubContainer>
          <S.ContentGithub>
            <S.ContentTitle>WITH.FE</S.ContentTitle>
            <ul>
              <S.Content>
                <S.GitHubLink
                  href="https://github.com/g4dalcom"
                  target="_blank"
                >
                  강민승
                  <S.GitHubIcon />
                </S.GitHubLink>
              </S.Content>
              <S.Content>
                <S.GitHubLink
                  href="https://github.com/NonFungibleCode"
                  target="_blank"
                >
                  안상우
                  <S.GitHubIcon />
                </S.GitHubLink>
              </S.Content>
              <S.Content>
                <S.GitHubLink
                  href="https://github.com/FASTFOX24"
                  target="_blank"
                >
                  오승찬
                  <S.GitHubIcon />
                </S.GitHubLink>
              </S.Content>
              <S.Content>
                <S.GitHubLink href="https://github.com/lhyjjg" target="_blank">
                  이현영
                  <S.GitHubIcon />
                </S.GitHubLink>
              </S.Content>
            </ul>
          </S.ContentGithub>
          <S.ContentGithub>
            <S.ContentTitle>WITH.BE</S.ContentTitle>
            <ul>
              <S.Content>
                <S.GitHubLink
                  href="https://github.com/pparkjyy"
                  target="_blank"
                >
                  박준용
                  <S.GitHubIcon />
                </S.GitHubLink>
              </S.Content>
              <S.Content>
                <S.GitHubLink
                  href="https://github.com/yelm-212"
                  target="_blank"
                >
                  신예림
                  <S.GitHubIcon />
                </S.GitHubLink>
              </S.Content>
              <S.Content>
                <S.GitHubLink
                  href="https://github.com/hwanghojun"
                  target="_blank"
                >
                  황호준
                  <S.GitHubIcon />
                </S.GitHubLink>
              </S.Content>
            </ul>
          </S.ContentGithub>
        </S.GithubContainer>
      </S.ContentContainer>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: 300,
            height: 200,
            bgcolor: "#ffffff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            borderRadius: 2,
          }}
        >
          <div style={{ marginBottom: "32px" }}>준비중입니다.</div>
          <div>
            <S.CloseButton onClick={handleCloseModal}>확인</S.CloseButton>
          </div>
        </Box>
      </Modal>
    </S.FooterContainer>
  );
};

export default Footer;
