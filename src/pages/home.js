import { useContext } from 'react';
import { AuthContext } from '../App';
import { useHistory } from "react-router-dom";
import '../signupForm.css'

const Home = () => {
    const { currentUser } = useContext(AuthContext);
    const history = useHistory();
    return (
        <div>
            <center>
                <h1>Hi :{currentUser[0]?.username}</h1>
                <h2>Email : {currentUser[0]?.email}</h2>
                <button className="sigupbut" onClick={() => history.push("/")}>Logout</button>
            </center>
        </div>
    );
};

export default Home;