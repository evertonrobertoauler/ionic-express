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


retorna um [JWT](https://jwt.io/):


    {"token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6Ik5vbWUiLCJlbWFpbCI6InRlc3RlQGdtYWlsLmNvbSIsImlhdCI6MTQ2MTc1NTAxM30.UnUZmZcEWtZqzygRwIv2x6UV9DXOJ3sYzWGR5l2RoGY"}


### Login


    POST

    http://localhost:3000/signin

    {"username": "teste@gmail.com", "password": "senhasegura"}


retorna:


    {"token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6Ik5vbWUiLCJlbWFpbCI6InRlc3RlQGdtYWlsLmNvbSIsImlhdCI6MTQ2MTc1NTA2MH0.Du35ABQjYcTalshmGVf6x9KqA2K3t_I3Dt_2xFf052U"}


### Atualizar Cadastro


    POST

    http://localhost:3000/user

    Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6Ik5vbWUiLCJlbWFpbCI6InRlc3RlQGdtYWlsLmNvbSIsImlhdCI6MTQ2MTc1NTA2MH0.Du35ABQjYcTalshmGVf6x9KqA2K3t_I3Dt_2xFf052U

    {"name": "Novo Nome", "password": "novasenhasegura"}


retorna:


    {"token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6Ik5vdm8gTm9tZSIsImVtYWlsIjoidGVzdGVAZ21haWwuY29tIiwiaWF0IjoxNDYxNzU1NTIwfQ.U-UZiYa6cdBYC4TKs_zaIZF3f12liKfSFP3bBlgAEJw"}

    PAYLOAD do token

    {"id": 1, "name": "Novo Nome", "email": "teste@gmail.com", "iat": 1461755060}


### Inserindo uma Playlist


    POST

    http://localhost:3000/playlists

    Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6Ik5vdm8gTm9tZSIsImVtYWlsIjoidGVzdGVAZ21haWwuY29tIiwiaWF0IjoxNDYxNzU1NTIwfQ.U-UZiYa6cdBYC4TKs_zaIZF3f12liKfSFP3bBlgAEJw

    {"title": "Teste"}


retorna:


    {"id": 1, "title": "Teste"}


### Atualizando a Playlist


    POST

    http://localhost:3000/playlists/1

    Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6Ik5vdm8gTm9tZSIsImVtYWlsIjoidGVzdGVAZ21haWwuY29tIiwiaWF0IjoxNDYxNzU1NTIwfQ.U-UZiYa6cdBYC4TKs_zaIZF3f12liKfSFP3bBlgAEJw

    {"title": "Teste Update"}


retorna:


    {"id": 1, "title": "Teste Update"}


### Listando as Playlists


    GET

    http://localhost:3000/playlists

    Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6Ik5vdm8gTm9tZSIsImVtYWlsIjoidGVzdGVAZ21haWwuY29tIiwiaWF0IjoxNDYxNzU1NTIwfQ.U-UZiYa6cdBYC4TKs_zaIZF3f12liKfSFP3bBlgAEJw


retorna:


    [{"id": 1, "title": "Teste Update"}]


### Obtendo uma Playlist


    GET

    http://localhost:3000/playlists/1

    Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6Ik5vdm8gTm9tZSIsImVtYWlsIjoidGVzdGVAZ21haWwuY29tIiwiaWF0IjoxNDYxNzU1NTIwfQ.U-UZiYa6cdBYC4TKs_zaIZF3f12liKfSFP3bBlgAEJw


retorna:


    {"id": 1, "title": "Teste Update"}


### Excluindo uma Playlist


    DELETE

    http://localhost:3000/playlists/1

    Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6Ik5vdm8gTm9tZSIsImVtYWlsIjoidGVzdGVAZ21haWwuY29tIiwiaWF0IjoxNDYxNzU1NTIwfQ.U-UZiYa6cdBYC4TKs_zaIZF3f12liKfSFP3bBlgAEJw

