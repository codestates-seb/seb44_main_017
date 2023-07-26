import styled from "styled-components";
import GitHubIcon from "@mui/icons-material/GitHub";

export const FooterContainer = styled.footer`
  background-color: var(--color-darkblue);
  display: flex;
  flex-direction: column;
  align-items: center;
  bottom: 0px;
  padding: 36px 60px 24px 60px;
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  width: 100%;
  @media (max-width: 767px) {
    margin-bottom: 8px;
  }
`;
export const LogoIcon = styled.img`
  margin-left: 4px;
  @media (max-width: 767px) {
    display: none;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 36px;
    height: 16px;
  }
  @media (min-width: 1024px) {
    width: 48px;
    height: 24px;
  }
`;
export const LogoTitle = styled.div`
  color: var(--color-white);
  @media (max-width: 767px) {
    font-size: 16px;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    font-size: 24px;
  }
  @media (min-width: 1024px) {
    font-size: 36px;
  }
`;
export const ContentContainer = styled.div`
  display: flex;
  width: 100%;
  @media (max-width: 767px) {
    flex-direction: column;
    div:last-child {
      margin-bottom: 12px;
    }
  }
`;
export const ContentTitle = styled.div`
  color: var(--color-gray200);
  font-weight: var(--font-weight-700);
  margin-bottom: 16px;
  @media (max-width: 767px) {
    font-size: 12px;
    margin-bottom: 12px;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    font-size: 12px;
  }
  @media (min-width: 1024px) {
    font-size: 16px;
  }
`;
export const Content = styled.li`
  color: var(--color-gray200);
  margin-bottom: 12px;
  display: flex;
  &:hover {
    cursor: pointer;
  }
  &:last-child {
    margin-bottom: 16px;
  }
  @media (max-width: 767px) {
    font-size: 10px;
    &:last-child {
      margin-bottom: 12px;
    }
  }
`;
export const CloseButton = styled.button`
  width: 56px;
  height: 36px;
  background-color: var(--color-darkblue);
  border-radius: 4px;
  color: var(--color-white);
`;
export const GitHub = styled(GitHubIcon)`
  width: 20px;
  height: 20px;
  margin-left: 4px;
`;
export const GitHubLink = styled.a`
  color: var(--color-gray200);
  display: flex;
`;
