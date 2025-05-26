import { type JSX } from "react";
import style from "./style.module.css";
import ButtonComponent from "../buttons";
import { useNavigate } from "react-router-dom";

type BlogCardProps = {
    data: string;
    titulo: string;
    autor: string;
    conteudo: string;
    imageUrl: string;
    id: number;
};

const BlogList = ({
    data,
    titulo,
    autor,
    conteudo,
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
        <div className={style.card}>
            <div className={style.container}>
                <p className={style.data}>{data}</p>
                <h2 className={style.titulo}>{titulo}</h2>
                <p className={style.autor}>Por {autor}</p>
                <p className={style.conteudo}>{formatarResumo(conteudo)}</p>
                <ButtonComponent
                    handleOnClick={() => handleOnClick(id)}
                    backgroundColor="var(--pink)"
                    colorText="#fff"
                    text="Leia Mais →"
                />
            </div>
            <div
                className={style.imagemContainer}
                style={{ backgroundImage: `url(${imageUrl})` }}
            ></div>
        </div>
    );
};

export default BlogList;
