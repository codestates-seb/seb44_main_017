import styled from "styled-components";

const Backdrop = () => {
  return <BackDrop></BackDrop>;
};

export default Backdrop;

const BackDrop = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.2);
  left: 0;
  top: 0;
  z-index: 10;
  @media (min-width: 1024px) {
    display: none;
  }
`;
