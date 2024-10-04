// @flow
import * as React from "react";
import { noInformation } from "features/SocialNetwork/ui/Layout/Profile/Content/Info/Info";

type Props = {
  title: string;
  href: string | null | undefined;
};
export const ContactItem = ({ href, title }: Props) => {
  return (
    <li style={{ textTransform: "capitalize" }}>
      {title}:{" "}
      {href ? (
        <a href={href} target={"_blank"} style={{ textTransform: "lowercase" }}>
          {href}
        </a>
      ) : (
        noInformation
      )}
    </li>
  );
};
