import { useEffect } from "react";
import useAxios from "../hooks/useAxios";
import { useAuth } from "../hooks/useAuth";
import useProfile from "../hooks/useProfile";
import { actions } from "../actions";
import ProfileInfo from "../components/profile/ProfileInfo";
import MyPosts from "../components/profile/MyPosts";

const Profile = () => {
    const { state, dispatch } = useProfile();

    const { api } = useAxios();
    const { auth } = useAuth();

    useEffect(() => {
        // setLoading(true);
        dispatch({ type: actions.profile.DATA_FETCHING })
        const fetchProfile = async () => {
            try {
                const res = await api.get(`${import.meta.env.VITE_SERVER_BASE_URL}/profile/${auth?.user?.id}`);

                if (res.status === 200) {
                    dispatch({ type: actions.profile.DATA_FETCHED, data: res.data })
                }
                // setUser(res?.data.user);
                // setPosts(res?.data.posts);
            } catch (error) {
                // setError(error);
                dispatch({ type: actions.profile.DATA_FETCH_ERROR, error: error.message })
            }
        }
        fetchProfile();
    }, []);

    if (state?.loading) {
        return <p>Fetching your profile data...</p>
    }

    return (
        <>
            <ProfileInfo />
            <MyPosts />
        </>
    );
};

export default Profile;