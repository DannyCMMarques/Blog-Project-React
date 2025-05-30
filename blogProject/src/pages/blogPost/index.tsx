import { useCallback, useEffect, useState, type JSX } from "react";
import { useParams } from "react-router-dom";
import ContainerComponent from "../../components/container";
import type { PostResponseDTO } from "../../service/interfaces/interface";
import usePostsService from "../../service/usePostsService";
import style from "./style.module.css";

const BlogPost: React.FC = (): JSX.Element => {
  const postsService = usePostsService();
  const [post, setPost] = useState<PostResponseDTO>();
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams<{ id: string }>();
  const idNumber = Number(id);

  console.log(isLoading);
  const exibirPost = useCallback(
    async (id: number) => {
      setIsLoading(true);
      try {
        const postsData: PostResponseDTO = await postsService.getPostById(id);
        setPost(postsData);
      } catch (err) {
        console.error("Erro ao buscar itens:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [postsService]
  );
  useEffect(() => {
    exibirPost(idNumber);
  }, [idNumber]);

  return (
    <ContainerComponent>
      <div className="cabecalho">
        <h1 className="titulo">{post?.titulo}</h1>
      </div>

      <div className={style.containerAutorData}>
        <span className={style.autor}>Por {post?.autor}</span>
        <span className={style.data}>{post?.horarioFormatado}</span>
      </div>

      <div
        className={style.containerImagem}
        style={{ backgroundImage: `url(${post?.linkImagem})` }}
      ></div>

      <div className={style.conteudo}> {post?.conteudo}</div>
    </ContainerComponent>
  );
};

export default BlogPost;
