const express = require('express');
const pessoas  = require('./pessoasRoute');
const categorias  = require('./categoriasRoute');
const cursos  = require('./cursosRoute');
//const matriculas  = require('./matriculasRoute');


module.exports = app => {
    app.use(
        express.json(),
        pessoas,
        categorias,
        cursos,
       // matriculas,
    );
};