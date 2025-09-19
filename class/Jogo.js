class Jogo {
  constructor(cidade1, cidade2, modalidade, dataHora) {
    this.cidade1 = cidade1;
    this.cidade2 = cidade2;
    this.modalidade = modalidade;
    this.dataHora = new Date(dataHora);
    this.placarCidade1 = null;
    this.placarCidade2 = null;
    this.status = 'agendado'; // "agendado", "em andamento", "finalizado"
  }

  iniciarJogo() {
    this.status = 'em andamento';
  }

  finalizarJogo(placar1, placar2) {
    this.placarCidade1 = placar1;
    this.placarCidade2 = placar2;
    this.status = 'finalizado';
  }

  getVencedor() {
    if (this.status !== 'finalizado') return null;
    if (this.placarCidade1 > this.placarCidade2) return this.cidade1;
    if (this.placarCidade2 > this.placarCidade1) return this.cidade2;
    return 'Empate';
  }
}

module.exports = Jogo;
