import styled from "styled-components";

export const SubTitleBarContainer = styled.section`
  width: 100%;
  @media (max-width: 767px) {
    margin-bottom: 16px;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    margin-bottom: 62px;
  }
  @media (min-width: 1024px) {
    margin-bottom: 60px;
  }
`;
export const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
export const NoticeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media (max-width: 767px) {
    margin-bottom: 16px;
    max-width: 336px;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    margin-bottom: 32px;
    max-width: 512px;
  }
  @media (min-width: 1024px) {
    margin-bottom: 60px;
    max-width: 1024px;
  }
`;
export const NoticeBox = styled.div`
  display: flex;
  margin: 8px 8px;
`;
export const SelectBar = styled.div`
  display: flex;
  margin: 0px 8px 8px 0px;
  justify-content: end;
  @media (max-width: 767px) {
    width: 336px;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 512px;
  }
  @media (min-width: 1024px) {
    width: 1024px;
  }
`;
export const PaginationBar = styled.div`
  display: flex;
  justify-content: center;
`;
