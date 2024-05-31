import "./styles.css"
import Elogo from "./../../assets/logo.png"
import searchIcon from "./../../assets/search.png"
import { signInWithGithub } from "../../utils/firebaseUtils"
import { useAppDispatch,useAppSelector} from "../../Store/hooks"
import { login } from "../../Store/authUser/authSlice"
import { IUser } from "../../types/types"


export default function NavBar() {
    const dispatch = useAppDispatch();
    const { isAuthenticated } = useAppSelector((state) => state.auth);

    const handleLogin = async () => {
        console.log(isAuthenticated)
        const user:IUser = await signInWithGithub();
        dispatch(login({displayName: user.displayName,accessToke:user.accessToke,uid:user.uid,email:user.email,photoURL:user.accessToke}));
        console.log(isAuthenticated)
    }

    return (
        <nav id="navbar">
            <div className="item">
                <img src={Elogo} alt=""  id="logo"/>
                <h1>EMUMBA</h1>
            </div>
            <div className="item">
                <form>
                <input type="search" placeholder="Search Gists..."/>
                <button type="submit"><img src={searchIcon} alt="" id="searchIcon"/></button>
                </form>

                {
                    isAuthenticated ?
                    <button id="menu-btn">
                    <img src="https://avatars.githubusercontent.com/u/169022063?v=4" alt="user" id="menu-img" />
                        </button> :
                         <button id="signInBtn" onClick={handleLogin}>
                    Login
                </button>
                }
            </div>
        </nav>
    )
}
