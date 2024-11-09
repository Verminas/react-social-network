import styled from "styled-components";
import { Button, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { theme } from "common/styles/theme";

const StyledForm = styled(Form)`
    max-width: 600px;
    align-self: center;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 15px;
    
    & .ant-form-item{
        margin-bottom: 0;
    }
    
    & .ant-row label{
        width: 150px;
    }
`

const StyledTextArea = styled(TextArea)`
    max-width: 400px;
    height: 60px;
    resize: none;
    
    @media ${theme.media.mobile} {
        height: 100px;
    }
`

const StyledButton = styled(Button)`
    max-width: 200px;
    width: 100%;
   align-self: center;
`

const StyledInput = styled(Input)`
    max-width: 400px;
`



export const S = {
  StyledForm, StyledTextArea, StyledButton, StyledInput
};