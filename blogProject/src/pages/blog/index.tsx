import type { JSX } from "react";
import BlogList from "../../components/blogList";
import { postsMock } from "../../utils/mock/PostMock";
import style from "./style.module.css";
const Blog = (): JSX.Element => {
  return (

    <div className="container">
      <h1 className={style.titulo}>Blog</h1>


      <div className={style.listaPosts}>
        {postsMock.map((post) => (
          <BlogList
            key={post.id}
            date={post.date}
            title={post.title}
            author={post.author}
            excerpt={post.content}
            imageUrl={post.imageUrl}
            onReadMore={() => console.log(`Read more ${post.id}`)}
          />
        ))}
      </div>
    </div>

  );
}

export default Blog;