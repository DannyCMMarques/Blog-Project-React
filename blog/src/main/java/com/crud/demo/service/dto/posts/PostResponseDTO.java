package com.crud.demo.service.dto.posts;

import java.time.LocalTime;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class PostResponseDTO {

    @Schema(description = "Id do Post", example = "1L")
    Long id;
    @Schema(description = "Autor do Posts", example = "Jane Doe")
    @NotBlank(message = "O nome do autor é obrigatório")
    private String autor;

    @Schema(description = "Título do Posts", example = "Classic New York-Style Cheesecake Recipe")
    @NotBlank(message = "O titulo é obrigatório")
    private String titulo;

    @Schema(description = "Link da Imagem", example = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080&auto=format&fit=crop")
    @NotBlank(message = "O Link da Imagem é obrigatório")
    private String linkImagem;

    @Schema(description = "Conteúdo", example = "Nos últimos anos, a tecnologia tem avançado em um ritmo acelerado, trazendo inovações que impactam desde a forma como nos comunicamos até o modo como trabalhamos e aprendemos.\n"+
            "No campo da saúde, vimos o surgimento de dispositivos vestíveis que monitoram sinais vitais em tempo real, permitindo intervenções rápidas e personalizadas para cada paciente.\n" +
            "A sustentabilidade também ganhou destaque: cidades inteligentes estão adotando sistemas de energia renovável e redes de transporte mais eficientes para reduzir emissões de carbono.")
    @NotBlank(message = "O conteúdo é obrigatório")
    private String conteudo;

    @Schema(description = "Horário que foi criado", example = "29 de Maio de 2025, às 08:00")
    @NotBlank(message = "Horário que foi criado")
    private String horarioFormatado;
}
