import {S as common} from "common/styles/Card.styles"
import styled from "styled-components";

const ButtonsWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    padding-top: 10px;
    gap: clamp(5px, 2.5vw, 30px);
`

export const S = {...common, ButtonsWrapper}