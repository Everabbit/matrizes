### README - Operações com Matrizes

#### Visão Geral

Este projeto permite realizar diversas operações com matrizes, como adição, subtração, multiplicação, transposição, identidade e inversão. A interface é construída com HTML, estilizada com CSS e a lógica de funcionamento é implementada em JavaScript.

#### Estrutura dos Arquivos

- **index.html**: Contém a estrutura básica do site.
- **styles.css**: Responsável pela estilização do site.
- **scripts.js**: Contém a lógica de manipulação de matrizes e a interação do usuário.

---

### index.html

O arquivo HTML define a estrutura do layout, que é composto por um título, formulários para configuração das matrizes, e as áreas onde as matrizes e os resultados das operações serão exibidos.

#### Principais Elementos:

- `<div class="container">`: Contém todos os elementos da página.
- `<div class="forms">`: Abriga os formulários para escolha de operação e configuração das matrizes.
- `<div class="matrizes">`: Contém as divs que exibem as matrizes e o resultado da operação.

#### Código Importante:

```html
<select id="operacao" name="operacao">
    <option value="adicao">Adição</option>
    <option value="subtracao">Subtração</option>
    <option value="multiplicacao">Multiplicação</option>
    <option value="transposta">Transposta</option>
    <option value="identidade">Identidade</option>
    <option value="inversa">Inversa</option>
</select>
<button type="button" id="configurar-matriz">Configurar Matrizes</button>
```

---

### styles.css

Este arquivo define a aparência da página, garantindo que todos os elementos estejam bem posicionados e estilizados.

#### Principais Estilos:

- **Container e Layout**:
  ```css
  .container {
      padding: 2vw;
      display: flex;
      flex-direction: row;
      width: 100%;
      height: 80%;
      align-items: center;
  }
  .forms {
      display: flex;
      flex-direction: column;
      width: 30%;
  }
  .matrizes {
      display: flex;
      justify-content: space-around;
      width: 70%;
  }
  ```
- **Botões e Inputs**:
  ```css
  button {
      margin: 0.5em 0;
      padding: 0.5em 1em;
      background-color: #333;
      color: white;
      border: none;
      cursor: pointer;
  }
  input[type="number"] {
      width: 50px;
  }
  ```

---

### scripts.js

O arquivo JavaScript gerencia a lógica de criação e manipulação de matrizes, e a execução das operações selecionadas pelo usuário.

#### Funções Importantes:

- **Gerar Matriz**:
  ```javascript
  function gerarMatriz1(linhas, colunas) {
      matriz1 = criarMatriz(linhas, colunas, 'matriz1');
      matriz1Div.innerHTML = gerarMatrizHTML(matriz1, 'matriz1');
      matriz1Div.classList.remove('hidden');
  }

  function gerarMatriz2(linhas, colunas) {
      matriz2 = criarMatriz(linhas, colunas, 'matriz2');
      matriz2Div.innerHTML = gerarMatrizHTML(matriz2, 'matriz2');
      matriz2Div.classList.remove('hidden');
      executarOperacaoBtn.classList.remove('hidden');
  }
  ```

- **Operações com Matrizes**:
  ```javascript
  function realizarOperacao(matriz1, matriz2, operacao) {
      let resultado;
      switch (operacao) {
          case 'adicao':
              resultado = adicionarMatrizes(matriz1, matriz2);
              break;
          case 'subtracao':
              resultado = subtrairMatrizes(matriz1, matriz2);
              break;
          case 'multiplicacao':
              resultado = multiplicarMatrizes(matriz1, matriz2);
              break;
          case 'transposta':
              resultado = transporMatriz(matriz1);
              break;
          case 'identidade':
              resultado = gerarMatrizIdentidade(matriz1.length);
              break;
          case 'inversa':
              resultado = inverterMatriz(matriz1);
              break;
          default:
              resultado = 'Operação não reconhecida';
      }
      exibirResultado(resultado);
  }
  ```

- **Função de Criação de Matrizes**:
  ```javascript
  function criarMatriz(linhas, colunas, idPrefix) {
      let matriz = [];
      for (let i = 0; i < linhas; i++) {
          let linha = [];
          for (let j = 0; j < colunas; j++) {
              linha.push(0);
          }
          matriz.push(linha);
      }
      return matriz;
  }
  ```

---

### Utilização

1. **Escolha a Operação**:
   - Selecione a operação desejada no menu dropdown.
   - Clique em "Configurar Matrizes".

2. **Configure as Matrizes**:
   - Defina o número de linhas e colunas para a primeira matriz e, se necessário, para a segunda matriz.
   - Clique em "Gerar Matriz".

3. **Execute a Operação**:
   - Preencha os valores das matrizes.
   - Clique em "Executar Operação" para ver o resultado.

Agora você tem um guia completo sobre o funcionamento do seu projeto de operações com matrizes. Se precisar de mais alguma coisa, é só avisar!