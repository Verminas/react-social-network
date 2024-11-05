import { useSelector } from "react-redux";
import { currentUserActions, selectCurrentUser } from "../../features/SocialNetwork/model/currentUserSlice";
import { useAppDispatch } from "../../app/store";
import { ChangeEvent, useRef, useState } from "react";
import { notification } from "antd";

export const useUploadFile = () => {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const safeImageTypes = ['image/jpg', 'image/jpeg', 'image/png']

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0];

      console.log(file.type)

      if (!safeImageTypes.includes(file.type)) {
        notification.warning({ message: "File should has .jpg, .jpeg or .png extension" });
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
      .finally(() => setIsLoading(false))
      .catch((err) => notification.error(err.messages[0] || 'Error with image'))
  };

  const onUploadBtn = () => {
    inputRef.current?.click()
  }

  return {uploadHandler, inputRef, onUploadBtn, isLoading}
}