import styled from "styled-components";
import VisibilityIcon from "@mui/icons-material/Visibility";

export const InfoContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 80px 0px 0px 0px;

  @media (max-width: 767px) {
    flex-direction: column;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    flex-direction: column;
  }
`;
export const ImgBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 767px) {
    margin-bottom: 40px;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    margin-bottom: 44px;
  }
  @media (min-width: 1024px) {
    margin-right: 80px;
  }
`;
export const ImgPreview = styled.img`
  width: 200px;
  height: 200px;
  margin-bottom: 8px;
  border-radius: 20px;
  border: 2px solid var(--color-gray200);
`;
export const ImgContent = styled.input`
  display: none;
`;
export const ImgChangeButton = styled.button`
  width: 130px;
  background-color: var(--color-darkblue);
  font-weight: var(--font-weight-700);
  color: var(--color-lightivory);
  border: none;
  border-radius: 20px;
  padding: 8px 0px;
  font-size: 16px;
  @media (max-width: 767px) {
    width: 80px;
    font-size: 10px;
  }
`;
export const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 544px;
  @media (max-width: 767px) {
    font-size: 10px;
    width: 320px;
  }
`;
export const InfoContentBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 36px;
`;
export const InfoTitle = styled.div`
  font-weight: var(--font-weight-700);
  @media (max-width: 767px) {
    font-size: 10px;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    font-size: 16px;
  }
  @media (min-width: 1024px) {
    font-size: 16px;
  }
`;
export const InfoContent = styled.div`
  margin-left: 80px;
`;
export const InfoInputbox = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  width: 400px;
  padding: 8px 0px 8px 12px;
  font-size: 16px;
  font-weight: 700;
  border: 2px solid var(--color-gray200);
  border-radius: 20px;
  position: relative;
  @media (max-width: 767px) {
    width: 200px;
  }
  @media (min-width: 1024px) {
    padding: 12px 0px 12px 12px;
  }
`;
export const InfoInput = styled.input`
  outline: none;
  border: none;
  font-weight: 700;
  @media (max-width: 767px) {
    font-size: 10px;
  }
`;
export const VisibilityButton = styled(VisibilityIcon)`
  width: 16px;
  height: 10px;
  color: var(--color-darkblue);
  position: absolute;
  right: 12px;
  cursor: pointer;
`;
export const DuplicateCheck = styled.button`
  position: absolute;
  right: 12px;
  font-weight: 700;
  background-color: var(--color-gray100);
  border: none;
  padding: 4px 0px;
  border-radius: 20px;
  @media (max-width: 767px) {
    width: 72px;
    font-size: 10px;
    margin-left: 8px;
    right: 4px;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 96px;
    margin-left: 16px;
  }
  @media (min-width: 1024px) {
    width: 100px;
    margin-left: 48px;
  }
`;
export const WithdrawalButton = styled.button`
  font-weight: 700;
  color: var(--color-lightivory);
  background-color: var(--color-lightred);
  border: none;
  padding: 8px 0px;
  border-radius: 20px;
  @media (max-width: 767px) {
    width: 80px;
    font-size: 10px;
    margin-left: 8px;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 96px;
    margin-left: 16px;
  }
  @media (min-width: 1024px) {
    width: 100px;
    margin-left: 48px;
  }
`;
export const SubmitButton = styled.button`
  margin-left: auto;
  font-weight: 700;
  color: var(--color-lightivory);
  background-color: var(--color-darkblue);
  border: none;
  padding: 8px 0px;
  border-radius: 20px;
  @media (max-width: 767px) {
    width: 80px;
    font-size: 10px;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 96px;
  }
  @media (min-width: 1024px) {
    width: 100px;
  }
`;
