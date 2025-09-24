const prompt = require('prompt-sync')({ sigint: true });

const Cidade = require('./class/Cidade');
const Modalidade = require('./class/Modalidade');
const Jogo = require('./class/Jogo');
const TabelaDeJogos = require('./class/TabelaDeJogos');

const tabela = new TabelaDeJogos();

const cidades = [];
const modalidades = [];

function criarCidades() {
  const n = parseInt(prompt('Quantas cidades participarão? '));
  for (let i = 0; i < n; i++) {
    const nome = prompt(`Nome da cidade ${i + 1}: `);
    cidades.push(new Cidade(nome));
  }
}

function criarModalidades() {
  const n = parseInt(prompt('Quantas modalidades serão? '));
  for (let i = 0; i < n; i++) {
    const nome = prompt(`Nome da modalidade ${i + 1}: `);
    modalidades.push(new Modalidade(nome));
  }
}

function criarJogos() {
  const n = parseInt(prompt('Quantos jogos deseja cadastrar? '));
  for (let i = 0; i < n; i++) {
    console.log(`\n--- Jogo ${i + 1} ---`);
    
    console.log('Cidades disponíveis:');
    cidades.forEach((c, idx) => console.log(`${idx}: ${c.nome}`));
    const idxCidade1 = parseInt(prompt('Índice da primeira cidade: '));
    const idxCidade2 = parseInt(prompt('Índice da segunda cidade: '));
    if (idxCidade1 === idxCidade2) {
      console.log('Erro: As cidades devem ser diferentes.');
      i--;
      continue;
    }
    console.log('Modalidades disponíveis:');
    modalidades.forEach((m, idx) => console.log(`${idx}: ${m.nome}`));
    const idxModalidade = parseInt(prompt('Índice da modalidade: '));

    const dataHora = prompt('Data e hora do jogo (YYYY-MM-DD HH:mm): ');
    const dataHoraISO = dataHora.replace(' ', 'T') + ':00';

    const jogo = new Jogo(cidades[idxCidade1], cidades[idxCidade2], modalidades[idxModalidade], dataHoraISO);
    tabela.adicionarJogo(jogo);
    console.log('Jogo cadastrado!');
  }
}

function atualizarJogos() {
  tabela.listarTodos().forEach((jogo, idx) => {
    console.log(`\nJogo ${idx}: ${jogo.cidade1.nome} x ${jogo.cidade2.nome} - Status: ${jogo.status}`);
  });

  let escolha = prompt('\nDeseja iniciar ou finalizar algum jogo? (iniciar/finalizar/nenhum) ');
  while (escolha === 'iniciar' || escolha === 'finalizar') {
    const idx = parseInt(prompt('Índice do jogo: '));
    if (idx < 0 || idx >= tabela.listarTodos().length) {
      console.log('Índice inválido.');
    } else {
      const jogo = tabela.listarTodos()[idx];
      if (escolha === 'iniciar') {
        jogo.iniciarJogo();
        console.log('Jogo iniciado!');
      } else if (escolha === 'finalizar') {
        const placar1 = parseInt(prompt(`Placar ${jogo.cidade1.nome}: `));
        const placar2 = parseInt(prompt(`Placar ${jogo.cidade2.nome}: `));
        jogo.finalizarJogo(placar1, placar2);
        console.log('Jogo finalizado!');
      }
    }
    escolha = prompt('\nDeseja iniciar ou finalizar algum jogo? (iniciar/finalizar/nenhum) ');
  }
}

function mostrarJogos() {
  console.log('\n=== Jogos Cadastrados ===');

  tabela.listarTodos().forEach((jogo, idx) => {
    console.log(`Jogo ${idx}: ${jogo.cidade1.nome} x ${jogo.cidade2.nome}`);
    console.log(`Modalidade: ${jogo.modalidade.nome}`);
    console.log(`Data/Hora: ${jogo.dataHora.toLocaleString()}`);
    console.log(`Status: ${jogo.status}`);
    if (jogo.status === 'finalizado') {
      console.log(`Placar: ${jogo.placarCidade1} x ${jogo.placarCidade2}`);
      console.log(`Vencedor: ${jogo.getVencedor()?.nome ?? 'Empate'}`);
    }
    console.log('---------------------');
  });
}

function main() {
  criarCidades();
  criarModalidades();
  criarJogos();
  atualizarJogos();
  mostrarJogos();
}

main();

