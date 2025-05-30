
import type {
    PostPage,
    PostRequestDTO,
    PostResponseDTO,
} from "./interfaces/interface";
import useApiInterceptor from "./useApiInterceptor";

function usePostsService() {
    const api = useApiInterceptor();
    const url = "/api/v1/posts";

    async function cadastrarPosts(
        post: PostRequestDTO
    ): Promise<PostResponseDTO> {
        const response = await api.post<PostResponseDTO>(url, post);
        return response.data;
    }

    async function getPostById(id: number): Promise<PostResponseDTO> {
        const response = await api.get<PostResponseDTO>(`${url}/${id}`);
        return response.data;
    }

    async function listarPosts(
        page: number = 1,
        size: number = 10,
        sortBy: string = "titulo",
        direction: "asc" | "desc" = "asc"
    ): Promise<PostPage> {
        const response = await api.get<PostPage>(url, {
            params: { page, size, sortBy, direction },
        });
        return response.data;
    }

    async function atualizarPosts(
        id: number,
        post: PostRequestDTO
    ): Promise<PostResponseDTO> {
        const response = await api.put<PostResponseDTO>(`${url}/${id}`, post);
        return response.data;
    }

    async function deletarPost(id: number): Promise<void> {
        await api.delete<void>(`${url}/${id}`);
    }

    return {
        cadastrarPosts,
        getPostById,
        listarPosts,
        atualizarPosts,
        deletarPost,
    };
}

export default usePostsService;
