import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import BlogList from ".";
import { postsResponseMock } from "../../utils/mock/postResponseMock";
vi.mock("react-router-dom", async () => {
    const actual = await import("react-router-dom");
    return {
        ...actual,
        useNavigate: vi.fn(),
    };
});

describe("Testando o componenteBlogList", () => {
    it("deve renderizar os elementos principais", async () => {
        render(
            <MemoryRouter>
                <BlogList {...postsResponseMock} />
            </MemoryRouter>
        );

        expect(await screen.findByText(postsResponseMock.horarioFormatado)).toBeInTheDocument();
        expect(await screen.findByText(postsResponseMock.titulo)).toBeInTheDocument();
        expect(
            await screen.findByText(`Por ${postsResponseMock.autor}`)
        ).toBeInTheDocument();
        expect(await screen.findByText(/Leia Mais/i)).toBeInTheDocument();

        // const trecho = postsResponseMock.conteudo
        //     .slice(0, 20)
        //     .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        // expect(screen.findByText(new RegExp(trecho))).toBeInTheDocument();
    });

    it("deve navegar para a página correta ao clicar no botão", () => {
        const navigate = vi.fn();
        (useNavigate as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
            navigate
        );

        render(
            <MemoryRouter>
                <BlogList {...postsResponseMock} />
            </MemoryRouter>
        );

        const button = screen.getByText(/Leia Mais/i);
        fireEvent.click(button);

        expect(navigate).toHaveBeenCalledWith(`/blog/${postsResponseMock.id}`);
    });
});
