// src/pages/post/index.spec.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeAll, beforeEach, type Mock } from "vitest";
import Post from ".";
import usePostsService from "../../service/usePostsService";
import { postsResponseMock } from "../../utils/mock/postResponseMock";
import { postsRequestMock } from "../../utils/mock/postRequestMock";

const mockedApi = {
  cadastrarPosts: vi.fn(),
  atualizarPosts: vi.fn(),
  deletarPost: vi.fn(),
};

vi.mock("../../service/usePostsService", () => ({
  __esModule: true,
  default: vi.fn(),
}));


describe("Testando a Página de Postagem", () => {

  beforeAll(() => {
    (usePostsService as Mock).mockReturnValue(mockedApi);
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const preencherFormulario = () => {
    fireEvent.change(
      screen.getByPlaceholderText("Digite o título do post"),
      { target: { value: postsRequestMock.titulo } }
    );
    fireEvent.change(
      screen.getByPlaceholderText("Digite o nome do autor"),
      { target: { value: postsRequestMock.autor } }
    );
    fireEvent.change(
      screen.getByPlaceholderText("Digite o link da imagem"),
      { target: { value: postsRequestMock.linkImagem } }
    );
    fireEvent.change(
      screen.getByPlaceholderText("Digite o conteúdo do post"),
      { target: { value: postsRequestMock.conteudo } }
    );
  };

  const form = () => document.getElementById("form-post") as HTMLFormElement;

  it("exibe somente botão 'Salvar' no mount", () => {
    render(<Post />);
    expect(screen.getByText("Salvar")).toBeInTheDocument();
    expect(screen.queryByText("Editar")).toBeNull();
    expect(screen.queryByText("Apagar")).toBeNull();
  });

  it("deve cadastrar um post e então mostrar 'Editar' e 'Apagar'", async () => {
    mockedApi.cadastrarPosts.mockResolvedValue(postsResponseMock);

    render(<Post />);
    preencherFormulario();
    fireEvent.submit(form());

    await waitFor(() =>
      expect(mockedApi.cadastrarPosts).toHaveBeenCalledWith(postsRequestMock)
    );

    expect(await screen.findByText("Editar")).toBeInTheDocument();
    expect(await screen.findByText("Apagar")).toBeInTheDocument();
  });

  it("deve editar o post existente quando clicar em 'Editar'", async () => {
    mockedApi.cadastrarPosts.mockResolvedValue(postsResponseMock);

    render(<Post />);
    preencherFormulario();
    fireEvent.submit(form());
    await waitFor(() =>
      expect(mockedApi.cadastrarPosts).toHaveBeenCalled()
    );

    const btnEditar = await screen.findByText("Editar");
    mockedApi.atualizarPosts.mockResolvedValue(postsResponseMock);

    fireEvent.click(btnEditar);

    await waitFor(() =>
      expect(mockedApi.atualizarPosts).toHaveBeenCalledWith(
        postsResponseMock.id,
        postsRequestMock
      )
    );
  });

  it("deve deletar o post existente quando clicar em 'Apagar'", async () => {
    mockedApi.cadastrarPosts.mockResolvedValue(postsResponseMock);

    render(<Post />);
    preencherFormulario();
    fireEvent.submit(form());
    await waitFor(() =>
      expect(mockedApi.cadastrarPosts).toHaveBeenCalled()
    );

    const btnApagar = await screen.findByText("Apagar");
    mockedApi.deletarPost.mockResolvedValue(undefined);

    fireEvent.click(btnApagar);

    await waitFor(() =>
      expect(mockedApi.deletarPost).toHaveBeenCalledWith(
        postsResponseMock.id
      )
    );
  });
});
