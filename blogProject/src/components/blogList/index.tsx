import { type JSX } from "react";
import style from "./style.module.css";
import ButtonComponent from "../buttons";
import { useNavigate } from "react-router-dom";
import type { Post } from "../../utils/mock/postInterface";

const BlogList = ({
    data,
    titulo,
    autor,
    conteudo,
    imageUrl,
    id,
}: Post): JSX.Element => {
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
                    onClick={() => handleOnClick(id)}
                    backgroundColor="var(--pink)"
                    colorText="#fff"
                    text="Leia Mais →"
                    extraStyle={{ marginTop: "24px" }}
                    tipo = "pequeno"
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
