import useProfile from "../../hooks/useProfile";
import EditIcon from '../../assets/icons/edit.svg'
import { useState } from "react";
import useAxios from "../../hooks/useAxios";
import { actions } from "../../actions";

const Bio = () => {
    const { state, dispatch } = useProfile();
    const { api } = useAxios();

    const [bio, setBio] = useState(state?.user?.bio);
    const [editMode, setEditMode] = useState(false);

    const handleBioEdit = async () => {
        dispatch({ type: actions.profile.DATA_FETCHING })

        try {
            const response = await api.patch(`${import.meta.env.VITE_SERVER_BASE_URL}/profile/${state?.user?.id}`, { bio });
            if (response.status === 200) {
                dispatch({ type: actions.profile.USER_DATA_EDITED, data: response.data })
            }
            setEditMode(false);
        }
        catch (error) {
            dispatch({ type: actions.profile.USER_DATA_EDITED, error: error.message })
        }
    }

    return (
        <>
            <div className="mt-4 flex items-start gap-2 lg:mt-6">
                <div className="flex-1">
                    {
                        !editMode ?
                            <p className="leading-[188%] text-gray-400 lg:text-lg">
                                {state?.user?.bio}
                            </p> :
                            <textarea
                                value={bio}
                                rows={4}
                                cols={55}
                                onChange={(e) => setBio(e.target.value)}
                            />
                    }
                </div>
                {
                    !editMode ?
                        <button
                            className="flex-center h-7 w-7 rounded-full"
                            onClick={() => setEditMode(true)}
                        >
                            <img src={EditIcon} alt="Edit" />
                        </button> :
                        <button
                            onClick={handleBioEdit}
                            className="flex-center h-7 w-7 rounded-full">
                            <p>✔️</p>
                        </button>
                }
            </div>
        </>
    );
};

export default Bio;