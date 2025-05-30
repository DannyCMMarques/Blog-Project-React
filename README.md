# 🍽️ PerfectRecipe

<p align="center">
  <img src="https://github.com/user-attachments/assets/0dca12ef-bbc4-4ff2-b694-cfcb62350ccb" alt="Home do PerfectRecipe" width="600" />
</p>

## 🚀 Visão Geral

> ℹ️ O projeto já vem populado com **6 posts** iniciais para facilitar a visualização dos posts e testar a paginação.


Este é um **MVP de um Blog** chamado **PerfectRecipe**, desenvolvido com **React** e **TypeScript**, focado em:

- **Página de listagem** de posts com **paginação**  
- **Página de criação/edição** de post (formulário com validação)  
- **Página de visualização** de um post individual (ao clicar em “Leia mais”)  

O layout é **100% responsivo** para desktop e mobile.
- Acesse o back por meio desse link: https://github.com/DannyCMMarques/Blog-Back-Spring-Java
---

## 🛠 Tecnologias

- **React**  
- **TypeScript**  
- **React Router DOM** (navegação)  
- **Axios** (requisições HTTP)  
- **React Hook Form** + **Zod** (validação de formulários)  
- **React Toastify** (toasts de feedback)  
- **Vitest** + **Testing Library** (testes unitários)  
- **React Testing Library**  
- **CSS puro** (com suporte a SX prop, se desejar)  

---

## ✨ Funcionalidades

1. **Listar Posts**  
   - Paginação dinâmica  
   - Ordenação por data de criação  
2. **Criar Post**  
   - Formulário controlado com validação de esquema (Zod)  
   - Feedback de sucesso/erro via toast  
3. **Editar / Excluir Post**  
   - Botões de ação em cada card de post  
4. **Visualizar Post**  
   - Página de detalhes, acessada por “Leia mais”  
5. **Responsividade**  
   - Layout fluido para dispositivos móveis e desktops  

---

## 📸 Capturas de Tela
<p align="center">
  <img src="https://github.com/user-attachments/assets/85580dcd-6932-46ad-8cf9-1e04aa9df737" alt="Home do PerfectRecipe" width="600"  />
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/905f76c5-57b2-4853-8f5b-84f876ed8127" alt="Home do PerfectRecipe" width="600" />
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/351984a7-3470-47a0-9a15-fefcaf5ecf7d" alt="Home do PerfectRecipe" width="600" />
</p>
<p align="center">
  <img src="https://github.com/user-attachments/assets/b32872cf-5f79-4c58-a49a-4534f894da30" width="600" />
</p>
<p align="center">
  <img src="https://github.com/user-attachments/assets/7188d74f-0132-4eaf-8b3f-51ab205a6faa" width="600" />
</p>


---

## 💻 Como Rodar

1. Clone o repositório da **API** e suba com Docker Compose  
   ```bash
   git clone https://github.com/DannyCMMarques/Blog-Back-Spring-Java.git
   cd blog
   docker compose build
   docker compose up -d
   ```
2. Clone o repositório do **front-end** e instale dependências  
   ```bash
   git clone https://github.com/DannyCMMarques/Blog-Project-React.git
   cd Blog-Project-React
   npm install
   ```
3. Rode em modo de desenvolvimento  
   ```bash
   npm run dev
   ```
4. Abra no navegador em  
   ```
   http://localhost:5173
   ```

---

## ✅ Testes

- Para rodar todos os testes:
  ```bash
  npm run test
  ```
- Para gerar relatório de cobertura:
  ```bash
  npm run test:coverage
  ```
![image](https://github.com/user-attachments/assets/a1873fe5-98da-4060-a5e3-d1b1d364f50c)




