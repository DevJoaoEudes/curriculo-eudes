# ADR 001 — Decisões de Arquitetura e Design: Currículo Digital

- **Status:** Aprovado
- **Data:** 2026-09-15
- **Desenvolvedor:** Eudes (Full Stack)
- **Contexto:** Hackathon Proenergia Summit 2026

---

## 1. Contexto do Projeto
Construção de um Currículo Digital Interativo e de alta performance utilizando os recursos mais modernos do ecossistema Angular 22.

## 2. Decisões Arquiteturais

### 2.1 Estrutura de Componentes
- **Decisão:** Standalone Components (`imports: [...]`).
- **Motivo:** Padrão oficial e performático do Angular 22, eliminando a sobrecarga de `NgModules` legados.

### 2.2 Gerenciamento de Estado e Reatividade
- **Decisão:** Angular Signals (`signal`, `computed`).
- **Motivo:** Reatividade granular, simples de entender e testar, ideal para o filtro de habilidades (skills) e chaveamento de tema sem complexidade desnecessária de subscriptions manuais.

### 2.3 Identidade Visual e Estilo
- **Decisão:** SCSS estruturado + CSS Custom Properties (Design Tokens).
- **Tema:** Dark Mode padrão com suporte a alternância para Light Mode.
- **Cor de Destaque:** Ciano Elétrico (`#00d2ff`) para contraste, transmitindo tecnologia e inovação.

### 2.4 Composição da Página
1. **Header / Navbar**: Logo, navegação suave e alternador de tema.
2. **Hero Component**: Apresentação Full Stack, foto/avatar, tagline e links principais (LinkedIn, GitHub).
3. **Skills Component**: Habilidades organizadas em categorias com filtro dinâmico via Signals.
4. **Experience Component**: Linha do tempo de experiências, projetos e formação acadêmica.
5. **Contact Component / Footer**: Formulário/links diretos para contato e direitos autorais.
