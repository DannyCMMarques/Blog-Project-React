import { vi, type Mock } from "vitest";
import { allPostsResponseMock } from "../../utils/mock/allPostsResponseMock";
import { postsRequestMock } from "../../utils/mock/postRequestMock";
import { postsResponseMock } from "../../utils/mock/postResponseMock";
import type { PostPage, PostRequestDTO } from "../interfaces/interface";
import useApiInterceptor from "../useApiInterceptor";
import usePostsService from "../usePostsService";

vi.mock("../useApiInterceptor");

const mockedApi = {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
};

describe("Testando o usePostsService", () => {
    let service: ReturnType<typeof usePostsService>;

    beforeAll(() => {
        (useApiInterceptor as Mock).mockReturnValue(mockedApi);
        service = usePostsService();
    });

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("cadastrarPosts: deve chamar POST e retornar os dados criados", async () => {
        mockedApi.post.mockResolvedValueOnce({ data: postsResponseMock });

        const result = await service.cadastrarPosts(
            postsRequestMock as PostRequestDTO
        );

        expect(mockedApi.post).toHaveBeenCalledWith(
            "/api/v1/posts",
            postsRequestMock
        );
        expect(result).toEqual(postsResponseMock);
    });

    it("getPostById: deve chamar GET /:id e retornar o post", async () => {
        mockedApi.get.mockResolvedValueOnce({ data: postsResponseMock });

        const result = await service.getPostById(1);

        expect(mockedApi.get).toHaveBeenCalledWith("/api/v1/posts/1");
        expect(result).toEqual(postsResponseMock);
    });

    it("listarPosts: deve chamar GET com query params e retornar página", async () => {
        const mockPage: PostPage = {
            content: allPostsResponseMock,
            pageable: { pageNumber: 1, pageSize: 1 },
            totalElements: allPostsResponseMock.length,
            totalPages: 1,
            last: true,
        };
        mockedApi.get.mockResolvedValueOnce({ data: mockPage });

        const result = await service.listarPosts(2, 5, "titulo", "desc");

        expect(mockedApi.get).toHaveBeenCalledWith("/api/v1/posts", {
            params: { page: 2, size: 5, sortBy: "titulo", direction: "desc" },
        });
        expect(result).toEqual(mockPage);
    });

    it("atualizarPosts: deve chamar PUT /:id e retornar o post atualizado", async () => {
        mockedApi.put.mockResolvedValueOnce({ data: postsResponseMock });

        const result = await service.atualizarPosts(
            3,
            postsRequestMock as PostRequestDTO
        );

        expect(mockedApi.put).toHaveBeenCalledWith(
            "/api/v1/posts/3",
            postsRequestMock
        );
        expect(result).toEqual(postsResponseMock);
    });

    it("deletarPost: deve chamar DELETE /:id e não retornar nada", async () => {
        mockedApi.delete.mockResolvedValueOnce({}); 
        await service.deletarPost(7);

        expect(mockedApi.delete).toHaveBeenCalledWith("/api/v1/posts/7");
    });
});
