# Servidor implementado com Node.js e [Express](http://expressjs.com/)

## Instalando dependências

- Instale [Node.js versão Latest](https://nodejs.org/en/)
- Instale [GIT](https://git-scm.com/)
- Clone este repositório ($ git clone https://github.com/evertonrobertoauler/ionic-express)
- Instale as dependências locais da aplicação 


    $ cd ionic-express/servidor

    $ npm install


## Rodar o Servidor


    $ node server.js


## Testar o Servidor 

- Sugiro a Extension do Google Chrome [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en)

### Cadastro


    POST 

    http://localhost:3000/signup 

    {"name": "Nome", "email": "teste@gmail.com", "password": "senhasegura"}

    retorna um JWT (https://jwt.io/):

    {"token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IsOJdmVydG9uIEF1bGVyIiwiZW1haWwiOiJldmVydGFkZm9uQGdtYWlsLmNvbSIsImlhdCI6MTQ2MTcyNjY5OH0.RwaHKKyqO3JZjhCLw-WULtf8PRLOIVdJZbLq9Fn1SoI"}


### Login


    POST

    http://localhost:3000/signin

    {"username": "teste@gmail.com", "password": "senhasegura"}

    retorna:

    {"token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IsOJdmVydG9uIEF1bGVyIiwiZW1haWwiOiJldmVydGFkZm9uQGdtYWlsLmNvbSIsImlhdCI6MTQ2MTcyNjY5OH0.RwaHKKyqO3JZjhCLw-WULtf8PRLOIVdJZbLq9Fn1SoI"}


### Atualizar Cadastro


    POST

    http://localhost:3000/user

    Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IsOJdmVydG9uIEF1bGVyIiwiZW1haWwiOiJldmVydGFkZm9uQGdtYWlsLmNvbSIsImlhdCI6MTQ2MTcyNjY5OH0.RwaHKKyqO3JZjhCLw-WULtf8PRLOIVdJZbLq9Fn1SoI

    {"name": "Éverton Auler", "password": "adsafffasf"}

    retorna:

    {"token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IsOJdmVydG9uIEF1bGVyIiwiZW1haWwiOiJldmVydGFkZm9uQGdtYWlsLmNvbSIsImlhdCI6MTQ2MTcyNjY5OH0.RwaHKKyqO3JZjhCLw-WULtf8PRLOIVdJZbLq9Fn1SoI"}


### Inserindo uma Playlist


    POST

    http://localhost:3000/playlists

    Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IsOJdmVydG9uIEF1bGVyIiwiZW1haWwiOiJldmVydGFkZm9uQGdtYWlsLmNvbSIsImlhdCI6MTQ2MTcyNjY5OH0.RwaHKKyqO3JZjhCLw-WULtf8PRLOIVdJZbLq9Fn1SoI

    {"title": "Teste"}

    retorna:

    {"id": 1, "title": "Teste"}


### Atualizando a Playlist


    POST

    http://localhost:3000/playlists/1

    Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IsOJdmVydG9uIEF1bGVyIiwiZW1haWwiOiJldmVydGFkZm9uQGdtYWlsLmNvbSIsImlhdCI6MTQ2MTcyNjY5OH0.RwaHKKyqO3JZjhCLw-WULtf8PRLOIVdJZbLq9Fn1SoI

    {"title": "Teste Update"}

    retorna:

    {"id": 1, "title": "Teste Update"}


### Listando as Playlists


    GET

    http://localhost:3000/playlists

    Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IsOJdmVydG9uIEF1bGVyIiwiZW1haWwiOiJldmVydGFkZm9uQGdtYWlsLmNvbSIsImlhdCI6MTQ2MTcyNjY5OH0.RwaHKKyqO3JZjhCLw-WULtf8PRLOIVdJZbLq9Fn1SoI

    retorna:

    [{"id": 1, "title": "Teste Update"}]


### Obtendo uma Playlist


    GET

    http://localhost:3000/playlists/1

    Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IsOJdmVydG9uIEF1bGVyIiwiZW1haWwiOiJldmVydGFkZm9uQGdtYWlsLmNvbSIsImlhdCI6MTQ2MTcyNjY5OH0.RwaHKKyqO3JZjhCLw-WULtf8PRLOIVdJZbLq9Fn1SoI

    retorna:

    {"id": 1, "title": "Teste Update"}


### Excluindo uma Playlist


    DELETE

    http://localhost:3000/playlists/1

    Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IsOJdmVydG9uIEF1bGVyIiwiZW1haWwiOiJldmVydGFkZm9uQGdtYWlsLmNvbSIsImlhdCI6MTQ2MTcyNjY5OH0.RwaHKKyqO3JZjhCLw-WULtf8PRLOIVdJZbLq9Fn1SoI

