import styled from "styled-components";
import Sider from "antd/es/layout/Sider";
import { theme } from "common/styles/theme";

const StyledSider = styled(Sider)`
    max-width: ${theme.width.navBar.max};
    position: sticky;
    top: ${theme.height.header};
    left: 0;
    bottom: 0;
    max-height: 100vh;
    z-index: 100;
`

export const S = {
  StyledSider
};