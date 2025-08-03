# Sistema de Controle de Tarefas

Este projeto é uma aplicação web para gerenciamento de tarefas, desenvolvida com **Spring Boot** no backend e **HTML/CSS/JavaScript** no frontend. Permite adicionar, listar, concluir e excluir tarefas, separando-as entre pendentes e concluídas.

---

## Sumário

- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Como Executar](#como-executar)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Endpoints da API](#endpoints-da-api)
- [Detalhes do Frontend](#detalhes-do-frontend)
- [Configuração do Banco de Dados](#configuração-do-banco-de-dados)
- [Personalização](#personalização)
- [Licença](#licença)

---

## Funcionalidades

- Adicionar nova tarefa
- Listar tarefas pendentes
- Listar tarefas concluídas
- Marcar tarefa como concluída
- Excluir tarefa

---

## Tecnologias Utilizadas

- **Backend:** Spring Boot, Spring Data JPA
- **Banco de Dados:** H2 (em memória, para testes)
- **Frontend:** HTML, CSS, JavaScript puro
- **Build:** Maven

---

## Como Executar

1. **Pré-requisitos:**
   - Java 17 ou superior instalado
   - Maven instalado (ou use o wrapper `mvnw` do projeto)

2. **Configuração do Banco de Dados:**
   - Por padrão, utiliza H2 em memória (veja [application.properties](src/main/resources/application.properties)).
   - Não é necessário instalar nada para testes.

3. **Executando o Backend:**
   - No terminal, na pasta do projeto, execute:
     ```
     ./mvnw spring-boot:run
     ```
     ou
     ```
     mvn spring-boot:run
     ```

4. **Acessando o Sistema:**
   - Abra o navegador e acesse: [http://localhost:8080/](http://localhost:8080/)
   - O frontend será carregado e estará integrado ao backend.

---

## Estrutura do Projeto

```
src/
 └─ main/
     ├─ java/
     │   └─ com/meuapp/todolist/
     │        ├─ controller/      # Controllers REST
     │        ├─ model/           # Entidades JPA
     │        ├─ repository/      # Repositórios JPA
     │        ├─ service/         # Lógica de negócio
     │        └─ TodolistApplication.java # Classe principal
     └─ resources/
         ├─ static/
         │    ├─ index.html       # Frontend
         │    ├─ style.css        # Estilos
         │    └─ app.js           # Lógica JS
         └─ application.properties # Configuração do banco
```

---

## Endpoints da API

| Método | Endpoint                      | Descrição                       |
|--------|-------------------------------|----------------------------------|
| POST   | `/api/tarefas`                | Adiciona nova tarefa             |
| GET    | `/api/tarefas/pendentes`      | Lista tarefas pendentes          |
| GET    | `/api/tarefas/concluidas`     | Lista tarefas concluídas         |
| POST   | `/api/tarefas/{id}/concluir`  | Marca tarefa como concluída      |
| DELETE | `/api/tarefas/{id}`           | Exclui tarefa                   |

---

## Detalhes do Frontend

- **Adicionar tarefa:** Preencha o campo e clique em "Adicionar Tarefa".
- **Listar tarefas:** Tarefas pendentes e concluídas aparecem em listas separadas.
- **Concluir tarefa:** Clique sobre uma tarefa pendente para marcá-la como concluída.
- **Excluir tarefa:** Clique no botão "Excluir" ao lado da tarefa pendente.

---

## Configuração do Banco de Dados

O arquivo [`application.properties`](src/main/resources/application.properties) já está configurado para usar H2:

```properties
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driver-class-name=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=
spring.jpa.hibernate.ddl-auto=update
spring.h2.console.enabled=true
```

Para usar outro banco (ex: PostgreSQL), altere as propriedades acima conforme necessário.

---

## Personalização

- Para mudar o visual, edite [`style.css`](src/main/resources/static/style.css).
- Para adicionar novos campos à tarefa, edite [`Tarefa.java`](src/main/java/com/meuapp/todolist/model/Tarefa.java) e ajuste o frontend.

---

## Licença

Este projeto é livre para uso educacional e pessoal.

---
