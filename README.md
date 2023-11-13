# Boas-vindas ao repositório do projeto Store Manager !

🧑‍💻 O desafio aqui foi desenvolver uma API RESTful utilizando a arquitetura em camadas!

A API construída é um sistema de gerenciamento de vendas capaz de criar, visualizar, deletar e atualizar produtos e vendas, nela utilizei o banco de dados MySQL para a gestão de dados.

Parte fundamental desse projeto foi desenvolver testes para garantir as funcionalidade das implementações.

# Funcionalidades desenvolvidas:


<details>
  <summary><strong>Produtos:</strong></summary>

  1. Criar endpoints GET /products e GET /products/:id;
  2. Retornar todos os produtos via GET /products;
  3. Retornar um único produto via GET /products/:id;
  4. Retornar todos os produtos via GET /products;
  5. Ordenar resultados crescentemente pelo campo id;
  6. Criar endpoint DELETE /products/:id;
  7. Deletar apenas o produto com id presente na URL.
  8. Pesquisa de produtos.
  9. Criar Endpoint GET /products/search;
  10. Retornar produtos que contenham o valor da query q no nome;
  11. Retornar todos os produtos se query params q estiver vazia;
  12. Retornar array vazio se nenhum nome satisfizer a busca.


<br />
</details>


<details>
  <summary><strong>Vendas:</strong></summary>

  1. Criar endpoints GET /sales e GET /sales/:id;
  2. Retornar todas as vendas via GET /sales;
  3. Retornar uma única venda via GET /sales/:id;
  4. Ordenar resultados por saleId e, em caso de empate, por productId;
  5. Utilizar JOIN para buscar dados de mais de uma tabela.
  6. Criar endpoint DELETE /sales/:id;
  7. Deletar apenas a venda com id presente na URL.
  8. Atualização de Quantidade em Venda.
<br />
</details>




<details>
  <summary><strong>Cadastro de Produtos:</strong></summary>

  1. Criar endpoint POST /products;
  2. Salvar produtos na tabela products do banco de dados;
  3. Validações de Cadastro de Produtos:
  4. Retornar mensagens de erro para dados inválidos;
  5. Não acessar o banco de dados nas validações iniciais do corpo.
  6. Criar endpoint PUT /products/:id: Atualizar apenas o produto com id presente na URL;
<br />
</details>



<details>
  <summary><strong>Cadastro de Vendas:</strong></summary>

  1. Criar endpoint POST /products;
  2. Salvar produtos na tabela products do banco de dados;
  3. Validações de Cadastro de Produtos:
  4. Retornar mensagens de erro para dados inválidos;
  5. Não acessar o banco de dados nas validações iniciais do corpo.
  6. Possibilitar cadastro de venda de vários produtos em uma única requisição;
  7. Requisição com corpo no formato de array.
  8. Validações de Cadastro de Vendas
<br />
</details>



