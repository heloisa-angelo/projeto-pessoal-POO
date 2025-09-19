class TabelaDeJogos {
  constructor() {
    this.jogos = [];
  }

  adicionarJogo(jogo) {
    this.jogos.push(jogo);
  }

  listarTodos() {
    return this.jogos;
  }

  listarPorModalidade(nomeModalidade) {
    return this.jogos.filter(jogo => jogo.modalidade.nome === nomeModalidade);
  }

  listarPorCidade(nomeCidade) {
    return this.jogos.filter(jogo =>
      jogo.cidade1.nome === nomeCidade || jogo.cidade2.nome === nomeCidade
    );
  }

  listarEmAndamento() {
    return this.jogos.filter(jogo => jogo.status === 'em andamento');
  }

  listarFinalizados() {
    return this.jogos.filter(jogo => jogo.status === 'finalizado');
  }
}

module.exports = TabelaDeJogos;
