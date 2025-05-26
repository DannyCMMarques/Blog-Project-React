import type { JSX } from "react";
import BlogList from "../../components/blogList";
import style from "./style.module.css";
import type { Post } from "../../utils/mock/postInterface";
import { postsMock } from "../../utils/mock/postMock";



const Blog = (): JSX.Element => {
  return (
    <div className="container">
      <h1 className={style.titulo}>Blog</h1>
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
    </div>
  );
}
export default Blog;