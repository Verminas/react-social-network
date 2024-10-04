// @flow
import * as React from "react";
import { ChangeEvent, useRef, useState } from "react";
import { notification } from "antd";
import { useSelector } from "react-redux";
import {
  currentUserActions,
  selectCurrentUser,
} from "app/reducers/currentUserSlice";
import { useAppDispatch } from "app/store";
import { Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

type Props = {};
export const UploadFile = (props: Props) => {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0];

      if (!file.type.startsWith("image/")) {
        notification.warning({ message: "The file should be an image." });
        return;
      }
      if (file.size >= 4000000) {
        notification.warning({ message: "The file should be up to 4 MB." });
        return;
      }

      postAvatar(file);
    }
  };

  const postAvatar = (file: File) => {
    const formData = new FormData();
    formData.append("myFile", file);
    const arg = { formData, id: currentUser.userId };
    setIsLoading(true);
    dispatch(currentUserActions.updateCurrentUserPhoto(arg))
      .unwrap()
      .then(() => setIsLoading(false));
  };

  return (
    <label>
      <input
        type="file"
        style={{ display: "none" }}
        onChange={uploadHandler}
        ref={inputRef}
      />
      <Button
        type="primary"
        icon={<UploadOutlined />}
        iconPosition={"end"}
        onClick={() => {
          inputRef.current?.click();
        }}
        loading={isLoading}
      >
        Update Photo
      </Button>
    </label>
  );
};
