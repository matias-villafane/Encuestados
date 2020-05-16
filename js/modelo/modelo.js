/*
 * Modelo
 */
var Modelo = function () {
  this.preguntas = [];
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaEliminada = new Evento(this);
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

  actualizarPregunta: function (pregunta) {
    let index = obtenerIndicePregunta(pregunta.id);
    if (index != -1) {
      this.preguntas[index] = updatePregunta;
    }
  },

  votarPregunta: function (id, opcion) {
    let index = this.obtenerIndicePregunta(id)
    if (index != -1) {
      this.preguntas[index].respuestas
    }
  },
  //pregunta = {'texto': unTexto, 'id': id, 'cantidadPorRespuesta': respuestas}
  //respuesta = {'textoRespuesta': respuesta, 'cantidad': cantVotos}
  obtenerIndicePregunta: function (id) {
    return this.preguntas.findIndex(itemPregunta => itemPregunta.id === id);
  },

  //se guardan las preguntas
  guardar: function () {
  },
};
