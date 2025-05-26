import { useEffect, useState, type JSX } from "react";
import { MdClose } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import logo from "./../../assets/logo.png";
import style from "./style.module.css";
import Menu from "../menu";
import { useLocation } from 'react-router-dom';
import type { WindowSizeProps } from "../typesComponent";
const Navbar = (): JSX.Element => {

    const location = useLocation();
    const activePath = location.pathname;
    const [menuOpen, setMenuOpen] = useState(false);

    const [windowSize, setWindowSize] = useState<WindowSizeProps>({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const getNavLinkStyle = (path: string): React.CSSProperties => {
        return activePath === path ? { fontWeight: 800, color: "#c96b5f" } : {};
    };
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <>
            <header className={style.header}>
                <div className={style.logo}>
                    <img src={logo} alt="logo" />
                    <div className={style.brand}>
                        <span>Perfect</span>
                        <span className={style.highlight}>Recipe</span>
                    </div>
                </div>
                {windowSize.width >= 768 ? (
                    <Menu getNavLinkStyle={getNavLinkStyle} />
                ) : (
                    <div>
                        <div onClick={toggleMenu}>
                            {menuOpen ? (
                                <MdClose style={{ marginTop: "100px" }} size={35} />
                            ) : (
                                <RxHamburgerMenu size={35} />
                            )}
                        </div>
                        {menuOpen && <Menu getNavLinkStyle={getNavLinkStyle} />}
                    </div>
                )}
            </header>
        </>
    );
};

export default Navbar;
