import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Router, Routes } from "react-router-dom";
import { beforeEach, describe, expect, it, vi, type Mock } from "vitest";

import { createMemoryHistory } from "history";
import usePostsService from "../../service/usePostsService"; 
import { allPostsResponseMock } from "../../utils/mock/allPostsResponseMock";
import BlogPost from "../blogPost";
import Blog from "./index";

vi.mock("../../service/usePostsService", () => ({
    __esModule: true,
    default: vi.fn(),
}));

const listarPostsMock = vi.fn();

describe("Página <Blog />", () => {
    beforeAll(() => {
        (usePostsService as Mock).mockReturnValue({
            listarPosts: listarPostsMock,
        });
    });

    beforeEach(() => {
        vi.clearAllMocks();
        listarPostsMock.mockResolvedValue({
            content: allPostsResponseMock,
            pageable: { pageNumber: 0, pageSize: 10 },
            totalElements: allPostsResponseMock.length,
            totalPages: 1,
            last: true,
        });
    });

    it("renderiza todos os títulos de posts", async () => {
        render(
            <MemoryRouter initialEntries={["/blog"]}>
                <Routes>
                    <Route path="/blog" element={<Blog />} />
                </Routes>
            </MemoryRouter>
        );

        for (const post of allPostsResponseMock) {
            expect(await screen.findByText(post.titulo)).toBeInTheDocument();

            expect(screen.getByText(`Por ${post.autor}`)).toBeInTheDocument();
            expect(
                await screen.findByText(post.horarioFormatado)
            ).toBeInTheDocument();
        const trecho = post.conteudo.slice(0, 20).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  expect(await screen.findByText(new RegExp(trecho))).toBeInTheDocument();
        }
    });

    it("navega para /blog/:id ao clicar em 'Leia Mais'", async () => {
        const history = createMemoryHistory({ initialEntries: ["/blog"] });

        render(
            <Router location={history.location} navigator={history}>
                <Routes>
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:id" element={<BlogPost />} />
                </Routes>
            </Router>
        );
        const quartoPost = allPostsResponseMock[3];

        const buttons = await screen.findAllByText(/Leia Mais/i);
        expect(buttons).toHaveLength(allPostsResponseMock.length);

        fireEvent.click(buttons[3]);
        expect(history.location.pathname).toBe(`/blog/${quartoPost.id}`);
    });
});
