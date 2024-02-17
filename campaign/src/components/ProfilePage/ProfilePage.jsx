import "./ProfilePage.scss";

import Navbar from "../HomePage/Navbar/Navbar"
import SideNavbar from "../HomePage/SideNavbar/SideNavbar"

import profile_dumy from "../../Assets/Icons/profile_dumy.svg";
import { useDispatch, useSelector } from "react-redux";
import { getAllCreatedProjects, getAllDonatedProjects } from "../../Action/UserAction";
import { useEffect, useState } from "react";


const ProfilePage = () => {

    const dispatch = useDispatch();

    const userEmail = useSelector((state) => state.authReducer.authData.email)
    const firstName = useSelector((state) => state.authReducer.authData.firstname)
    const lastName = useSelector((state) => state.authReducer.authData.lastname)

    const donatedProjects = useSelector((state) => state.userReducer.donatedProjects)
    const createdProjects = useSelector((state) => state.userReducer.createdProjects)


    useEffect(() => {
        dispatch(getAllCreatedProjects(userEmail));
        dispatch(getAllDonatedProjects(userEmail));
        getAccount();
    }, [userEmail, dispatch]);


    const [account, setAccount ] = useState();

    const getAccount = async () => {
        try {
            if (window.ethereum) {
                const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                setAccount(accounts[0])
            } else {
                console.error('MetaMask not detected');
            }
        } catch (error) {
            console.error('Error getting account', error);
        }
    };
    

    
    



    return (
        <div className="ProfilePage">
            <div className="container">
                <Navbar />
                <div className="hero">
                    <SideNavbar />
                    <div className="profile_section">
                        <div className="profile_img">
                            <div className="profile_image_circle">
                                <img src={profile_dumy} alt="profile_img" />
                            </div>
                            <p>{firstName.charAt(0).toUpperCase() + firstName.slice(1) } {lastName.charAt(0).toUpperCase() + lastName.slice(1)}</p>
                        </div>
                        <div className="profile_projects_detail">
                            <div className="left">
                                <h3>Total Project Backed</h3>
                                <p>{donatedProjects?.length}</p>
                                <div className="view_btn">
                                    <button>View Projects</button>
                                </div>
                            </div>
                            <div className="right">
                                <h3>Total Project Created</h3>
                                <p>{createdProjects?.length}</p>
                                <div className="view_btn">
                                    <button>View Projects</button>
                                </div>
                            </div>
                        </div>
                        <div className="profile_switch_account">
                            <div className="account_details">
                                <p>Account Address :-</p>
                                <spam>{account}</spam>
                            </div>
                            <div className="switch_btn">
                                <button onClick={getAccount} >Switch Account</button>
                            </div>
                        </div>


                    </div>

                </div>

            </div>
        </div>
    )
}

export default ProfilePage
