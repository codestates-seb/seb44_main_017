import * as S from "./styled";
import {
  affiliated_company_18,
  affiliated_company_1,
  affiliated_company_2,
  affiliated_company_3,
  affiliated_company_4,
  affiliated_company_9,
  affiliated_company_10,
  affiliated_company_11,
  affiliated_company_14,
  affiliated_company_17,
  affiliated_company_20,
} from "../../../assets";

const AffiliatedCompanies = () => {
  const firstlist = [
    affiliated_company_18,
    affiliated_company_1,
    affiliated_company_2,
    affiliated_company_3,
    affiliated_company_4,
    affiliated_company_9,
    affiliated_company_10,
    affiliated_company_11,
    affiliated_company_14,
    affiliated_company_17,
    affiliated_company_20,
  ];
  const secondlist = [
    affiliated_company_3,
    affiliated_company_11,
    affiliated_company_9,
    affiliated_company_4,
    affiliated_company_20,
    affiliated_company_1,
    affiliated_company_14,
    affiliated_company_10,
    affiliated_company_2,
    affiliated_company_17,
    affiliated_company_18,
  ];
  const firstCompanyList = firstlist.map((imageSrc, idx) => {
    return (
      <S.ImageContainer key={`affiliated_company_${idx}`}>
        <S.CompanyImage src={imageSrc} />
      </S.ImageContainer>
    );
  });
  const secondCompanyList = secondlist.map((imageSrc, idx) => {
    return (
      <S.ImageContainer key={`affiliated_company_${idx}`}>
        <S.CompanyImage src={imageSrc} />
      </S.ImageContainer>
    );
  });

  return (
    <S.Container>
      <S.Title>RECLOSET과 함께하는 빈티지샵</S.Title>
      <S.SubTitle>등록과 판매로 쌓인 포인트도 사용이 가능합니다.</S.SubTitle>
      <S.UpperContainer>
        <S.UppserListContainer>{firstCompanyList}</S.UppserListContainer>
        <S.UppserListContainer>{firstCompanyList}</S.UppserListContainer>
      </S.UpperContainer>
      <S.LowerContainer>
        <S.LowerListContainer>{secondCompanyList}</S.LowerListContainer>
        <S.LowerListContainer>{secondCompanyList}</S.LowerListContainer>
      </S.LowerContainer>
    </S.Container>
  );
};

export default AffiliatedCompanies;
