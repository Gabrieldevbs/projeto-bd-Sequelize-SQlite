const { Router } = require('express');
const PessoaController = require('../controllers/PessoaController.js');
const MatriculaController = require('../controllers/MatriculaController.js');
const CursoController = require('../controllers/CursoController.js');

const pessoaController = new PessoaController();
const matriculaController = new MatriculaController();
const cursoController = new CursoController();

const router = Router();


router.get('/pessoas', (req, res) => pessoaController.pegaTodos(req, res)); //pega todas as pessoas ativas
router.get('/pessoas/todos', (req, res) => pessoaController.pegaTodasAsPessoas(req, res)); //pega todas as pessoas
router.get('/pessoas/:id', (req, res) => pessoaController.pegaUmPorId(req, res)); //pega uma pessoa por id
router.post('/pessoas', (req, res) => pessoaController.criaNovo(req, res)); //adiciona pessoa
router.put('/pessoas/:id', (req, res) => pessoaController.atualiza(req, res)); //modifica pessoa
router.delete('/pessoas/:id', (req, res) => pessoaController.exclui(req, res)); //deleta pessoa
router.get('/matriculas', (req, res) => matriculaController.pegaTodos(req, res)); //pega todas as matriculas
router.get('/pessoas/:estudanteId/matriculas', (req, res) => pessoaController.pegaMatriculas(req, res)); //pega todas as matriculas de um estudante por id
router.post('/matriculas/:estudanteID', (req, res) => matriculaController.criaNovo(req, res)); //adiciona nova matricula
router.get('/pessoas/:docenteId/cursos', (req, res) => pessoaController.pegaCursos(req, res)); //pega cursos por docente id


module.exports = router;