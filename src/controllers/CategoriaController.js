const Controller = require('./Controller.js');
const CategoriaServices = require('../services/CategoriaServices.js');

//CategoriaServices recebe tudo que esta dentro da classe CategoriaServices
//ou seja, herda tudo que CategoriaServices herda
const categoriaServices = new CategoriaServices();

//herda Controller para poder usar os metodos
//e passa CategoriaServices para poder usar no modelo Categoria
class CategoriaController extends Controller {
    constructor() {
        super(categoriaServices);
    }
}

module.exports = CategoriaController;