const Controller = require('./Controller.js');
const PessoaServices = require('../services/PessoaServices.js');

//pessoaServices recebe tudo que esta dentro da classe PessoaServices
//ou seja, herda tudo que PessoaServices herda
const pessoaServices = new PessoaServices();

//herda Controller para poder usar os metodos
//e passa pessoaServices para poder usar no modelo Pessoa
class PessoaController extends Controller {
    constructor() {
        super(pessoaServices);
    }

    async pegaMatriculas(req, res){
     const {estudanteId} = req.params;
        try{
            const listaMatriculas = await pessoaServices.pegaMatriculasPorEstudante(Number(estudanteId));
            return res.status(200).json(listaMatriculas);
        }catch (error){
            //erro
        }
    }

    async pegaCursos(req, res){
     const {docenteId} = req.params;
        try{
            const listaCursos = await pessoaServices.pegaCursosPorDocente(Number(docenteId));
            return res.status(200).json(listaCursos);
        }catch (error){
            //erro
        }
    }

    async pegaTodasAsPessoas(req, res){
        try{
            const listaDePessoas = await pessoaServices.pegaPessoasEscopoTodos();
            return res.status(200).json(listaDePessoas);
        }catch (erro){
            return res.status(500).json({erro: erro.message});
        }   
}   }

module.exports = PessoaController;