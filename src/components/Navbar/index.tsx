import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signInWithGithub } from "../../utils/firebaseUtils";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { login, logout } from "../../Store/authUser/authSlice";
import { auth } from "../../../firebase";
import { INavbarFormData, INavProps } from "../../types/types";

import Elogo from "./../../assets/logo.png";
import searchIcon from "./../../assets/search.png";
import "./styles.css";

const menuItems = [
  "Your gists",
  "Add a gist",
  "Your GitHub profile",
  "Help",
  "Logout",
];

export default function NavBar({ setSearchText }: INavProps) {
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm({
    shouldUseNativeValidation: true,
  });

  const handleLogoutClick = () => {
    try {
      auth.signOut();
      dispatch(logout());
      toast.success("Logged Out Successfully !");
    } catch (err) {
      toast.error("Error while logging out!");
    }
  };

  const handleNavigation = (item: string) => {
    switch (item) {
      case "Logout":
        handleLogoutClick();
        break;
      case "Your gists":
        navigate("/mygists");
        break;
      case "Add a gist":
        navigate("/addgist");
        break;
      case "Your GitHub profile":
        
        break;
      case "Help":
        
        break;
      default:
        console.log("Not Clicked");
    }
  };

  const handleHomePageNavigation = () => {
    navigate("/");
  };

  const handleLogin = async () => {
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
      toast.success("Logged In Successfully !");
    } catch (error) {
      toast.error("Error while Log In, please try again!");
    }
  };

  const onSubmit = (data: INavbarFormData) => {
    setSearchText(data.searchText);
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
            id="menu-container"
            onMouseEnter={() => setIsMenuOpen(true)}
            onMouseLeave={() => setIsMenuOpen(false)}
          >
            {user && (
              <button id="menu-btn">
                <img src={user.photoURL} alt="user profile" id="menu-img" />
              </button>
            )}

            {isMenuOpen && (
              <ul id="menu">
                {menuItems.map((item) => (
                  <li key={item}>
                    <button
                      id="menu-item"
                      onClick={() => handleNavigation(item)}
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
