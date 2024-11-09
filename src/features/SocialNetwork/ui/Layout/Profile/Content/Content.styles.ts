import styled from "styled-components";
import { theme } from "common/styles/theme";
import { Avatar } from "antd";


const Wrapper = styled.div`
    display: flex;
    gap: 15px;
    justify-content: space-evenly;

    @media ${theme.media.tablet} {
        flex-direction: column;
    }
`;

const WrapperPhotoButton = styled.div`
    display: flex;
    gap: 15px;
    align-items: center;
    flex-direction: column;
`;

const WrapperPhoto = styled.div`
    position: relative;
`;

const StyledAvatar = styled(Avatar)`
    width: 200px;
    height: 200px;
    
    @media ${theme.media.small} {
        width: 100px;
        height: 100px;
    }
`;

const Label = styled.div`
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    background-color: ${theme.colors.accent};
    color: ${theme.colors.textLight};
    padding: 5px 10px;
    border-radius: 20px;
    font-weight: bold;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
`

export const S = {
  Wrapper, WrapperPhotoButton, WrapperPhoto, StyledAvatar, Label
};