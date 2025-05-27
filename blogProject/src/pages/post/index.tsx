import { useState } from "react";
import ButtonComponent from "../../components/buttons";
import ContainerComponent from "../../components/container";
import FormPost from "../../components/form";
import type { InputsFormulario } from "../../components/typesComponent";
import style from "./style.module.css";
const Post = () => {
  const [salvo, setSalvo] = useState(false);

  const onSubmit = (data: InputsFormulario) => {
    console.log("Dados do formulário:", data);
    //TODO: vai ligar com  a logica de salvar
    setSalvo(true);
  };
  return (
    <ContainerComponent>
      <div className="cabecalho">
        <p className="titulo">Criar Novo Post</p>
        <div className={style.containerBotoes}>
          {!salvo ? (
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
                form="form-post"
              />

            </>
          )}
        </div>
      </div>
      <FormPost onSubmit={onSubmit} formId="form-post" />
    </ContainerComponent>
  );
};
export default Post;
