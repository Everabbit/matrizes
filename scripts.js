document.addEventListener('DOMContentLoaded', function () {
    const formOperacoes = document.getElementById('form-operacoes');
    const formConfiguracaoMatriz = document.getElementById('form-configuracao-matriz');
    const formConfiguracaoMatriz2 = document.getElementById('form-configuracao-matriz2');
    const matriz1Div = document.getElementById('matriz1-div');
    const matriz2Div = document.getElementById('matriz2-div');
    const matriz2Config = document.getElementById('matriz2-config');
    const executarOperacaoBtn = document.getElementById('executar-operacao');
    const resultadoOperacaoDiv = document.getElementById('resultado-operacao');
    let matriz1 = [];
    let matriz2 = [];
    let operacao = '';

    document.getElementById('configurar-matriz').addEventListener('click', function () {
        const selectedOperacao = document.getElementById('operacao').value;
        matriz1Div.innerHTML = ''
        matriz2Div.innerHTML = ''
        resultadoOperacaoDiv.innerHTML = ''
        executarOperacaoBtn.classList.add('hidden');
        if (!selectedOperacao) {
            alert('Selecione uma operação!');
            return;
        }
        operacao = selectedOperacao;
        if (['adicao', 'subtracao', 'multiplicacao'].includes(operacao)) {
            matriz2Config.classList.remove('hidden');
        } else {
            matriz2Config.classList.add('hidden');
        }
        document.getElementById('configuracao-matriz-div').classList.remove('hidden');
    });

    formConfiguracaoMatriz.addEventListener('submit', function (event) {
        event.preventDefault();
        const linhas = parseInt(document.getElementById('linhas').value);
        const colunas = parseInt(document.getElementById('colunas').value);
        gerarMatriz1(linhas, colunas);
        if (['adicao', 'subtracao', 'multiplicacao'].includes(operacao)) {
            matriz2Config.classList.remove('hidden');
        } else {
            matriz2Config.classList.add('hidden');
            executarOperacaoBtn.classList.remove('hidden');
        }
    });

    formConfiguracaoMatriz2.addEventListener('submit', function (event) {
        event.preventDefault();
        const linhas2 = parseInt(document.getElementById('linhas2').value);
        const colunas2 = parseInt(document.getElementById('colunas2').value);
        gerarMatriz2(linhas2, colunas2);
    });

    executarOperacaoBtn.addEventListener('click', function () {
        realizarOperacao(matriz1, matriz2, operacao);
    });

    function gerarMatriz1(linhas, colunas) {
        const tri_1S = document.getElementById('tri_1S').checked
        const tri_1I = document.getElementById('tri_1I').checked
        matriz1 = criarMatriz(linhas, colunas, 'matriz1', tri_1S, tri_1I);
        matriz1Div.innerHTML =  '<p>1</p>'+gerarMatrizHTML(matriz1, 'matriz1');
        matriz1Div.classList.remove('hidden');
    }

    function gerarMatriz2(linhas, colunas) {
        const tri_2S = document.getElementById('tri_2S').checked
        const tri_2I = document.getElementById('tri_2I').checked
        matriz2 = criarMatriz(linhas, colunas, 'matriz2', tri_2S, tri_2I);
        matriz2Div.innerHTML = '<p>2</p>'+gerarMatrizHTML(matriz2, 'matriz2');
        matriz2Div.classList.remove('hidden');
        executarOperacaoBtn.classList.remove('hidden');
    }

    function criarMatriz(linhas, colunas, idPrefix, tri_s, tri_i) {
        let matriz = [];
        for (let i = 0; i < linhas; i++) {
            let linha = [];
            for (let j = 0; j < colunas; j++) {
                let rand = Math.ceil(Math.random()*10);
                if (tri_s && j <= i){
                    linha.push(rand);
                }
                else if (tri_i && j >= i){
                    linha.push(rand);
                }
                else {
                    linha.push(0)
                }

            }
            matriz.push(linha);
        }
        return matriz;
    }

    
    function gerarMatrizHTML(matriz, idPrefix) {
        let matrizHTML = '<table>';
        matriz.forEach((linha, i) => {
            matrizHTML += '<tr>';
            linha.forEach((_, j) => {
                matrizHTML += `<td><input type="number" id="${idPrefix}-${i}-${j}" value="${matriz[i][j]}" oninput="atualizarValor('${idPrefix}', ${i}, ${j}, this.value)"></td>`;
            });
            matrizHTML += '</tr>';
        });
        matrizHTML += '</table>';
        return matrizHTML;
    }

    window.atualizarValor = function (idPrefix, i, j, valor) {
        if (idPrefix === 'matriz1') {
            matriz1[i][j] = parseInt(valor);
        } else {
            matriz2[i][j] = parseInt(valor);
        }
    };

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
                matriz2Div.classList.add('hidden'); // Oculta a matriz 2
                break;
            case 'identidade':
                const tamanho = matriz1.length;
                resultado = gerarMatrizIdentidade(tamanho);
                matriz2Div.classList.add('hidden'); // Oculta a matriz 2
                break;
            case 'inversa':
                resultado = inverterMatriz(matriz1);
                matriz2Div.classList.add('hidden'); // Oculta a matriz 2
                break;
            default:
                resultado = 'Operação não reconhecida';
        }
        exibirResultado(resultado);
    }

    function adicionarMatrizes(matriz1, matriz2) {
        if (matriz1.length !== matriz2.length || matriz1[0].length !== matriz2[0].length) {
            return 'Matrizes de tamanhos diferentes';
        }
        return matriz1.map((linha, i) =>
            linha.map((elemento, j) => elemento + matriz2[i][j])
    );
}
    function subtrairMatrizes(matriz1, matriz2) {
        if (matriz1.length !== matriz2.length || matriz1[0].length !== matriz2[0].length) {
            return 'Matrizes de tamanhos diferentes';
        }
        return matriz1.map((linha, i) =>
            linha.map((elemento, j) => elemento - matriz2[i][j])
        );
    }
    
    function multiplicarMatrizes(matriz1, matriz2) {
        if (matriz1[0].length !== matriz2.length) {
            return 'Número de colunas da primeira matriz deve ser igual ao número de linhas da segunda matriz';
        }
        const resultado = [];
        for (let i = 0; i < matriz1.length; i++) {
            resultado[i] = [];
            for (let j = 0; j < matriz2[0].length; j++) {
                let soma = 0;
                for (let k = 0; k < matriz1[0].length; k++) {
                    soma += matriz1[i][k] * matriz2[k][j];
                }
                resultado[i][j] = soma;
            }
        }
        return resultado;
    }
    
    function transporMatriz(matriz) {
        return matriz[0].map((_, colIndex) => matriz.map(row => row[colIndex]));
    }
    
    function gerarMatrizIdentidade(tamanho) {
        const identidade = [];
        for (let i = 0; i < tamanho; i++) {
            identidade[i] = [];
            for (let j = 0; j < tamanho; j++) {
                identidade[i][j] = i === j ? 1 : 0;
            }
        }
        return identidade;
    }
    
    function inverterMatriz(matriz) {
        const det = determinante(matriz);
        if (det === 0) {
            return 'Matriz singular não pode ser invertida';
        }
        if (det === null) {
            return 'Somente Matriz quadrada pode ser invertida';
        }
        const adjunta = adjuntaMatriz(matriz);
        return adjunta.map(linha => linha.map(elemento => elemento / det));
    }
    
    function determinante(matriz) {
        if (matriz.length !== matriz[0].length) {
            return null;
        }
        if (matriz.length === 2) {
            return matriz[0][0] * matriz[1][1] - matriz[0][1] * matriz[1][0];
        }
        let det = 0;
        for (let i = 0; i < matriz.length; i++) {
            det += ((i % 2 === 0 ? 1 : -1) * matriz[0][i] * determinante(minor(matriz, 0, i)));
        }
        return det;
    }
    
    function minor(matriz, linha, coluna) {
        return matriz.filter((_, i) => i !== linha).map(l => l.filter((_, j) => j !== coluna));
    }
    
    function adjuntaMatriz(matriz) {
        const cofatores = matriz.map((linha, i) =>
            linha.map((_, j) => ((i + j) % 2 === 0 ? 1 : -1) * determinante(minor(matriz, i, j)))
        );
        return transporMatriz(cofatores);
    }
    
    function exibirResultado(resultado) {
        let resultadoHTML = '';
    
        if (Array.isArray(resultado)) {
            resultadoHTML = '<table>';
            resultado.forEach(linha => {
                resultadoHTML += '<tr>';
                linha.forEach(elemento => {
                    resultadoHTML += `<td>${elemento}</td>`;
                });
                resultadoHTML += '</tr>';
            });
            resultadoHTML += '</table>';
        } else {
            resultadoHTML = resultado;
        }
    
        resultadoOperacaoDiv.innerHTML = "="+ resultadoHTML;
    }
});