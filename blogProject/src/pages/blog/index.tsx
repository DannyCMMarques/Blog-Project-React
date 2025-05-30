import { useCallback, useEffect, useState, type JSX } from "react";
import BlogList from "../../components/blogList";
import ContainerComponent from "../../components/container";
import Paginador from "../../components/paginator";
import type {
  PostPage,
  PostResponseDTO,
} from "../../service/interfaces/interface";
import usePostsService from "../../service/usePostsService";
import style from "./style.module.css";
import { BeatLoader } from "react-spinners";

const Blog = (): JSX.Element => {
  const postsService = usePostsService();
  const [posts, setPosts] = useState<PostResponseDTO[]>([]);
  const [pagina, setPagina] = useState<number>(1);
  const size=5;
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState<number>(0);

  const exibirPosts = useCallback(
    async (page = 1) => {
      setIsLoading(true);
      try {
        const postsData: PostPage = await postsService.listarPosts(page, size);
        setPosts(postsData?.content);
        setTotalPages(postsData.totalPages);
      } catch (err) {
        console.error("Erro ao buscar itens:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [postsService]
  );
  useEffect(() => {
    exibirPosts(pagina);
  }, [pagina, size]);

  return (
    <ContainerComponent>
      <div className="cabecalho">
        <p className="titulo">Blog</p>
      </div>
    {isLoading && (
      <div className={style.loading}>
      <BeatLoader color="#621a1a" />
    </div>
    )}
      <div className={style.listaPosts}>
        {posts.map((post: PostResponseDTO) => (
          <BlogList
            key={post.id}
            id={post.id}
            horarioFormatado={post.horarioFormatado}
            titulo={post.titulo}
            autor={post.autor}
            conteudo={post.conteudo}
            linkImagem={post.linkImagem}
          />
        ))}
      </div>
      <Paginador page={pagina} totalPages={totalPages} onChange={setPagina} />
    </ContainerComponent>
  );
};
export default Blog;
