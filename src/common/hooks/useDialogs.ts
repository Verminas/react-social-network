import { useSelector } from "react-redux";
import {
  dialogsActions,
  selectDialogs,
  selectDialogsStatus,
} from "features/SocialNetwork/model/dialogsSlice";
import { useAppDispatch } from "app/store";
import { useEffect } from "react";

export const useDialogs = () => {
  const dialogs = useSelector(selectDialogs);
  const status = useSelector(selectDialogsStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(dialogsActions.fetchDialogs());
  }, []);

  return { dialogs, status };
};
