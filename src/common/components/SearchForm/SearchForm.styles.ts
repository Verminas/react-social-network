import {S as common} from "common/styles/Card.styles"
import styled from "styled-components";
import { Form } from "antd";
import { theme } from "common/styles/theme";

const StyledForm = styled(Form)`
    width: 100%;
    max-width: 600px;
    display: flex;
    gap: 10px;
    justify-content: space-between;
    
    @media ${theme.media.tablet} {
        flex-direction: column;
        align-self: center;
    }
`

const StyledInput = styled(Form.Item)`
    max-width: 350px;
`

export const S = {...common, StyledForm, StyledInput}