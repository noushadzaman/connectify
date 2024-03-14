import useProfile from "./useProfile";

const useAvatar = (post) => {
  const { state } = useProfile();
  
  const ismE = post?.author?.id === state?.user?.id;

  const avatar = ismE ? `${state?.user?.avatar}` : `${post?.author?.avatar}`;

  const avatarURL = `${import.meta.env.VITE_SERVER_BASE_URL}/${avatar}`;

  return { avatarURL };
};

export default useAvatar;