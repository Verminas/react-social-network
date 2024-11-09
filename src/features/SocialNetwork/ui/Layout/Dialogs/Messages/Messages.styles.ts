import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
`
const MessagesWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 70vh;
    overflow-y: auto;
    overflow-x: hidden;
    scroll-behavior: smooth;
`

export const S = {
  Wrapper, MessagesWrapper
};