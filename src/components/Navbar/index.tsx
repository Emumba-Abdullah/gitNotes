import { useState } from "react";
import "./styles.css";
import Elogo from "./../../assets/logo.png";
import searchIcon from "./../../assets/search.png";
import { signInWithGithub } from "../../utils/firebaseUtils";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { login, logout } from "../../Store/authUser/authSlice";
import { auth } from "./../../../firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

export default function NavBar({setSearchText}) {
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm({
    shouldUseNativeValidation: true,
  });
  const onSubmit = async (data) => {
    setSearchText(data.searchText);
    console.log(data);
  };

  const menuItems = [
    `${user?.displayName.slice(0,14)}`,
    "Your gists",
    "Add a gist",
    "Your GitHub profile",
    "Help",
    "Logout",
  ];

  const handleClick = (item: string) => {
    switch (item) {
      case "Logout":
        handleLogoutClick();
        break;
      case "Your gists":
        handleYourGistsClick();
        break;
      case "Add a gist":
        handleAddGistClick();
        break;
      case "Your GitHub profile":
        handleNavigateToGitProfile();
        break;
      case "Help":
        handleHelpClick();
        break;
      default:
        console.log("Not Clicked");
    }
  };

  const handleLogoutClick = () => {
    try {
      auth.signOut();
      dispatch(logout());
      console.log(isAuthenticated);
      toast.success("logged Out Successfully !");
    } catch (err) {
      toast.error("Error while logging out!");
    }
  };

  const handleYourGistsClick = () => {
    navigate("/mygists");
  };

  const handleAddGistClick = () => {
    navigate("/addgist");
  };

  const handleNavigateToGitProfile = () => {};

  const handleHelpClick = () => {};

  const handleHomePageNavigation = () => {
    navigate("/");
  };

  const handleLogin = async () => {
    console.log(isAuthenticated);
    try {
      const user = await signInWithGithub();
      dispatch(
        login({
          displayName: user.displayName,
          accessToken: user.accessToken,
          uid: user.uid,
          email: user.email,
          photoURL: user.photoURL,
        }),
      );
      toast.success("logged In Successfully !");
    } catch (error) {
      toast.error("error while LogIn, please try again!");
    }
  };

  return (
    <nav id="navbar">
      <div className="item">
        <img src={Elogo} alt="" id="logo" onClick={handleHomePageNavigation} />
        <h1 onClick={handleHomePageNavigation}>EMUMBA</h1>
      </div>
      <div className="item">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("searchText", {
              required: "You need to add something!",
            })}
            type="search"
            placeholder="Search Gists..."
          />
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
            {user && (
              <button id="menu-btn">
                <img src={user.photoURL} alt="user profile" id="menu-img" />
              </button>
            )}

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
