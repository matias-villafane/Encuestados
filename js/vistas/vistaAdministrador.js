/*
 * Vista administrador
 */
var VistaAdministrador = function (modelo, controlador, elementos) {
  this.modelo = modelo;
  this.controlador = controlador;
  this.elementos = elementos;
  var contexto = this;

  // suscripción de observadores
  this.modelo.preguntaAgregada.suscribir(function () {
    contexto.reconstruirLista();
  });
  // esto es codigo duplicado, ya que la suscripcion anterior 
  // puede notificar cualquier cambio al array de preguntas
  this.modelo.preguntaEliminada.suscribir(function () {
    contexto.reconstruirLista();
  });

  this.modelo.preguntaActualizada.suscribir(function () {
    contexto.reconstruirLista();
  });

  this.modelo.borrarPreguntas.suscribir(function () {
    contexto.reconstruirLista();
  });
};


VistaAdministrador.prototype = {
  //lista
  inicializar: function () {
    //llamar a los metodos para reconstruir la lista, configurar botones y validar formularios
    validacionDeFormulario();
    this.reconstruirLista();
    this.configuracionDeBotones();
  },

  construirElementoPregunta: function (pregunta) {
    //let contexto = this;
    let nuevoItem;
    //completar
    //asignar a nuevoitem un elemento li con clase "list-group-item", id "pregunta.id" y texto "pregunta.textoPregunta"
    nuevoItem = document.createElement('li');
    $(nuevoItem).addClass('list-group-item');
    $(nuevoItem).attr('id', pregunta.id);
    $(nuevoItem).html($('.d-flex').html());
    //---------------------
    let interiorItem = $(nuevoItem);
    let titulo = interiorItem.find('h5');
    titulo.text(pregunta.textoPregunta);

    interiorItem.find('small').text(pregunta.cantidadPorRespuesta.map(function (resp) {
      return " " + resp.textoRespuesta;
    }));
    return nuevoItem;
  },

  reconstruirLista: function () {
    var lista = this.elementos.lista;
    lista.html('');
    var preguntas = this.modelo.preguntas;
    for (var i = 0; i < preguntas.length; ++i) {
      lista.append(this.construirElementoPregunta(preguntas[i]));
    }
  },

  configuracionDeBotones: function () {
    var e = this.elementos;
    var contexto = this;

    //asociacion de eventos a boton
    e.botonAgregarPregunta.click(function () {
      var value = e.pregunta.val();
      var respuestas = [];
      //pregunta = {'texto': unTexto, 'id': id, 'cantidadPorRespuesta': respuestas}
      //respuesta = {'textoRespuesta': respuesta, 'cantidad': cantVotos}
      $('[name="option[]"]').each(function () {
        //completar
        if ($(this).val() != '') {
          respuestas.push({ textoRespuesta: $(this).val(), cantidad: 0 });
        }
      });
      contexto.limpiarFormulario();
      contexto.controlador.agregarPregunta(value, respuestas);
    });
    //asociar el resto de los botones a eventos
    e.botonBorrarPregunta.click(function () {
      let id = parseInt($('.list-group-item.active').attr('id'));
      contexto.limpiarFormulario();
      contexto.controlador.eliminarPregunta(id);
    });
    e.botonEditarPregunta.click(function () {
      let id = parseInt($('.list-group-item.active').attr('id'));
      let preguntaActualizada = prompt("Ingrese pregunta actualizada")
      contexto.limpiarFormulario();
      contexto.controlador.actualizarPregunta(id, preguntaActualizada);
    });
    e.borrarTodo.click(function () {
      contexto.limpiarFormulario(),
      contexto.controlador.borrarTodasPreguntas();
    });
  },

  limpiarFormulario: function () {
    $('.form-group.answer.has-feedback.has-success').remove();
  },
};
