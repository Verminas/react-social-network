import styled from "styled-components";
import { Button } from "antd";

const DialogsWrapper = styled.div`
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const EmptyWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 15px;
`

const StyledButton = styled(Button)`
    margin-top: 10px;
    margin-left: 10px;
`

export const S = {
  DialogsWrapper, EmptyWrapper, StyledButton
};