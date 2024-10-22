import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "features/SocialNetwork/model/currentUserSlice";
import {
  selectUser,
  usersActions,
} from "features/SocialNetwork/model/usersSlice";
import { useAppDispatch } from "app/store";
import { useEffect } from "react";

export const useUserProfile = () => {
  const params = useParams<{ userId: string }>();
  const currentUser = useSelector(selectCurrentUser);
  const viewedUser = useSelector(selectUser);
  const dispatch = useAppDispatch();
  const isAuthUser = Number(params.userId) === currentUser.userId;
  const user = isAuthUser ? currentUser : viewedUser;

  useEffect(() => {
    const userId = Number(params.userId);
    if (userId !== currentUser.userId && !isNaN(userId)) {
      dispatch(usersActions.getUserProfile(userId));
    }

    return () => {
      dispatch(usersActions.clearUserData());
    };
  }, [params]);

  return { user, isAuthUser };
};
