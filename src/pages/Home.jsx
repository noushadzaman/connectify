import { useAuth } from "../hooks/useAuth";

const Home = () => {
    const { auth } = useAuth();
    console.log(auth)

    return (
        <div>
        </div>
    );
};

export default Home;