import type { JSX } from "react";
import BlogList from "../../components/blogList";
import ContainerComponent from "../../components/container";
import type { Post } from "../../utils/mock/postInterface";
import { postsMock } from "../../utils/mock/postMock";
import style from "./style.module.css";



const Blog = (): JSX.Element => {
  return (
    <ContainerComponent>
      <div className="cabecalho">
        <p className="titulo">Blog</p>
      </div>
      <div className={style.listaPosts}>
        {postsMock.map((post: Post) => (
          <BlogList
            key={post.id}
            id={post.id}
            data={post.data}
            titulo={post.titulo}
            autor={post.autor}
            conteudo={post.conteudo}
            imageUrl={post.imageUrl}
          />
        ))}
      </div>
    </ContainerComponent>
  );
}
export default Blog;