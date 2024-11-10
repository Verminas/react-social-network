import {S as common} from "common/styles/Card.styles"
import styled, { css } from "styled-components";
import { theme } from "common/styles/theme";
import { Button } from "antd";
import { CheckOutlined } from "@ant-design/icons";

const StyledCard = styled(common.StyledCard)<{ismymessage: string | undefined}>`
    max-width: 300px;
    margin-bottom: 10px;
    
    ${props => props.ismymessage === 'true' && css`
        align-self: flex-end;
    `}
    ${props => props.ismymessage === 'false' && css`
        align-self: flex-start;
    `}

    & .ant-card-body {
        padding: 10px;
    }
`

const StyledAvatar = styled(common.StyledAvatar)`
    width: 40px;
    height: 40px;
    @media ${theme.media.mobile} {
        width: 20px;
        height: 20px;
    }
    @media ${theme.media.small} {
        display: none;
    }
`

const StyledButton = styled(Button)`
    position: absolute;
    top: 5px;
    right: 10px;
`

const StyledLikes = styled.p`
    position: absolute;
    bottom: 6px;
    right: 10px;
`




export const S = {...common, StyledCard, StyledAvatar, StyledButton, StyledLikes}