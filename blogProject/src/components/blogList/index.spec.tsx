import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import BlogList from ".";
import { postsMock } from "../../utils/mock/postMock";
vi.mock("react-router-dom", async () => {
    const actual = await import("react-router-dom");
    return {
        ...actual,
        useNavigate: vi.fn(),
    };
});

describe("Testando o componenteBlogList", () => {
    it("deve renderizar os elementos principais", () => {
        render(
            <MemoryRouter>
                <BlogList {...postsMock[0]} />
            </MemoryRouter>
        );

        expect(screen.getByText(postsMock[0].data)).toBeInTheDocument();
        expect(screen.getByText(postsMock[0].titulo)).toBeInTheDocument();
        expect(screen.getByText(`Por ${postsMock[0].autor}`)).toBeInTheDocument();
        expect(screen.getByText(/Leia Mais/i)).toBeInTheDocument();

        const resumo = postsMock[0].conteudo.slice(0, 180) + "...";
        expect(screen.getByText(resumo)).toBeInTheDocument();
    });

    it("deve navegar para a página correta ao clicar no botão", () => {
        const navigate = vi.fn();
        (useNavigate as unknown as ReturnType<typeof vi.fn>).mockReturnValue(navigate);

        render(
            <MemoryRouter>
                <BlogList {...postsMock[0]} />
            </MemoryRouter>
        );

        const button = screen.getByText(/Leia Mais/i);
        fireEvent.click(button);

        expect(navigate).toHaveBeenCalledWith(`/blog/${postsMock[0].id}`);
    });
});



