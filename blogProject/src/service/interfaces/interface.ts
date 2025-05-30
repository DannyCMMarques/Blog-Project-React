export interface PostRequestDTO {
    titulo: string;
    autor: string;
    linkImagem: string;
    conteudo: string;
}

export interface PostResponseDTO extends PostRequestDTO {
    id: number;
    horarioFormatado: string;
}

export interface Page<T> {
  content: T[];
  pageable: {
    pageNumber: number;   
    pageSize: number;
  };
  totalElements: number;
  totalPages: number;
  last: boolean;

}

export type PostPage = Page<PostResponseDTO>;
