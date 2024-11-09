import styled, { css } from "styled-components";
import { theme } from "common/styles/theme";
import { Button, Layout } from "antd";

const { Header } = Layout;

const StyledHeader = styled(Header)`
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    position: relative;
    background: ${theme.colors.backgroundColorLight};
`;

const LogoButtonWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    min-width: 120;
`;

const Logo = styled.img`
    width: 40px;
    height: 40px;
`;

const CollapsedButton = styled(Button)<{ isloggedin: string }>`
    font-size: 16px;
    width: 64px;
    display: none;

    ${props => props.isloggedin === "true" && css`
        @media screen and (min-width: ${theme.media.tabletTs}px) {
            display: flex;
        }
    `}
`;

const LogOutButton = styled(Button)<{ isloggedin: string }>`
    font-size: 16px;
    height: 64px;
    display: none;

    ${props => props.isloggedin === "true" && css`
        display: flex;
    `}
`;


export const S = {
  StyledHeader, LogoButtonWrapper, Logo, CollapsedButton, LogOutButton
};