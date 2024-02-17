import "./SignUpPage.scss";

import Navbar from "../HomePage/Navbar/Navbar";
import SideNavbar from "../HomePage/SideNavbar/SideNavbar";

import LoginImg from "../../Assets/Images/auth_img.png";
import AuthLogo from "../../Assets/Images/auth_logo.png";

import { BiSolidUserCircle } from "react-icons/bi";
import { FaUnlockAlt } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { BsFillEmojiSmileFill } from "react-icons/bs";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

import {useDispatch} from "react-redux";
import { signUp } from "../../Action/AuthActions";

const SignUpPage = () => {

  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const [data, setData] = useState({ firstname: "", lastname: "", email: "", password: "", confirmpassword: "" })

  const handlechange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    data.password === data.confirmpassword ? dispatch(signUp(data)) : console.log("both password fields should match");
  }

  return (
    <div className="SignUpPage">
      <div className="container">
        <Navbar />
        <div className="hero">
          <SideNavbar />
          <div className="signUp_section">
            <div className="auth_img">
              <img src={LoginImg} alt="signup_img" />
              <div className="login_and_signup_btn">
                <h4 onClick={() => Navigate("/auth/login")}>Login</h4>
                <h4 className="active">Sign up</h4>
              </div>
            </div>
            <div className="signUp_details">
              <div className="auth_logo">
                <img src={AuthLogo} alt="auth_logo" />
              </div>
              <h2>Sign Up</h2>

              <form onSubmit={handleSubmit}>
                <div className="name_field">
                  <div className="input_field">
                    <div className="icon_and_input">
                      <BsFillEmojiSmileFill />
                      <input 
                        type="text" 
                        placeholder="First Name" 
                        name="firstname" 
                        onChange={handlechange}  
                        style={{ "text-transform": "capitalize" }}

                      />
                    </div>
                    <hr />
                  </div>
                  <div className="input_field">
                    <div className="icon_and_input">
                      <BsFillEmojiSmileFill />
                      <input 
                        type="text" 
                        placeholder="Last Name" 
                        name="lastname" 
                        onChange={handlechange}  
                        style={{ "text-transform": "capitalize" }} 

                      />
                    </div>
                    <hr />
                  </div>
                </div>

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
                      placeholder="Set Password" 
                      name="password" 
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
                      placeholder="Confirm Password" 
                      name="confirmpassword" 
                      onChange={handlechange} 

                    />
                  </div>
                  <hr />
                </div>

                <div className="google_and_signUp_btn">
                  <div className="google_SignUp">
                    <FcGoogle />
                    <p>Google</p>
                  </div>
                  <button type="submit">Sign Up</button>
                </div>
              </form>

            </div>

          </div>

        </div>

      </div>
    </div>
  )
}

export default SignUpPage
