import styled from "styled-components";
import { theme } from "common/styles/theme";
import { Button, Checkbox, Form } from "antd";
import { FieldType } from "../lib/useLogin";

const StyledForm = styled(Form)`
    max-width: 400px;
    width: 80%;
    margin: 10px;
    padding: clamp(15px, 3vw, 30px) clamp(10px, 3vw, 20px) clamp(10px, 3vw, 25px);
    background-color: ${theme.colors.backgroundColorLight};
    border-radius: 10px;
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    box-shadow: 0 0 20px ${theme.colors.boxShadowMain};
`;

const StyledCheckbox = styled(Checkbox)`
    font-size: 16px;
`;

const ButtonSubmit = styled(Button)`
    font-Size: 18px;
    width: 100%;
`;

const TextWrapper = styled.div`
    font-size: 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
    color: ${theme.colors.textAdditional};
    
    & a {
        color: ${theme.colors.accent}
    }
`

const FormItemCheckbox = styled(Form.Item<FieldType>)`
    display: flex;
    justify-content: center;
`

export const S = {
  StyledForm, StyledCheckbox, ButtonSubmit, TextWrapper, FormItemCheckbox
};