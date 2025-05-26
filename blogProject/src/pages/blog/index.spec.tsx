import { fireEvent, render, screen } from "@testing-library/react";
import { createMemoryHistory } from 'history';
import { MemoryRouter, Route, Router, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import Blog from ".";
import { postsMock } from "../../utils/mock/postMock";
import BlogPost from "../blogPost";



describe("Testando a página Blog ", () => {
    it("deve renderizar corretamente todos os títulos dos posts", () => {

        render(
            <MemoryRouter>
                <Blog />
            </MemoryRouter>
        );
        expect(screen.getByText("Blog")).toBeInTheDocument();
        postsMock.forEach((post) => {
            expect(screen.getByText(post.titulo)).toBeInTheDocument();
        });
    });

    it("deve navegar para a página do post correspondente ao clicar em ler mais", () => {
        const history = createMemoryHistory({ initialEntries: ["/blog"] });

        render(
            <Router location={history.location} navigator={history}>
                <Routes>
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:id" element={<BlogPost />} />
                </Routes>
            </Router>
        );

        const quartoPost = postsMock[3];
        const buttons = screen.getAllByText(/Leia Mais/i);
        fireEvent.click(buttons[3]);

        expect(history.location.pathname).toBe(`/blog/${quartoPost.id}`);
    });
});
