import { ReactNode } from "react";
import {S} from "./InfoItem.styles"

type Props = {
  label: string;
  item: string | ReactNode;
};

export const InfoItem = ({ item, label }: Props) => {
  return (
    <>
      {label ? (
        <S.Label>
          {label}: <S.Text>{item}</S.Text>
        </S.Label>
      ) : (
        ""
      )}
    </>
  );
};