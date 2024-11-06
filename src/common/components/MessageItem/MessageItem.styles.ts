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

const Time = styled.span`
    position: absolute;
    bottom: 10px;
    right: 40px;

    @media ${theme.media.small} {
        display: none;
    }
`

const StyledButton = styled(Button)`
    position: absolute;
    top: 10px;
    right: 10px;
`

const CheckIcon = styled(CheckOutlined)<{isViewed?: boolean}>`
    position: absolute;
    bottom: 15px;
    right: 15px;

    ${props => props.isViewed && css`
        color: ${theme.colors.accent};
    `} 
    @media ${theme.media.small} {
    display: none;
}
`

export const S = {...common, StyledCard, StyledAvatar, Time, StyledButton, CheckIcon}