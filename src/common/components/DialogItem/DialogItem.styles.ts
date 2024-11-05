import styled, {css} from "styled-components";
import {Avatar, Badge, Card} from "antd";
import {theme} from "common/styles/theme";

const StyledCard = styled(Card)<{isNewMessages: boolean}>`
  width: 100%;
  max-width: 500px;
  
  & .ant-card-body {
    padding: clamp(10px, 2.5vw, 24px);
  }
  
  ${props => props.isNewMessages && css`
            background-color: ${theme.colors.backgroundColorAccent};
        `}
`

const StyledBadge = styled(Badge)`
  width: 100%;
`

const StyledCardMeta = styled(Card.Meta)`
    font-size: clamp(12px, 3vw, 16px);
    & .ant-card-meta-title {
      font-size: clamp(12px, 3vw, 16px);
    }
`

const StyledAvatar = styled(Avatar)`
    width: 80px;
    height: 80px;
    @media ${theme.media.tablet} {
        width: 40px;
        height: 40px;
    }
    @media ${theme.media.small} {
        display: none;
    }
`

export const S = {
    StyledCard,
    StyledAvatar,
    StyledBadge,
    StyledCardMeta
}