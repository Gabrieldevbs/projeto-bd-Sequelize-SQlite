const Controller = require('./Controller.js');
const MatriculaServices = require('../services/MatriculaServices.js');

//MatriculaServices recebe tudo que esta dentro da classe MatriculaServices
//ou seja, herda tudo que MatriculaServices herda
const matriculaServices = new MatriculaServices();

//herda Controller para poder usar os metodos
//e passa MatriculaServices para poder usar no modelo Matricula
class MatriculaController extends Controller {
    constructor() {
        super(matriculaServices);
    }
}

module.exports = MatriculaController;