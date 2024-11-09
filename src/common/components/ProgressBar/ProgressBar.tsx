import { useSelector } from "react-redux";
import { selectAppStatus } from "../../../app/appSlice";
import { theme } from "common/styles/theme";
import {S} from "./ProgressBar.styles"


export const ProgressBar = () => {
  const status = useSelector(selectAppStatus);
  return (
    <>
      {status === "loading" ? (
        <S.ProgressBar
          percent={100}
          showInfo={false}
          strokeLinecap={"square"}
          size={"small"}
          status="active"
          strokeColor={theme.colors.accentLight}
        />
      ): ''}
    </>
  );
};