class Controller {
  constructor(entidadeService) {
    this.entidadeService = entidadeService;
  }

    // pega todos os registros do modelo
  async pegaTodos(req, res) {
    try {
      const listaDeRetistros = await this.entidadeService.pegaTodosOsRegistros();
      return res.status(200).json(listaDeRetistros);
    } catch (erro) {
      return res.status(500).json({ erro: erro.message});
    }
  }

    // pega um registro do modelo pelo id passado na url
  async pegaUmPorId(req, res) {
    const { id } = req.params;
    try {
      const umRegistro = await this.entidadeService.pegaUmRegistroPorId(Number(id));
      return res.status(200).json(umRegistro);
    } catch (erro) {
      return res.status(500).json({ erro: erro.message});
    }
  }

    //cria um novo registro de um modelo pelo body
  async criaNovo(req, res){
    const dadosParaCriacao = req.body;
    try{
    const novoRegistroCriado = await this.entidadeService.criaRegistro(dadosParaCriacao);
    return res.status(200).json(novoRegistroCriado);
    } catch (erro){
      return res.status(500).json({ erro: erro.message});
    }
  }

  async atualiza(req, res) {
    const { id } = req.params;
    const dadosAtualizados = req.body;
    try {
      const foiAtualizdo = await this.entidadeService.atualizaRegistro(dadosAtualizados, Number(id));
      if(!foiAtualizdo) {
        return res.status(400).json('registro não foi atualizado')
      }
      return res.status(200).json('atualizado com sucesso')
    } catch (erro) {
      return res.status(500).json({ erro: erro.message});
    }
  }

    //exclui um registro pelo id
  async exclui(req , res) {
    const { id } = req.params;
    try{
      await this.entidadeService.excluiRegistro(Number(id));
      return res.status(200).json({mensagem: `id ${id} deletado`});
    } catch (error){
        return res.status(500).json({error: error.message});
    }
  }

}

module.exports = Controller;