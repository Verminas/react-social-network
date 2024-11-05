import styled from "styled-components";
import { theme } from "common/styles/theme";

const Label = styled.span`
    display: block;
    color: ${theme.colors.textSecondary};
    line-height: 1.5;
    font-size: clamp(14px, 3vw, 18px);
    text-transform: capitalize;
`;

const Link = styled.a`
    color: ${theme.colors.textMain};
    text-transform: lowercase;
    word-wrap: break-word; /* Для поддержки старых браузеров */
    overflow-wrap: break-word; /* Для современных браузеров */
`;

export const S = {
  Link, Label
};