import styled from "styled-components";
import {theme} from "../../../styles/theme";

const Label = styled.span`
  display: block;
  color: ${theme.colors.textSecondary};
  line-height: 1.5;
  font-size: 18px;
  text-transform: capitalize;
`;

const Link = styled.a`
  color: ${theme.colors.textMain};
  line-height: 1.5;
  font-size: 18px;
  text-transform: lowercase;
`;

export const S = {
    Link, Label
}