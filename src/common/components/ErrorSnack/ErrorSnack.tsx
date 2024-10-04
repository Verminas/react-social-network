import { notification } from "antd";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { appActions, selectAppError } from "app/appSlice";
import { useAppDispatch } from "app/store";

export const ErrorSnack = () => {
  const [api, contextHolder] = notification.useNotification();
  const error = useSelector(selectAppError);
  const dispatch = useAppDispatch();

  const openNotification = () => {
    if (error) {
      notification.error({
        message: error,
        showProgress: true,
        pauseOnHover: true,
      });
    }
  };

  useEffect(() => {
    let timerId: NodeJS.Timer;
    if (error) {
      openNotification();

      timerId = setTimeout(() => {
        dispatch(appActions.setAppError({ error: null }));
      }, 5000);

      return () => clearTimeout(timerId);
    }
  }, [openNotification]);

  return <>{contextHolder}</>;
};
