/*
 * Controlador
 */
var Controlador = function (modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function (pregunta, respuestas) {
    this.modelo.agregarPregunta(pregunta, respuestas);
  },
  eliminarPregunta: function (id) {
    this.modelo.eliminarPregunta(id);
  },
  actualizarPregunta: function (id, pregunta){
    this.modelo.actualizarPregunta(id,pregunta);
  },
  borrarTodasPreguntas: function (){
    this.modelo.borrarTodasPreguntas();
  },
  agregarVoto: function (id,nombrePregunta, respuestaSeleccionada){
    this.modelo.agregarVoto(id,nombrePregunta, respuestaSeleccionada);
  }
};  
