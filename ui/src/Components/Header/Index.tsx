import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Search from "../Sidebar/Search"; // Reusing existing Search component logic
import "./Index.scss";

// Simple logo component (Text for now)
const Logo = () => (
    <div className="logo">
        <Link to="/">DIM</Link>
    </div>
);

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={`header ${isScrolled ? "scrolled" : ""}`}>
            <div className="left">
                <Logo />
                <ul className="links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/search?type=series">TV Shows</Link></li>
                    <li><Link to="/search?type=movie">Movies</Link></li>
                    <li><Link to="/search?type=new">New & Popular</Link></li>
                    <li><Link to="/library/1">My List</Link></li>
                </ul>
            </div>
            <div className="right">
                <Search />
                {/* Profile/Notification icons would go here */}
            </div>
        </header>
    );
};

export default Header;
