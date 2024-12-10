<!-- SETUP INICIAL -->

1 - Instalar as dependencias: 
  - npm install --save @prisma/client express cors zod 
  - npm install --save-dev @types/node @types/express @types/cors typescript tsx prisma

2 - Configurar os scripts e o server: 
  - "build": "tsc",
  - "dev": "tsx watch src/server.ts",
  - "start": "node build/server.js"

3 - Criar o router.ts e pasta de error e middleware:
  - Crie a rota para os primeiros testes, logo em seguida crie também uma pasta de error e middlware
  - A pasta de error irá ter um arquivo que com uma classe para errors/HttpError
  - O arquivo middleware/error-handler.ts irá tratar os erros chamando a classe HttpError  
 
<!-- CRIANDO SCHEMA -->
1 - Inicie utilizando o npx prisma
  - Dê o comando npx prisma init --datasource-provider postgresql
  - Logo em seguida crie seu banco de dados(pode ser pelo Beekeeper) e substitua os valores de nome e senha na URL do arquivo .env

2 - Crie as tabelas:
  - Utilize  o drawio para criar um fluxograma onde facilita a criação da estrutura das tabelas
  - Repasse para o schema.prisma e insira os tipos de dados nas tabelas

3 - Migre as alterações:
  - Dê o comando npx prisma migrate dev para que essas tabelas criadas sejam enviadas para o banco de dados