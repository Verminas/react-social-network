import styled, { css } from "styled-components";
import { theme } from "common/styles/theme";
import { Layout } from "antd";

const { Content } = Layout;

const StyledContent = styled(Content)<{menucollapsed: string | undefined}>`
    margin: clamp(5px, 3vw, 24px) clamp(5px, 3vw, 16px) 0;
    padding: clamp(5px, 2.5vw, 24px);
    height: 100%;
    min-height: calc(100vh - (${theme.height.header} + 30px));
    background: ${theme.colors.backgroundColorLight};
    border-radius: ${theme.borderRadius.main};
    transition: all .4s ease-in-out;

    max-width: calc(100% - (${theme.width.navBar.max} + 20px));

    ${props => props.menucollapsed === 'true' && css`
        left: ${theme.width.navBar.min};
        max-width: calc(100% - (${theme.width.navBar.min} + 20px));
    `}
    
    @media ${theme.media.small} {
    max-width: calc(100% - (${theme.width.navBar.min} + 10px));
}
`

export const S = {
  StyledContent
};