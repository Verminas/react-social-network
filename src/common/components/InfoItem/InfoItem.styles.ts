import styled from "styled-components";
import { theme } from "common/styles/theme";

const Label = styled.p`
  color: ${theme.colors.textSecondary};
  line-height: 1.5;
  font-size: clamp(14px, 3vw, 18px);
`;

const Text = styled.span`
  color: ${theme.colors.textMain};
`;

export const S = {
  Label, Text
}