import "../Navbar/Navbar.css"
import Navlinkbutton from "../NavlinkButton/NavlinkButton"
import NavButton from "../ButtonGeneral/ButtonGeneral"
import { useNavigate } from "react-router-dom"
import logo from "../../../assets/icons/logo.svg"

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    return (
    <div className="all-navbar">
        <div className="navbar-left-side">
            <img src={logo} onClick={() => navigate("/")} className="logo-icon"/>
            <Navlinkbutton name={"ShareSpace"} navigate="/ShareSpace" /> 
            <Navlinkbutton name={"Tips"} navigate="/" /> 
        </div>
        <div className="navbar-right-side">
            <NavButton name = "LogIn" onClick={() => navigate("/LogIn")} class="log-in" />
            <NavButton name = "SignUp" onClick={() => navigate("/SignUp")} id="sign-up" />
        </div>
    </div>
    )
}

export default Navbar
