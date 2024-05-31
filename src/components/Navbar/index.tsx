import { useState } from "react";
import "./styles.css";
import Elogo from "./../../assets/logo.png";
import searchIcon from "./../../assets/search.png";
import { signInWithGithub } from "../../utils/firebaseUtils";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { login,logout } from "../../Store/authUser/authSlice";
import { auth } from './../../../firebase';
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const dispatch = useAppDispatch();
  const { isAuthenticated,user } = useAppSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    "Signed in as",
    "Your gists",
    "Starred gists",
    "Your GitHub profile",
    "Help",
    "Logout",
  ];

  const handleClick = (item:string) => {
    switch (item) {
      case 'Logout':
        handleLogoutClick();
        break;
      case 'Your gists':
        handleYourGistsClick();
        break;
       case 'Starred gists':
        handleStarredGistsClick();
        break;
       case 'Your GitHub profile':
        handleNavigateToGitProfile();
        break;
       case 'Help':
        handleHelpClick ();
        break;
      default:
        console.log("Not Clicked");
    }
  };

  const handleLogoutClick = () => {
    try {
      auth.signOut(); 
      dispatch(logout());
      console.log(isAuthenticated)
    }
    catch (err) {
      console.log(err);
    }
  }

  const handleYourGistsClick = () => {
    navigate("/mygists");
  }

  const handleStarredGistsClick = () => {
    navigate("/starredgists");
  }

  const handleNavigateToGitProfile = () => {
  
  }

  const handleHelpClick = () => {
    
  }


  const handleLogin = async () => {
    console.log(isAuthenticated);
    const user = await signInWithGithub();
    dispatch(
      login({
        displayName: user.displayName,
        accessToken: user.accessToken,
        uid: user.uid,
        email: user.email,
        photoURL: user.photoURL,
      })
    );
    console.log(isAuthenticated);
  };

  return (
    <nav id="navbar">
      <div className="item">
        <img src={Elogo} alt="" id="logo" />
        <h1>EMUMBA</h1>
      </div>
      <div className="item">
        <form>
          <input type="search" placeholder="Search Gists..." />
          <button type="submit">
            <img src={searchIcon} alt="" id="searchIcon" />
          </button>
        </form>

        {isAuthenticated ? (
          <div
            className="menu-container"
            onMouseEnter={() => setIsMenuOpen(true)}
            onMouseLeave={() => setIsMenuOpen(false)}
          >
            {user&&
               <button id="menu-btn">
              <img
                src={user.photoURL}
                alt="user profile"
                id="menu-img"
              />
            </button>
            }
           
            {isMenuOpen && (
              <ul className="menu">
                {menuItems.map((item) => (
                  <li key={item}>
                    <button
                      className="menu-item"
                      onClick={() => handleClick(item)}
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : (
          <button id="signInBtn" onClick={handleLogin}>
            Login
          </button>
        )}
      </div>
    </nav>
  );
}
