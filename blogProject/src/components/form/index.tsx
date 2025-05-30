import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, type JSX } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { PostRequestDTO } from "../../service/interfaces/interface";
import style from "./style.module.css";

interface FormPostProps {
  onSubmit: (data: PostRequestDTO) => void;
  formId: string;
  apagar:boolean;
}

const FormPost = ({ onSubmit, formId, apagar = false }: FormPostProps): JSX.Element => {
  const schema = z.object({
    titulo: z.string().min(1, "O campo título é obrigatório"),
    autor: z.string().min(1, "O campo autor é obrigatório"),
    linkImagem: z.string().url("O link da imagem deve ser uma URL válida"),
    conteudo: z.string().min(1, "O campo conteúdo é obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PostRequestDTO>({
    resolver: zodResolver(schema),
  });

  const resetPost = () => {
    reset();
  };
  useEffect(() => {
    if (apagar) resetPost();
  });

  return (
    <form className={style.form} onSubmit={handleSubmit(onSubmit)} id={formId}>
      <div className={style.field}>
        <label className={style.label} htmlFor="titulo">
          Título:
        </label>
        <input
          className={style.input}
          type="text"
          id="titulo"
          {...register("titulo")}
          placeholder="Digite o título do post"
        />

        {errors.titulo && (
          <p className={style.error}>{errors.titulo.message}</p>
        )}
      </div>
      <div className={style.containerField}>
        <div className={style.field}>
          <label className={style.label} htmlFor="autor">
            Autor:
          </label>
          <input
            className={style.input}
            type="text"
            id="autor"
            {...register("autor")}
            placeholder="Digite o nome do autor"
          />
          {errors.autor && (
            <p className={style.error}>{errors.autor.message}</p>
          )}
        </div>

        <div className={style.field}>
          <label className={style.label} htmlFor="linkImagem">
            Link da Imagem:
          </label>
          <input
            className={style.input}
            type="text"
            id="linkImagem"
            {...register("linkImagem")}
            placeholder="Digite o link da imagem"
          />
          {errors.linkImagem && (
            <p className={style.error}>{errors.linkImagem.message}</p>
          )}
        </div>
      </div>

      <div className={style.field}>
        <label className={style.label} htmlFor="conteudo">
          Conteúdo:
        </label>
        <textarea
          className={style.textarea}
          id="conteudo"
          {...register("conteudo")}
          placeholder="Digite o conteúdo do post"
        />
        {errors.conteudo && (
          <p className={style.error}>{errors.conteudo.message}</p>
        )}
      </div>
    </form>
  );
};

export default FormPost;
