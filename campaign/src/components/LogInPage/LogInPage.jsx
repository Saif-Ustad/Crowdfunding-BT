import "./LogInPage.scss";

import Navbar from "../HomePage/Navbar/Navbar";
import SideNavbar from "../HomePage/SideNavbar/SideNavbar";


import LoginImg from "../../Assets/Images/auth_img.png";
import AuthLogo from "../../Assets/Images/auth_logo.png";
import MetaMask_Icon from "../../Assets/Icons/metamask_icon.png";

import { BiSolidUserCircle } from "react-icons/bi";
import { FaUnlockAlt } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

import {useDispatch} from "react-redux";
import { signIn } from "../../Action/AuthActions";

const LogInPage = () => {

  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const [data, setData] = useState({ email: "", password: "" })

  const handlechange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    dispatch(signIn(data));
  }

  return (
    <div className="LogInPage">
      <div className="container">
        <Navbar />
        <div className="hero">
          <SideNavbar />
          <div className="login_section">
            <div className="auth_img">
              <img src={LoginImg} alt="login_img" />
              <div className="login_and_signup_btn">
                <h4 className="active">Login</h4>
                <h4 onClick={() => Navigate("/auth/signup")}>Sign up</h4>
              </div>
            </div>
            <div className="login_details">
              <div className="auth_logo">
                <img src={AuthLogo} alt="auth_logo" />
              </div>
              <h2>Login</h2>

              <form onSubmit={handleSubmit}>
                <div className="input_field">
                  <div className="icon_and_input">
                    <BiSolidUserCircle />
                    <input 
                      type="email" 
                      placeholder="Email" 
                      name="email" 
                      onChange={handlechange}

                    />
                  </div>
                  <hr />
                </div>

                <div className="input_field">
                  <div className="icon_and_input">
                    <FaUnlockAlt />
                    <input 
                      type="password" 
                      placeholder="Password" 
                      name="password" 
                      onChange={handlechange}

                    />
                  </div>
                  <hr />
                </div>

                <div className="forgot_and_login_btn">
                  <p>Forgot Password?</p>
                  <button type="submit">Login</button>
                </div>
              </form>

              <h3>Or Login With</h3>

              <div className="login_option">
                <div className="google_login">
                  <FcGoogle />
                  <p>Google</p>
                </div>
                <div className="metamask_login">
                  <img src={MetaMask_Icon} alt="metmask_icon" />
                  <p>Connect to MetaMask</p>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  )
}

export default LogInPage
