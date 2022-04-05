# Infnet - PB - Desenvolvimento Front-End
Projeto de Bloco da matéria de Desenvolvimento Front-End.

## Apresentação
Desenvolver um sistema de Apoio ao Turista. 
Trata-se de um sistema para auxiliar os turistas na localização de pontos importantes nas cidades que ele está visitando.

### Especificação dos Requisitos do Sistema de Apoio ao Turista

* Requisitos Funcionais

| ID | Descrição | Prioridade |
|----|-----------|------------|
| RF-001 |	O sistema deverá possuir um sistema de localização.	| Essencial |
| RF-002 |	O sistema deverá possuir módulo de autenticação para os usuários.	| Essencial |
| RF-003 |	O sistema deverá possuir botões de categoria.	| Essencial |
| RF-004 |	O usuário poderá acessar seu histórico de buscas realizadas.	| Essencial |
| RF-005 |	O usuário deverá ser capaz de avaliar e deixar comentários em locais visitados.	| Essencial |
| RF-006 |	O sistema deverá possuir uma ferramenta de busca por nome/tipo do local.	| Essencial |
| RF-007 |	O usuário deverá ser capaz de acessar o histórico de buscas realizadas.	| Essencial |
| RF-008 |  O sistema deverá possuir um filtro por faixa etária opcional.	| Essencial |
| RF-009 |  O usuário deverá ser capaz de escolher um ponto de partida ou utilizar sua localização atual.	| Essencial |
| RF-010 |  O usuário poderá trocar o idioma do sistema.	| Essencial |
| RF-011 |  O usuário poderá filtrar a busca pelo idioma falado no ambiente.	| Essencial |
| RF-012 |  O usuário poderá favoritar um local escolhido.	| Essencial |

* Requisitos Não funcionais

| ID | Descrição | Prioridade |
|----|-----------|------------| 
| NF-001 |	O sistema deverá utilizar APIs do TomTom Maps.	| Essencial |
| NF-002 |-  USABILIDADE	O sistema deverá ter uma interface capaz de funcionar em diferentes dispositivos, adequando o layout ao tamanho da tela.	| Essencial |
| NF-003 |- USABILIDADE	O sistema deverá possuir uma interface gráfica intuitiva.	| Essencial |
| NF-004 |- PERFORMANCE	O usuário poderá salvar seus dados de autenticação para próximos acessos.	| Essencial |
| NF-005 |	O sistema deverá ser desenvolvido em JavaScript, HTML, CSS, React.js e Node.js.	| Essencial |
| NF-006 |-  USABILIDADE	O sistema deverá utilizar banco de dados em nuvem.	| Essencial |
| NF-007 |- SEGURANÇA	O sistema deverá se adequar a LGPD e as boas práticas de Segurança da Informação.	| Essencial |
| NF-008 |- PERFORMANCE	O sistema deverá apresentar bom desempenho.	| Essencial |
| NF-008 |-PERFORMANCE	O sistema deverá estabelecer um limite de acessos simultâneos ao servidor.	| Essencial |


### Cenários


* __Cenário 1:__

__Cena representada:__
Marcação de rotas nos pontos turísticos mais bem avaliados.

__Atores envolvidos:__ 
Petra Holá (turista)

__Ação:__ 
Na primeira semana de carnaval, Petra Holá, nascida e moradora da Grécia quis conhecer o evento que ocorria no Brasil. Com anseio em conhecer mais a cidade do Rio de Janeiro, Petra alugou um carro, mas como sua viagem duraria apenas dois dias, ela queria filtrar os lugares em que ia visitar. Entrando no sistema de apoio ao turista, ela realiza o login e busca pelos pontos turísticos mais bem avaliados da região, escolhendo o mais próximo de seu local e traçando sua rota.

__User Stories:__

__User Story 1:__
Como uma turista
Eu gostaria de ranquear os pontos turísticos mais bem avaliados da cidade do Rio de Janeiro
Para que eu consiga aproveitar melhor a minha viagem.


__User Story 2:__
Como uma turista
Eu gostaria de que o sistema me mostra-se a rota de mais rápida para visitar os pontos turísticos ranqueados
Para que eu não perca tempo no deslocamento.


* __Cenário 2:__

__Cena representada:__
Marcação de rotas nos pontos turísticos mais bem avaliados.
O personagem se machuca e necessita encontrar o local mais próximo para ser tratado.

__Atores envolvidos:__ 
Beatriz Gonzáles (turista)

__Ação:__ 
Ao visitar a cidade de São Paulo, Beatriz Gonzáles moradora de Roraima, estava passeando pelas ruas da cidade, porem ao se distrair por um momento acabou tropeçando e se cortou ao cair, nada muito sério, mas Beatriz precisa tratar de seu ferimento. Como não havia ninguém por perto, ela acessou o sistema para encontrar o posto de saúde mais próximo. Ao receber uma sugestão de pedir um motorista particular dentro do sistema, Beatriz decide aceita-la e assim chegar ao hospital mais rapidamente.

__User Stories:__

__User Story 1:__

Como uma turista
Eu gostaria de localizar um hospital ou pronto socorro vazio.
Para que eu tenha um atendimento rápido.


__User Story 2:__
Como uma turista
Eu gostaria de receber uma sugestão de meios de transporte disponíveis. 
Para que não tenha que caminhar, caso possível.
<p></p>

