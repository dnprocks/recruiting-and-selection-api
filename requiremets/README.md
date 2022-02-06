# Do at Home - Back-End

Projeto de avaliação técnica para fazer assíncrono em casa.

## Problema

Para o desenvolvimento do projeto temos que fazer um sistema para uma empresa cujo domínio pertence ao contexto de RH. Por ser um domínio muito grande vamos focar apenas no subdomínio de Recrutamento e Seleção (R&S).

### Contexto

O contexto de Recrutamento e Seleção é bem amplo, então vamos focar nos seguintes fluxos de negócio:

- Pessoas candidatas conseguirem criar uma conta nova
- Criar novas vagas
- Publicar vagas já criadas
- Pessoas candidatas cadastradas se aplicarem em vagas publicadas
- Listar todas as vagas com suas aplicações e informações sobre a mesma

Podemos representar tais fluxos à seguir:

![Representação dos fluxos de negócios](/assets/img/diagram.jpg)

## Dados da API

Todas as requisições serão prefixadas com o seguinte endereço: `http://localhost:8080/api/v1`.

### Pessoa candidata

Operações realizadas pela pessoa candidata.

| Descrição                         | Verbo  | Endereço                   | Body                                                |
| --------------------------------- | ------ | -------------------------- | --------------------------------------------------- |
| Criar uma nova conta              | `POST` | `/accounts/create-account` | `{ name: String, email: String, password: String }` |
| Se aplica para uma vaga existente | `POST` | `/jobs/apply/{jobId}`      | `{ accountId: Number }`                             |

### Pessoa entrevistadora

Operações realizadas pela pessoa entrevistadora.

| Descrição                      | Verbo | Endereço                          | Body |
| ------------------------------ | ----- | --------------------------------- | ---- |
| Visualiza aplicações nas vagas | `GET` | `/jobs/view-applications/{jobId}` |

### Pessoa recrutadora

Operações realizadas pela pessoa recrutadora.

| Descrição                   | Verbo   | Endereço                    | Body               |
| --------------------------- | ------- | --------------------------- | ------------------ |
| Publicar uma vaga existente | `PATCH` | `/jobs/publish-job/{jobId}` |
| Criar uma vaga nova         | `POST`  | `/jobs/create-job`          | `{ name: String }` |
| Lista todas as vagas        | `GET`   | `/jobs/list-all-jobs`       |

Caso a pessoa utilize o _software_ Insomnia, ela pode utilizar [esse arquivo](https://github.com/gupy-io/simple-api-interview/blob/main/insomnia.json) para importar as requisições já montadas e definidas.

## Front-End

Para que você não precise desenvolver e criar a aplicação _web_, [vamos disponibilizá-la](https://github.com/gupy-io/simple-app-web-interview) (você precisa baixá-la e subí-la local) onde para cada operação de negócio haverá um fluxo à ser executado.

## Retorno

O retorno deve ser feito através do Github, você pode criar um repositório com o resultado final e compartilhar o link com a gente para que durante a próxima etapa podemos falar sobre o mesmo.
