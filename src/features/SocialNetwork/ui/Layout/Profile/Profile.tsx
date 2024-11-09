import { createContext } from "react";
import { GetUserProfileResponseType } from "features/SocialNetwork/api/socialAPI";
import Spinner from "common/components/Spinner/Spinner";
import { Posts } from "features/SocialNetwork/ui/Layout/Profile/Posts/Posts";
import { Content } from "features/SocialNetwork/ui/Layout/Profile/Content/Content";
import { useUserProfile } from "features/SocialNetwork/lib/useUserProfile";

export const UserContext = createContext<{
  user: GetUserProfileResponseType | null;
  isAuthUser: boolean;
}>({ user: null, isAuthUser: false });

export const Profile = () => {
  const { user, isAuthUser } = useUserProfile();

  if (!user.userId) {
    return <Spinner />;
  }

  return (
    <UserContext.Provider value={{ user, isAuthUser }}>
      <section>
        <Content />
        <Posts />
      </section>
    </UserContext.Provider>
  );
};
