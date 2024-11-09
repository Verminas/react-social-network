import styled from "styled-components";
import { theme } from "common/styles/theme";
import { Layout } from "antd";

const { Content } = Layout;

const StyledContent = styled(Content)`
    margin: clamp(5px, 3vw, 24px) clamp(5px, 3vw, 16px);
    padding: clamp(5px, 2.5vw, 24px);
    min-height: 280px;
    background: ${theme.colors.backgroundColorLight};
    border-radius: ${theme.borderRadius.main};
`

export const S = {
  StyledContent
};