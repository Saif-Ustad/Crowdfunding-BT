import "./Navbar.scss";
import Left_Logo from "../../../Assets/Icons/logo.svg";
import Right_Logo from "../../../Assets/Icons/etherium_logo.svg";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const Navbar = () => {

  const Navigate = useNavigate();

  return (
      <div className="navbar-section">
        <div className="left">
          <div className="left_logo_background">
            <img src={Left_Logo} alt="left_logo" />
          </div>
        </div>

        <div className="middle">
          <div className="Search_bar">
            <input placeholder="Search for Campaigns" />
            <span><FaSearch /></span>
          </div>
          <div className="create_btn">
            <button onClick={()=>Navigate("/create")}>Create a Campaign</button>
          </div>
        </div>

        <div className="right">
          <div className="right_logo_background">
            <img src={Right_Logo} alt="right_logo" />
          </div>
        </div>
      </div>
  )
}

export default Navbar
