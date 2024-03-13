import LogOutIcon from "../../assets/icons/logout.svg"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const LogOut = () => {
    const navigate = useNavigate();
    const { setAuth } = useAuth();
    const handleLogout = () => {
        setAuth({})
        navigate('/login');
    }

    return (
        <button
            onClick={handleLogout}
            className="icon-btn"
        >
            <img src={LogOutIcon} alt="Logout" />
        </button>
    );
};

export default LogOut;