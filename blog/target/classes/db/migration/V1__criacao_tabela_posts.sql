CREATE TABLE posts (
  id          SERIAL PRIMARY KEY,
  titulo      VARCHAR(255)  NOT NULL,
  autor       VARCHAR(255)  NOT NULL,
  link_imagem VARCHAR(255)  NOT NULL,
  conteudo    TEXT          NOT NULL,
  create_at   TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP
);