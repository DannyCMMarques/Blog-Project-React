import { useCallback, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import ButtonComponent from "../../components/buttons";
import ContainerComponent from "../../components/container";
import FormPost from "../../components/form";
import type {
  PostRequestDTO,
  PostResponseDTO,
} from "../../service/interfaces/interface";
import usePostsService from "../../service/usePostsService";
import style from "./style.module.css";

const Post = () => {
  const [isSalvo, setIsSalvo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [idPostSalvo, setIdPostSalvo] = useState<number>();
  const [resetar, setResatar] = useState(false);
  const postsService = usePostsService();


  const editarPost = useCallback(
    async (id: number, data: PostRequestDTO) => {
      setIsLoading(true);
      try {
        await postsService.atualizarPosts(id, data);
        toast.success("Post Editado Com Sucesso");
      } catch (err) {
        console.error("Erro ao buscar itens:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [postsService]
  );
  console.log(isLoading);

  const excluirPost = useCallback(
    async (id: number) => {
      setIsLoading(true);
      try {
        await postsService.deletarPost(id);
        toast.success("Post deletado com Sucesso");
        setResatar(true);
      } catch (err) {
        console.error("Erro ao buscar itens:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [postsService]
  );

  const cadastrarPost = useCallback(
    async (data: PostRequestDTO) => {
      setIsLoading(true);
      try {
        const postsData: PostResponseDTO = await postsService.cadastrarPosts(
          data
        );
        setIdPostSalvo(postsData.id);
        toast.success("Post Cadastrado Com Sucesso");

        setIsSalvo(true);
      } catch (err) {
        console.error("Erro ao buscar itens:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [postsService]
  );

  const onSubmit = (data: PostRequestDTO) => {
    if (isSalvo) {
      editarPost(idPostSalvo!, data);
    } else {
      cadastrarPost(data);
    }
  };

  const handleApagar = () => {
    excluirPost(idPostSalvo!);
  };
  return (
    <ContainerComponent>
      <ToastContainer />
      <div className="cabecalho">
        <p className="titulo">Criar Novo Post</p>
        <div className={style.containerBotoes}>
          {!isSalvo ? (
            <ButtonComponent
              backgroundColor="var(--pink)"
              colorText="#fff"
              text="Salvar"
              form="form-post"
            />
          ) : (
            <>
              <ButtonComponent
                backgroundColor="#5ca35c"
                colorText="#fff"
                text="Editar"
                form="form-post"
              />

              <ButtonComponent
                backgroundColor="#cd6b6b"
                colorText="#fff"
                text="Apagar"
                onClick={() => handleApagar()}
              />
            </>
          )}
        </div>
      </div>
      <FormPost onSubmit={onSubmit} formId="form-post" apagar={resetar} />
    </ContainerComponent>
  );
};
export default Post;
