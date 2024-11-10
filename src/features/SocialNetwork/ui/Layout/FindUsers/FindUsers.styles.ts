import styled from "styled-components";


const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    padding: clamp(10px, 2.5vw, 15px) clamp(10px, 2.5vw, 25px);
`

const WrapperItems = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

export const S = {
  Wrapper, WrapperItems
};