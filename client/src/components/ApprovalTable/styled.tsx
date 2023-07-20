import { Slider, TextField } from "@mui/material";
import styled from "styled-components";
interface TitleTextFieldProps {
  name: string;
}
export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Field = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px 56px;
`;
export const Content_1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-right: 36px;
`;
export const Content_2 = styled.div`
  display: flex;
  flex-direction: column;
  width: 800px;
`;
export const SliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 256px;
`;
export const InfoContainer = styled.div<{ name: string }>`
  display: flex;
  flex-direction: column;
  margin-top: ${(props) => (props.name === "name" ? "" : "16px")};
`;
export const PriceContainer = styled.div`
  display: flex;
  align-items: center;
`;
export const BtnConatiner = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
`;
export const ProductsTable = styled.li`
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid var(--color-gray200);
  padding: 16px 0px;
`;
export const productsInfo = styled.span<{ name: string }>`
  width: 150px;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
`;
export const ProductImage = styled.img<{ src: string }>`
  width: 256px;
  height: 256px;
  border: 2px solid var(--color-darkblue);
  border-radius: 16px;
  margin-bottom: 24px;
`;
export const CustomSlider = styled(Slider)`
  color: var(--color-darkblue) !important;
`;
export const InfoTitle = styled.span`
  font-size: 16px;
  font-weight: 700;
`;
export const CustomTextField = styled(TextField)<TitleTextFieldProps>(
  (props) => ({
    width:
      props.name === "name"
        ? "50%"
        : props.name === "price"
        ? "30%"
        : props.name === "pointValue"
        ? "30%"
        : "100%",
    marginTop: "4px !important",
    minWidth: "256px !important",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius: "8px",
        borderWidth: 2,

        borderColor: "var(--color-darkblue)",
      },
      "&:hover fieldset": {
        borderColor: "var(--color-darkblue)",
      },
      "&.Mui-focused fieldset": {
        borderColor: "var(--color-darkgreen)",
      },
    },
    "& .MuiOutlinedInput-input": {
      padding: "8px",
    },
  })
);
export const Currency = styled.span`
  margin-left: 8px;
  font-size: 16px;
  font-weight: 700;
  text-align: center;
`;
export const ApprovalBtn = styled.button<{ approval: boolean }>`
  border: 2px solid var(--color-darkblue);
  border-radius: 99px;
  background-color: ${(props) =>
    props.approval ? "var(--color-darkblue)" : "var(--color-white)"};
  font-size: 16px;
  font-weight: 700;
  color: ${(props) =>
    props.approval ? "var(--color-white)" : "var(--color-darkblue)"};
  padding: 8px 24px;
  margin-right: ${(props) => (props.approval ? "16px" : "")};
`;
export const AgreeBtn = styled.button`
  padding: 8px 20px;
  border: 0;
  border-radius: 16px;
  color: white;
  background-color: #fd3c3c;
`;
export const CancelBtn = styled.button`
  padding: 8px 20px;
  border: 0;
  border-radius: 16px;
  color: black;
`;
