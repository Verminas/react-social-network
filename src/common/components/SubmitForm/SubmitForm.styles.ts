import {S as common} from "common/styles/Card.styles"
import styled from "styled-components";
import { theme } from "common/styles/theme";
import { Form } from "antd";
import TextArea from "antd/es/input/TextArea";

const StyledForm = styled(Form)`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 15px;

    @media ${theme.media.tablet} {
        flex-direction: column;
        align-items: center;
        & .ant-form-item{
            margin-inline: 0;
        }
    }
`

const StyledItem = styled(Form.Item)`
    width: 70%;
    @media ${theme.media.tablet} {
        width: 100%;
    }
`
const StyledTextarea = styled(TextArea)`
    height: 80px;
    resize: none;
    @media ${theme.media.tablet} {
        height: 100px;
    }
`

const StyledButton = styled(common.StyledButton)`
    max-width: 150px;
    @media ${theme.media.mobile} {
        margin-top: 10px;
        max-width: 100%;
    }

    @media ${theme.media.small} {
        & span {
            display: block;
        }
    }
`

export const S = {...common, StyledForm, StyledItem, StyledTextarea, StyledButton}