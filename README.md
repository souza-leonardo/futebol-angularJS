### Instalar dependências

Instalar as dependências do sistema utilizando o comando:

```sh
npm install
# ou
yarn
```

Pronto, agora é só abrir a pasta do projeto em sua IDE ou editor de texto favorito.

## Configuração

A configuração deve ser feita editando o arquivo ``app.config.js``. Você irá encontrá-lo em:

```text
app\
|-- js\
|----- config\
|------------ app.config.js
```

## Servidor local

Para rodar a aplicação em um servidor local na porta 8080 utilize o comando:

```sh
npm run server 8080
# ou
yarn run server 8080
```

> Dica: Para parar de rodar o servidor utilize `Ctrl+c`.

## Padrões de projeto

A versão que será minificada e irá para produção utilizará [ECMAScript 5][ecmascript-5-link], por isso, antes de enviar alguma alteração para o repositório rode o comando abaixo para verificar erros.

```sh
npm run tests
# ou
yarn run tests
```

[ecmascript-5-link]: https://www.ecma-international.org/ecma-262/5.1
