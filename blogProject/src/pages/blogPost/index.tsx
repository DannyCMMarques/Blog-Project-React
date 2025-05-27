
import { useParams, Navigate } from 'react-router-dom';
import ContainerComponent from '../../components/container';
import style from './style.module.css';
import type { JSX } from 'react';
import { postsMock } from '../../utils/mock/postMock';

const BlogPost: React.FC = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const post = postsMock.find(p => p.id === Number(id));

  if (!post) return <Navigate to="/blog" replace />;

  return (
    <ContainerComponent>
      <div className="cabecalho">
        <h1 className="titulo">{post.titulo}</h1>
      </div>

      <div className={style.containerAutorData}>
        <span className={style.autor}>Por {post.autor}</span>
        <span className={style.data}>{post.data}</span>
      </div>

      <div
        className={style.containerImagem}
        style={{ backgroundImage: `url(${post.imageUrl})` }}
      >
      </div>

      <div className={style.conteudo}> {post.conteudo}</div>
    </ContainerComponent>
  );
};

export default BlogPost;

