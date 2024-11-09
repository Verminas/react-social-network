import styled from "styled-components";
import { Select } from "antd";

const Section = styled.section`
    display: flex;
    flex-direction: column;
    gap: 15px
`

const SelectWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
`

const StyledSelect = styled(Select)`
    width: 120px;
`

const NewsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

export const S = {
  Section, SelectWrapper, StyledSelect, NewsWrapper
};