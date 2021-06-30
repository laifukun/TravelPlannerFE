import '../styles/Header.css'
import RouteDrawer from '../AfterLogin/RouteDrawer';

function Header(props) {
    return (
        <header className="header" style={{display: "flex", justifyContent: "space-between"}}>
            <p className="title">
              Travel Planner
            </p>
        </header>
    )
}

export default Header

