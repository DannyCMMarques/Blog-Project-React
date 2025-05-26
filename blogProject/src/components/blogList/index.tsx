import { type JSX } from "react";
import style from "./style.module.css";
import ButtonComponent from "../buttons";
import { useNavigate } from "react-router-dom";

type BlogCardProps = {
    date: string;
    title: string;
    author: string;
    content: string;
    imageUrl: string;
    id: number;
};

const BlogList = ({
    date,
    title,
    author,
    content,
    imageUrl,
    id,
}: BlogCardProps): JSX.Element => {
    const navigate = useNavigate();
    const formatarResumo = (texto: string): string => {
        const limite = 180;
        return texto.slice(0, limite) + "...";
    };
    const handleOnClick = (id: number) => {
        navigate(`/blog/${id}`);
    };
    return (
        <div className={style.blogCard}>
            <div className={style.blogContent}>
                <p className={style.blogDate}>{date}</p>
                <h2 className={style.blogTitle}>{title}</h2>
                <p className={style.blogAuthor}>Por {author}</p>
                <p className={style.blogExcerpt}>{formatarResumo(content)}</p>
                <ButtonComponent
                    handleOnClick={() => handleOnClick(id)}
                    backgroundColor="var(--pink)"
                    colorText="#fff"
                    text="Leia Mais →"
                />
            </div>
            <div
                className={style.imageContainer}
                style={{ backgroundImage: `url(${imageUrl})` }}
            ></div>
        </div>
    );
};

export default BlogList;
