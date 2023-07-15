import * as S from "./styled";
import {
  delivery,
  inspect,
  point,
  clothesShop,
  sellingPoint,
} from "../../../assets";
const FlowDescription = () => {
  return (
    <S.FlowConatiner>
      <S.Title>저희 RECLOSET은 이렇게 관리됩니다.</S.Title>
      <S.MobileScrollContainer>
        <S.CardContainer>
          <S.UpperContainer>
            <S.FlowCardContainer>
              <S.FlowImage src={delivery} />
              <S.FlowDescirbe>
                더이상 필요하지 않은 의류들을
                <S.Highlight>수거 신청</S.Highlight>합니다.
              </S.FlowDescirbe>
              <S.FlowDescirbe></S.FlowDescirbe>
            </S.FlowCardContainer>
            <S.FlowCardContainer>
              <S.FlowImage src={inspect} />
              <S.FlowDescirbe>
                전달받은 의류들은 <br /> 저희 RECLOSET이 <br />
                <S.Highlight> 꼼꼼한 검수</S.Highlight>를 진행합니다.
              </S.FlowDescirbe>
              <S.FlowDescirbe></S.FlowDescirbe>
            </S.FlowCardContainer>
            <S.FlowCardContainer>
              <S.FlowImage src={point} />
              <S.FlowDescirbe>
                검수가 끝난 의류들은 <br />
                <S.Highlight>포인트</S.Highlight>가 되어 지급됩니다.
              </S.FlowDescirbe>
              <S.FlowDescirbe></S.FlowDescirbe>
            </S.FlowCardContainer>
          </S.UpperContainer>
          <S.lowwerContainer>
            <S.FlowCardContainer>
              <S.FlowImage src={clothesShop} />
              <S.FlowDescirbe>
                검수를 통과한 제품들은 RECLOSET 사이트에
                <S.Highlight> 등록 </S.Highlight>또는 빈티지샵에
                <S.Highlight> 판매</S.Highlight>됩니다.
              </S.FlowDescirbe>
            </S.FlowCardContainer>
            <S.FlowCardContainer>
              <S.FlowImage src={sellingPoint} />
              <S.FlowDescirbe>
                등록된 상품이 판매되면 <br /> 해당 상품의
                <S.Highlight> 포인트</S.Highlight>가 <br /> 사용자에게
                <S.Highlight> 추가 지급</S.Highlight>됩니다.
              </S.FlowDescirbe>
              <S.FlowDescirbe></S.FlowDescirbe>
            </S.FlowCardContainer>
          </S.lowwerContainer>
        </S.CardContainer>
      </S.MobileScrollContainer>
    </S.FlowConatiner>
  );
};

export default FlowDescription;
