# CRUD Com Dashboard

Este projeto é composto por duas partes: um backend (Localizado em user-crud) e um frontend (Localizado em user-dashboard). A seguir, você encontrará instruções detalhadas sobre como configurar e rodar ambos.

## Requisitos

- [Node.js](https://nodejs.org/) (versão 14.x ou superior)
- [MySQL](https://www.mysql.com/) (ou outro banco de dados conforme configurado)
 
## Configuração

### Configuração do MySQL com XAMPP

Para configurar e rodar o MySQL usando o XAMPP, siga os passos abaixo:

#### 1. Instale o XAMPP

- Baixe e instale o XAMPP a partir do [site oficial do XAMPP](https://www.apachefriends.org/index.html) para o seu sistema operacional.

#### 2. Inicie o XAMPP

- Abra o XAMPP Control Panel.

  - No Windows, você encontrará o XAMPP Control Panel no menu Iniciar ou no diretório de instalação do XAMPP.
  - No macOS, o XAMPP pode ser encontrado na pasta Aplicativos.

- Inicie o Apache e o MySQL clicando nos botões "Start" ao lado dos serviços Apache e MySQL.

#### 3. Acesse o phpMyAdmin

- Abra o navegador e vá para [http://localhost/phpmyadmin](http://localhost/phpmyadmin).

- Crie um banco de dados:

  1. Na interface do phpMyAdmin, clique na aba "Databases".
  2. No campo "Database name", digite o nome desejado para seu banco de dados, por exemplo, `db_user`.
  3. Clique em "Create".

#### 4. Configure a Conexão com o Banco de Dados

- No seu projeto**, navegue até o diretório `user-crud` e abra o arquivo `.env`.

- Atualize a variável `DATABASE_URL` com suas credenciais e detalhes do banco de dados:**

  ```env
  DATABASE_URL="mysql://root:password@localhost:3306/db_user"

### Backend

1. Navegue até o diretório do backend:

   ```bash
   cd user-crud
   ```
   
2. Instale as dependências:
   ```bash
   npm install
   ```
   
3. Crie um arquivo .env baseado no .env.example (ajuste as variáveis conforme necessário):
   ```bash
   cp .env.example .env
   ```

4. Configure o banco de dados no .env (substitua os valores com as informações corretas).

5. Rode as migrations:
   ```bash
   npx prisma migrate deploy
   ```

6. Inicie o servidor backend:
   ```bash
   npm run start
   ```

### Frontend

1. Navegue até o diretório do frontend:

   ```bash
   cd user-dashboard
   ```
   
2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor frontend:
   ```bash
   npm run dev
   ```

4. Abra seu navegador e vá para http://localhost:3000 para acessar o frontend. O backend estará acessível em http://localhost:3033 (ou outro endereço configurado).


## Licença

Este projeto está licenciado sob a MIT License.
