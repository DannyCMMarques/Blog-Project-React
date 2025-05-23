import React, { type JSX } from "react";
import menuContentItens from "./../../utils/content/menuContentItens";
import style from './style.module.css'
import { Link } from "react-router-dom";

type MenuProps = {
    getNavLinkStyle: (path: string) => React.CSSProperties;
};

const Menu = ({getNavLinkStyle}: MenuProps):JSX.Element => {
    return (
        <nav className={style.nav}>
            <ul className={style.navbar}>
                {menuContentItens.map((content) => (
                    <li key={content.id}>
                        <Link style={getNavLinkStyle(content.href)} to={content.href}>
                            {content.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Menu;
