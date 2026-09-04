const Controller = require('./Controller.js');
const CursoServices = require('../services/CursoServices.js');

//CursoServices recebe tudo que esta dentro da classe CursoServices
//ou seja, herda tudo que CursoServices herda
const cursoServices = new CursoServices();

//herda Controller para poder usar os metodos
//e passa CursoServices para poder usar no modelo Curso
class CursoController extends Controller {
    constructor() {
        super(cursoServices);
    }

}

module.exports = CursoController;