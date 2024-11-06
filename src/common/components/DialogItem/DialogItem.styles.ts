import {S as common} from "common/styles/Card.styles"
import styled, { css } from "styled-components";
import { Card } from "antd";
import { theme } from "common/styles/theme";

const StyledCard = styled(Card)<{isnewmessages: string | undefined}>`
    width: 100%;
    max-width: 500px;

    & .ant-card-body {
        padding: clamp(10px, 2.5vw, 24px);
    }

    ${props => props.isnewmessages === 'true' && css`
        background-color: ${theme.colors.accentLight};
    `}
`

export const S = {...common, StyledCard}