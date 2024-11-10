import styled, {css} from "styled-components";
import { Avatar, Badge, Button, Card } from "antd";
import {theme} from "common/styles/theme";

const StyledCard = styled(Card)`
    width: 100%;
    max-width: 500px;
    min-width: 200px;
    
    @media ${theme.media.mobile}{
        min-width: 100px;
    }

    & .ant-card-body {
        padding: clamp(10px, 2.5vw, 24px);
    }
`

const StyledBadge = styled(Badge)`
    width: 100%;
    max-width: 500px;
`

const StyledCardMeta = styled(Card.Meta)`
    font-size: clamp(12px, 3vw, 16px);
    & .ant-card-meta-title {
      font-size: clamp(12px, 3vw, 16px);
    }
    
    & .ant-card-meta-avatar{
        @media ${theme.media.small} {
            display: none;
        }
    }
`

const StyledAvatar = styled(Avatar)`
    width: 80px;
    height: 80px;
    @media ${theme.media.tablet} {
        width: 40px;
        height: 40px;
    }
`

const StyledButton = styled(Button)`
    max-width: 200px;
    width: 100%;
    padding: 4px clamp(5px, 2.5vw, 15px);
    font-size: clamp(10px, 2.5vw, 16px);
    @media ${theme.media.mobile} {
        & span {
            display: block;
        }

        & span.ant-btn-icon, & span.ant-btn-icon * {
            display: none;
        }
    }
    @media ${theme.media.small} {
        & span {
            display: none;
        }

        & span.ant-btn-icon, & span.ant-btn-icon * {
            display: block;
        }
    }
`

export const S = {
  StyledCard,
  StyledAvatar,
  StyledBadge,
  StyledCardMeta,
  StyledButton
}