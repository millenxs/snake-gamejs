# Jogo Snake com Gradiente de Arco-Íris e Recursos Românticos

Este projeto é uma versão personalizada do clássico jogo Snake. A cobra possui um gradiente de arco-íris, e a cada coração comido, a cobra aumenta de tamanho e adiciona novas cores. Além disso, há recursos românticos, como um card com frases exibido ao clicar em um botão e um pop-up de "Game Over" ao final do jogo.

## Tecnologias Utilizadas

- **HTML5**: Para a estrutura do jogo e elementos da página.
- **CSS3**: Para o estilo e design dos elementos, incluindo o fundo do jogo e os botões.
- **JavaScript**: Para a lógica do jogo, movimentação da cobra, detecção de colisão e exibição de elementos interativos.

## Funcionalidades

1. **Jogo Snake**: 
   - Cobra com gradiente de arco-íris que aumenta de tamanho ao comer corações.
   - Controle da cobra com as setas do teclado.
   - Detecção de colisão com paredes, resultando em "Game Over".

2. **Cartão de Mensagem**:
   - Botão para abrir um card com conteúdo aleatório (textos diversos).
   - Conteúdo aleatório exibido ao clicar no botão.

3. **Pop-up de Game Over**:
   - Exibição de um pop-up com "Game Over" quando a cobra bate na parede.
   - Botão para reiniciar o jogo.

4. **Integração com Spotify**:
   - Playlist do Spotify embutida ao lado do jogo.

## Estrutura do Projeto

- **index.html**: Estrutura principal do HTML.
- **styles.css**: Estilos e design dos elementos.
- **script.js**: Lógica do jogo e interatividade.

## Como Executar o Projeto

1. Clone o repositório para sua máquina local:
    ```bash
    git clone https://github.com/seu-usuario/nome-do-repositorio.git
    ```

2. Navegue até o diretório do projeto:
    ```bash
    cd nome-do-repositorio
    ```

3. Abra o arquivo `index.html` em seu navegador preferido.

## Explicação do Código

### HTML (index.html)

Estrutura básica do HTML, incluindo o canvas para o jogo, botões para interatividade e contêineres para o cartão romântico e o pop-up de game over.

### CSS (styles.css)

Estiliza os elementos do jogo e os contêineres. Destaca-se a alteração da cor de fundo do canvas para azul claro.

### JavaScript (script.js)

Contém a lógica do jogo, incluindo:
- **generateRainbowColors**: Gera cores vibrantes do arco-íris com gradiente que termina em branco.
- **gameLoop**: Controla o loop do jogo.
- **clearCanvas**: Limpa o canvas a cada frame.
- **drawSnake**: Desenha a cobra com gradiente de arco-íris.
- **advanceSnake**: Atualiza a posição da cobra e detecta colisões.
- **changeDirection**: Altera a direção da cobra com base nas teclas pressionadas.
- **drawFood**: Desenha corações no canvas como alimento para a cobra.
- **getRandomFoodPosition**: Gera posições aleatórias para o alimento.
- **didGameEnd**: Verifica se a cobra colidiu com paredes ou com ela mesma.
- **showRandomCard**: Exibe o card com conteúdo aleatório.
- **showGameOverCard**: Exibe o pop-up de game over.
- **restartGame**: Reinicia o jogo.

## Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.
