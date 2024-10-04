import { useSelector } from "react-redux";
import { dialogsActions, selectDialogs } from "app/reducers/dialogsSlice";
import { useAppDispatch } from "app/store";
import { useEffect } from "react";

export const useDialogs = () => {
  const dialogs = useSelector(selectDialogs);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(dialogsActions.fetchDialogs());
  }, []);

  return { dialogs };
};
