#  API Anti-Fraude UpChallenge
# Sobre o Projeto
A ideia do projeto é:
<p>Desenvolver uma API que avalia transações de um e-commerce e retorna um <b>score</b> de 0 a 100 de risco, sendo 0 (sem indícios de fraude) e 100 (com máximo risco de fraude).</p>

# Motivo
O motivo do projeto é participar do desafio UpChallenge e aprimorar meus conhecimentos em desenvolvimento back-end.
<p>A linguagem utilizada para desenvolver essa API, foi o JavaScript, através do interpretador Node.js. Fiz essa escolha devido a familiaridade e conhecimento prévio do JavaScript em front-end, e mesmo não tendo muito conhecimento com o backend em Node.js, tive uma boa curva de aprendizado para elaboração desse desafio.</p><p>No geral foi uma experiência interessante e satisfatória estudar e aprender mais sobre a criação de uma API com essas tecnologias.</p>

# Descrição

Essa **API** tem um **endpoint** que recebe os dados via **POST**, esses dados devem estar em um array contendo as transações em formato JSON, e assim, o endpoint retorna um novo array no mesmo formato, porém, contendo somente a chave da transação (ID) e o **score** resultante.

Exemplo:

Um requisição POST enviada ao endpoint contém as seguintes informações:

~~~
[
  {
    "id": "967272",
    "value": "156.23",
    "paid_at": "2020-07-21 15:14:25",
    "ip_location": "SC/BR",
    "card_hold_name": "Aragorn Batista",
    "customer": {
      "id": "65165",
      "name": "Aragorn Batista",
      "birth_date": "1992-08-02",
      "state": "SC/BR",
      "phone": "47 98125-3129"
    }
  },
  {
    "id": "978852",
    "value": "236.83",
    "paid_at": "2019-02-21 10:29:35",
    "ip_location": "RJ/BR",
    "card_hold_name": "Frodo Alves",
    "customer": {
      "id": "65166",
      "name": "Frodo Alves",
      "birth_date": "1995-08-03",
      "state": "SP/BR",
      "phone": "11 98125-8078"
    }
  }
]
~~~

Espera-se como retorno da requisição:

~~~
[
  {
    "id": "967272",
    "score": 0
  },
  {
    "id": "978852",
    "score": 23
  }
]
~~~

# Funcionalidades
<p>Verificar em uma ou mais transações, o risco de fraude nessas transações através de um indicador, o <b>score</b>, que pode aumentar de 0 até 100, de acordo com as seguintes situações:<p>
<li>Nome do cliente cadastrado diferente do nome no cartão utilizado;</li>
<li>Estado(UF) cadastrada pelo cliente diferente do Estado(UF) onde foi realizada a transação;</li>
<li>Número DDD do telefone do cliente diferente do DDD do Estado(UF) onde foi realizada a transação;</li>
<li>Número DDD do telefone do cliente diferente do DDD do Estado(UF) cadastrado pelo cliente;</li>
<li>Número de telefone do cliente é inválido;</li>
<li>Data de pagamento informada na transação é maior do que a data da realização da transação;</li>
<li>Cliente tem idade menor que 18 anos;</li>

# Executar o projeto em ambiente local

<h2>Requisitos</h2>
<h4>Instalar o Node.js e NPM</h4>
<p>Windows e macOS: https://nodejs.org/en/download/</p>
<p>Linux (Ubuntu):</p>

~~~~
sudo apt install nodejs npm
~~~~

<h4>Instalar Postman</h4>

[Instalação do software](https://www.postman.com/downloads/)

[Extensão do Google Chrome](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=pt-BR)

<h2>Clonar o repositório</h2>

~~~
git clone https://github.com/VieiraVitor/api-upchallenge.git
~~~

<h2>Execução</h2>
Após as instalações necessárias e a realização do download(clonagem) do repositório, é necessário acessar o diretório raiz do repositório baixado e executar o seguinte comando no terminal:

~~~
npm install

npm start
~~~

<i>A porta que foi definida para o servidor é a **4000**, acessando http://localhost:4000/ é possível visualizar o resultado de uma requisição GET com finalidade de teste.</i>

<h2>Testes com Postman</h2>
Para testar as requisições HTTP via POST, utilizarei como exemplo o software Postman.

O path do endpoint da API que realiza a validação das transações (que recebe a requisição POST), está em /validate
<p>Endereço completo:</p>

~~~
http://localhost:4000/validate
~~~

<h4>Utilizando</h4>

Com o Postman aberto, deve-se alterar o método da requisição para POST e inserir a URL de requisição ao lado.

![](/assets/images/postman-1.png)

Na aba 'Header', verificar se a key 'Content-Type' existe e se está com o value = 'application/json'.
Caso não, crie a key e insira esse value.

![](/assets/images/postman-2.png)

Na aba 'Body' envia-se o corpo da requisição, selecione o método 'raw' e insira o array de transações, clique em 'Send' para enviar a requisição.

![](/assets/images/postman-3.png)

A resposta será informada logo abaixo, com o array de retorno e o Status da transação, junto do tempo gasto na requisição.

![](/assets/images/postman-4.png)

Abaixo há um gif mostrando o passo a passo do teste via Postman:

![](/assets/images/postman-test.gif)