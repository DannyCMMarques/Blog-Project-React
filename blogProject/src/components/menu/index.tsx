import React from "react";
import menuContentItens from "./../../utils/content/menuContentItens";
import style from './style.module.css'

type MenuProps = {
    getNavLinkStyle: (path: string) => React.CSSProperties;
};

const Menu = ({getNavLinkStyle}: MenuProps) => {
    return (
        <nav className={style.nav}>
            <ul className={style.navbar}>
                {menuContentItens.map((content) => (
                    <li key={content.id}>
                        <a style={getNavLinkStyle(content.href)} href={content.href}>
                            {content.title}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Menu;
