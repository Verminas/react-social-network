import styled from "styled-components";
import { theme } from "common/styles/theme";

const Wrapper = styled.div`
    width: 100%;
    height: calc(100vh - ${theme.height.header});
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: center;
    align-items: center;
`

const Text = styled.p`
    font-size: clamp(20px, 3.5vw, 52px);
    color: ${theme.colors.textMain}
`

const Button = styled.button`
    width: 100%;
    max-width: 200px;
    height: 60px;
    text-align: center;
    border: none;
    background-color: ${theme.colors.accentLight};
    color: ${theme.colors.textLight};
    border-radius: 10px;
    padding: 10px 15px;
    font-weight: bold;
    font-size: clamp(12px, 2.5vw, 18px);
    cursor: pointer;
    transition: ${theme.transition.all};
    
    &:hover{
        background-color: ${theme.colors.accent};
    }
`

export const S = {
  Wrapper, Button, Text
}