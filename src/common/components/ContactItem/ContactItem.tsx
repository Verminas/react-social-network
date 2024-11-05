import {S} from "./ContactItem.styles"
import {NO_INFORMATION} from "common/constants/common";

type Props = {
  title: string;
  href: string | null | undefined;
};
export const ContactItem = ({ href, title }: Props) => {
  return (
    <S.Label>
      {title}:{" "}
      {href ? (
        <S.Link
          href={href}
          target={"_blank"}
        >
          {href}
        </S.Link>
      ) : (
          NO_INFORMATION
      )}
    </S.Label>
  );
};
