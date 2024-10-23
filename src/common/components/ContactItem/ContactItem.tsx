// @flow
import * as React from "react";
import { noInformation } from "features/SocialNetwork/ui/Layout/Profile/Content/Info/Info";
import styled from "styled-components";

type Props = {
  title: string;
  href: string | null | undefined;
};
export const ContactItem = ({ href, title }: Props) => {
  return (
    <Label style={{ textTransform: "capitalize" }}>
      {title}:{" "}
      {href ? (
        <Link
          href={href}
          target={"_blank"}
          style={{ textTransform: "lowercase" }}
        >
          {href}
        </Link>
      ) : (
        noInformation
      )}
    </Label>
  );
};

const Label = styled.span`
  display: block;
  color: rgba(0, 0, 0, 0.6);
  line-height: 1.5;
  font-size: 18px;
`;

const Link = styled.a`
  color: black;
  line-height: 1.5;
  font-size: 18px;
`;
