import { useContext } from 'react';
import { AuthContext } from '../App';

const Home = () => {
    const { currentUser } = useContext(AuthContext);
    console.log("Current :", currentUser)
    return (
        <div>
            <center>
                <h1>Hi :{currentUser[0]?.username}</h1>
                <h2>Email : {currentUser[0]?.email}</h2>
            </center>
        </div>
    );
};

export default Home;