import * as S from "./style";
import { useState } from "react";
import { PostCodeTypes } from "@/types/shared";
import Postcode from "@/components/Postcode/Postcode";

interface AddressInfoProps {
  postCode: PostCodeTypes;
  setPostCode: React.Dispatch<React.SetStateAction<PostCodeTypes>>;
}

const AddressInfo = (props: AddressInfoProps) => {
  const { postCode, setPostCode } = props;
  const [isOpenPostPopup, setIsOpenPostcode] = useState(false);

  const handlePostCode = () => {
    setIsOpenPostcode(!isOpenPostPopup);
  };

  return (
    <div>
      <S.AddressInfo>
        <h3>배송지 정보</h3>
        <div className="post_address">
          {postCode.address === "" ? (
            <span>주소를 등록해주세요.</span>
          ) : (
            <span>
              {postCode.address} ({postCode.postnum})
            </span>
          )}
        </div>
        <div className="postcode_btn">
          <button onClick={handlePostCode}>배송지 입력</button>
          {isOpenPostPopup && (
            <Postcode postCode={postCode} setPostCode={setPostCode} />
          )}
        </div>
      </S.AddressInfo>
    </div>
  );
};

export default AddressInfo;
