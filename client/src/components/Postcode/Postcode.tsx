import { PostCodeTypes } from "@/types/shared";
import DaumPostcodeEmbed from "react-daum-postcode";
import styled from "styled-components";

interface PostCodeProps {
  postCode: PostCodeTypes;
  setPostCode: React.Dispatch<React.SetStateAction<PostCodeTypes>>;
}

const Postcode = ({ postCode, setPostCode }: PostCodeProps) => {
  console.log(postCode);

  const selectDetailAddress = () => {
    return prompt("상세 주소를 입력해주세요,");
  };

  const selectAddress = (data: any) => {
    setPostCode({
      ...postCode,
      address: data.address + " " + selectDetailAddress(),
      postnum: data.zonecode,
    });
  };

  const themeObj = {
    bgColor: "#162525",
    searchBgColor: "#162525",
    contentBgColor: "#162525",
    pageBgColor: "#162525",
    textColor: "#FFFFFF",
    queryTextColor: "#FFFFFF",
    outlineColor: "#444444",
  };

  return (
    <>
      <PostCodeBox>
        <DaumPostcodeEmbed
          className="postcode"
          onComplete={selectAddress}
          theme={themeObj}
          autoClose
        />
      </PostCodeBox>
    </>
  );
};

export default Postcode;

const PostCodeBox = styled.div`
  & .postcode {
    display: block;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 340px !important;
    height: 500px !important;
    border: 2px solimport #666;
  }
`;
