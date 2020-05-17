/*
 * Modelo
 */
var Modelo = function () {
  this.preguntas = JSON.parse(localStorage.getItem('preguntas')) || [];
  //this.preguntas = strPreguntas;
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaEliminada = new Evento(this);
  this.preguntaActualizada = new Evento(this);
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function () {
    let lastItem = this.preguntas.length;
    if (!lastItem || lastItem <= 0) {
      return 0;
    }
    return this.preguntas[lastItem - 1].id;
  },

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function (nombre, respuestas) {
    let id = this.obtenerUltimoId();
    id++;
    let nuevaPregunta = { 'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas };
    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregada.notificar();
  },

  eliminarPregunta: function (id) {
    this.preguntas = this.preguntas.filter(pregunta => pregunta.id != id);
    this.guardar();
    this.preguntaEliminada.notificar();
  },

  actualizarPregunta: function (id, pregunta) {
    let index = this.obtenerIndicePregunta(id);
    if (index != -1) {
      this.preguntas[index].textoPregunta = pregunta;
    }
    this.guardar();
    this.preguntaActualizada.notificar();
  },

  borrarTodasPreguntas: function() {
    this.preguntas = [];
    this.guardar();
    this.preguntaEliminada.notificar();
  },

  agregarVoto: function (id, nombrePregunta, respuestaSeleccionada) {
    let index = this.obtenerIndicePregunta(id)
    if (index != -1) {
      for (let i = 0; i < this.preguntas[index].cantidadPorRespuesta.length; i++){
        if (this.preguntas[index].cantidadPorRespuesta[i].textoRespuesta == respuestaSeleccionada){
          this.preguntas[index].cantidadPorRespuesta[i].cantidad++;
        }
      }
    }
    this.guardar()
  },

  obtenerIndicePregunta: function (id) {
    return this.preguntas.findIndex(itemPregunta => itemPregunta.id == id);
  },

  //se guardan las preguntas
  guardar: function () {
    let strPreguntas = JSON.stringify(this.preguntas);
    localStorage.setItem('preguntas', strPreguntas);
  },
};
