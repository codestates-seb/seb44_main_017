import { PostCodeTypes } from "@/types/shared";
import DaumPostcodeEmbed from "react-daum-postcode";
import styled from "styled-components";
import { useState } from "react";
import CustomPrompt from "./../../utils/customPrompt";

interface PostCodeProps {
  postCode: PostCodeTypes;
  setPostCode: React.Dispatch<React.SetStateAction<PostCodeTypes>>;
}

const Postcode = ({ postCode, setPostCode }: PostCodeProps) => {
  const [detailValue, setDetailValue] = useState("");
  const [isOpenPrompt, setIsOpenPrompt] = useState(false);
  const promptElement = {
    title: "상세 주소 입력",
    content: "상세 주소를 입력해주세요.",
    label: "상세 주소",
  };

  const selectDetailAddress = () => {
    setPostCode({
      ...postCode,
      address: postCode.address + " " + detailValue,
    });

    setIsOpenPrompt(false);
  };

  const selectAddress = (data: any) => {
    setPostCode({
      ...postCode,
      address: data.address,
      postnum: data.zonecode,
    });

    setIsOpenPrompt(true);
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
      {isOpenPrompt && (
        <CustomPrompt
          promptElement={promptElement}
          isOpenPrompt={isOpenPrompt}
          setIsOpenPrompt={setIsOpenPrompt}
          detailValue={detailValue}
          setValue={setDetailValue}
          selectDetailAddress={selectDetailAddress}
          postCode={postCode}
        />
      )}
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
