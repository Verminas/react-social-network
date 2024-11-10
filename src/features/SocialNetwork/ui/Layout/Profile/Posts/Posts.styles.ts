import styled from "styled-components";
import { theme } from "common/styles/theme";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding-top: 30px;
`

const Form = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`

const Title = styled.h3`
    color: ${theme.colors.textMain}
`

const Posts = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-top: 20px;
`

export const S = {
  Wrapper, Form, Title, Posts
};