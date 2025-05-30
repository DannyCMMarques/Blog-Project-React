import React from "react";
import style from "./style.module.css";
import {
    FaInstagram,
    FaTwitter,
    FaFacebook,
    FaPinterest,
} from "react-icons/fa";

const Footer = () => {
    return (
        <footer className={style.footer}>
            <div className={style.footerBrand}>
                <div className={style.logo}>
                    <div className={style.brand}>
                        <span>Perfect</span>
                        <span className={style.highlight}>Recipe</span>
                        <p className={style.descricao}>
                            The purpose of lorem ipsum is to create a natural looking block of
                            text (sentence, paragraph, page, etc.) that doesn't distract from
                            the layout.
                        </p>
                    </div>
                </div>
                <div className={style.redes_sociais}>
                    <a href="#" aria-label="Instagram" className={style.icon}>
                        <FaInstagram />
                    </a>
                    <a href="#" aria-label="Twitter" className={style.icon}>
                        <FaTwitter />
                    </a>
                    <a href="#" aria-label="Facebook" className={style.icon}>
                        <FaFacebook />
                    </a>
                    <a href="#" aria-label="Pinterest" className={style.icon}>
                        <FaPinterest />
                    </a>
                </div>
            </div>
            <div className={style.rights}>
                © 2025 PerfectRecipe. All Rights Reserved.
            </div>
        </footer>
    );
};
export default Footer;
