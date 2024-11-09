import styled from "styled-components";
import Sider from "antd/es/layout/Sider";
import { theme } from "common/styles/theme";

const StyledSider = styled(Sider)`
    max-width: ${theme.width.navBar.max};
    position: fixed;
    top: ${theme.height.header};
    left: 0;
    height: 100vh;
    z-index: 100;
`

export const S = {
  StyledSider
};