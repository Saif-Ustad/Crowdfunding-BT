import "./SideNavbar.scss";



import { RxDashboard } from "react-icons/rx";
import { TbSpeakerphone } from "react-icons/tb";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { FcMoneyTransfer } from "react-icons/fc";
import { FaUserCircle } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { logout } from "../../../Action/AuthActions";

const SideNavbar = () => {

  const Navigate = useNavigate();
  const dispatch = useDispatch();

    
    const handleLogout = (e) => {
        dispatch(logout());
        Navigate("/auth/login");
    }

    
  return (
    <div className="sideNavbar_section">
        <div className="up">
            <div className="item ">
                <div className="item_icon active">
                    <RxDashboard />
                </div>
                <span onClick={()=> Navigate("/")}>Home</span>
            </div>
            <div className="item ">
                <div className="item_icon">
                    <TbSpeakerphone />
                </div>
                <span>Announcement</span>
            </div>
            <div className="item">
                <div className="item_icon">
                    <FaMoneyCheckAlt />
                </div>
                <span>Payment</span>
            </div>
            <div className="item">
                <div className="item_icon">
                    <FcMoneyTransfer />
                </div>
                <span>Withdraw</span>
            </div>
            <div className="item">
                <div className="item_icon">
                    <FaUserCircle />
                </div>
                <span onClick={()=> Navigate("/profile")}>Profile</span>
            </div>
            <div className="item">
                <div className="item_icon">
                    <MdLogout />
                </div>
                <span onClick={handleLogout}>Logout</span>
            </div>
        </div>

        <div className="down">
            <div className="item" >
                <div className="item_icon">
                    <MdLightMode />
                </div>
                <span>Theme</span>
            </div>
        </div>
      
    </div>
  )
}

export default SideNavbar
