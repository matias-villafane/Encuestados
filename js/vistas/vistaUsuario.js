/*
 * Vista usuario
 */
var VistaUsuario = function(modelo, controlador, elementos) {
  this.modelo = modelo;
  this.controlador = controlador;
  this.elementos = elementos;
  var contexto = this;

  //suscripcion a eventos del modelo
  this.modelo.preguntaAgregada.suscribir(function() {
    contexto.reconstruirLista();
  });
};

VistaUsuario.prototype = {
  //muestra la lista por pantalla y agrega el manejo del boton agregar
  inicializar: function() {
    this.reconstruirLista();
    var elementos = this.elementos;
    var contexto = this;
    
    elementos.botonAgregar.click(function() {
      contexto.agregarVotos(); 
    });
      
    this.reconstruirGrafico();
  },

  //reconstruccion de los graficos de torta
  reconstruirGrafico: function(){
    var contexto = this;
    //obtiene las preguntas del local storage
    var preguntas = this.modelo.preguntas;
    preguntas.forEach(function(clave){
      var listaParaGrafico = [[clave.textoPregunta, 'Cantidad']];
      var respuestas = clave.cantidadPorRespuesta;
      respuestas.forEach (function(elemento) {
        listaParaGrafico.push([elemento.textoRespuesta,elemento.cantidad]);
      });
      contexto.dibujarGrafico(clave.textoPregunta, listaParaGrafico);
    })
  },


  reconstruirLista: function() {
    var listaPreguntas = this.elementos.listaPreguntas;
    listaPreguntas.html('');
    var contexto = this;
    var preguntas = this.modelo.preguntas;
    preguntas.forEach(function(clave){
      //completar
      //agregar a listaPreguntas un elemento div con valor "clave.textoPregunta", texto "clave.textoPregunta", id "clave.id"
      let pregunta = document.createElement('div');
      
      $(pregunta).attr('id',clave.id);
      $(pregunta).attr('value',clave.textoPregunta);
      $(pregunta).text(clave.textoPregunta);

      $(listaPreguntas).append(pregunta);

      var respuestas = clave.cantidadPorRespuesta;
      contexto.mostrarRespuestas(listaPreguntas, respuestas, clave);
    })
  },

  //muestra respuestas
  mostrarRespuestas:function(listaPreguntas,respuestas, clave){
    respuestas.forEach (function(elemento) {
      $(listaPreguntas).append($('<input>', {
        type: 'radio',
        value: elemento.textoRespuesta,
        name: clave.id,
      }));
      $(listaPreguntas).append($("<label>", {
        for: elemento.textoRespuesta,
        text: elemento.textoRespuesta
      }));
    });
  },

  agregarVotos: function(){
    let contexto = this;
    let divs = $('#preguntas').find('div');
      divs.each(function(){
        let nombrePregunta = $(this).attr('value');
        let id = $(this).attr('id');
        let respuestaSeleccionada = $(`input[name=${id}]:checked`).val();
        $(`input[name=${id}]`).prop('checked',false);
        contexto.controlador.agregarVoto(id,nombrePregunta,respuestaSeleccionada);
      });
      contexto.reconstruirGrafico();
  },

  dibujarGrafico: function(nombre, respuestas){
    var seVotoAlgunaVez = false;
    for(var i=1;i<respuestas.length;++i){
      if(respuestas[i][1]>0){
        seVotoAlgunaVez = true;
      }
    }
    var contexto = this;
    google.charts.load("current", {packages:["corechart"]});
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
      var data = google.visualization.arrayToDataTable(respuestas);

      var options = {
        title: nombre,
        is3D: true,
      };
      var ubicacionGraficos = contexto.elementos.graficosDeTorta;
      var id = (nombre.replace(/\W/g, '')).split(' ').join('')+'_grafico';
      if($('#'+id).length){$('#'+id).remove()}
      var div = document.createElement('div');
      ubicacionGraficos.append(div);
      div.id = id;
      div.style.width = '400';
      div.style.height = '300px';
      var chart = new google.visualization.PieChart(div);
      if(seVotoAlgunaVez){
        chart.draw(data, options);
      }
    }
  },
};
