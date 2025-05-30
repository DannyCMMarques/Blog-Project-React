// src/pages/blogPost/index.spec.tsx
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeAll, beforeEach, type Mock } from "vitest";
import BlogPost from ".";
import usePostsService from "../../service/usePostsService";
import { useParams } from "react-router-dom";
import { postsResponseMock } from "../../utils/mock/postResponseMock";
import style from "./style.module.css";

vi.mock("react-router-dom", () => ({
    __esModule: true,
    useParams: vi.fn(),
}));

const mockedApi = {
    getPostById: vi.fn(),
};

vi.mock("../../service/usePostsService", () => ({
    __esModule: true,
    default: vi.fn(),
}));

describe("<BlogPost />", () => {
    beforeAll(() => {
        (useParams as Mock).mockReturnValue({ id: "1" });
        (usePostsService as Mock).mockReturnValue(mockedApi);
    });

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("chama getPostById com o ID da URL e exibe os dados retornados", async () => {
        mockedApi.getPostById.mockResolvedValue(postsResponseMock);

        const { container } = render(<BlogPost />);

        await waitFor(() => {
            expect(mockedApi.getPostById).toHaveBeenCalledWith(1);
        });

        expect(
            screen.getByRole("heading", { level: 1, name: postsResponseMock.titulo })
        ).toBeInTheDocument();

        expect(
            screen.getByText(`Por ${postsResponseMock.autor}`)
        ).toBeInTheDocument();
        expect(
            screen.getByText(postsResponseMock.horarioFormatado!) 
        ).toBeInTheDocument();

        expect(
            screen.getByText(new RegExp(postsResponseMock.conteudo.substring(0, 30)))
        ).toBeInTheDocument();

        const imagemDiv = container.querySelector(
            `.${style.containerImagem}`
        ) as HTMLElement;

        expect(imagemDiv).toBeTruthy();

    expect(imagemDiv.style.backgroundImage).toContain(
        `url("${postsResponseMock.linkImagem}")`
    );
    });
});
