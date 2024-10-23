// @flow
import * as React from "react";
import styled from "styled-components";

type Props = {
  label: string;
  item: string | React.ReactNode;
};

export const InfoItem = ({ item, label }: Props) => {
  return (
    <>
      {label ? (
        <Label>
          {label}: <Text>{item}</Text>
        </Label>
      ) : (
        ""
      )}
    </>
  );
};

const Label = styled.p`
  color: rgba(0, 0, 0, 0.6);
  line-height: 1.5;
  font-size: 18px;
`;

const Text = styled.span`
  color: black;
  line-height: 1.5;
  font-size: 18px;
`;
