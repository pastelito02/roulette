/* eslint-disable */
var objRuleta;
var winningSegment;
var distnaciaX = 150;
var distnaciaY = 50;
var ctx;
function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function Mensaje() {
  winningSegment = objRuleta.getIndicatedSegment();
  parti = document
    .getElementById("ListaParticipantes")
    .value.split("\n")
    .filter((val) => val !== "");
  var ind = randomInteger(0, parti.length - 1);
  participante = parti[ind];
  swal(
    {
      title: " ¡ " + winningSegment.text + " Turno de: " + participante + " ! ",
      imageUrl: "img/interrogation.png",
      showCancelButton: true,
      confirmButtonColor: "#ff0000",
      confirmButtonText: "¡Incorrecto!",
      cancelButtonText: "¡Correcto!",
      closeOnConfirm: true,
      closeOnCancel: true,
    },
    function (isConfirm) {
      if (isConfirm) {
      } else {
        $("#ListaPreguntas").val(
          $("#ListaPreguntas").val().replace(winningSegment.text, "")
        );
        $("#ListaParticipantes").val(
          $("#ListaParticipantes").val().replace(participante, "")
        );
        leerPreguntas();
      }
      objRuleta.stopAnimation(false);
      objRuleta.rotationAngle = 0;
      objRuleta.draw();
      DibujarTriangulo();
      bigButton.disabled = false;
    }
  );
}
function DibujarTriangulo() {
  distnaciaX = 90;
  distnaciaY = 5;
  ctx = objRuleta.ctx;
  ctx.strokeStyle = "navy";
  ctx.fillStyle = "#000000";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(distnaciaX + 170, distnaciaY + 5);
  ctx.lineTo(distnaciaX + 230, distnaciaY + 5);
  ctx.lineTo(distnaciaX + 200, distnaciaY + 40);
  ctx.lineTo(distnaciaX + 171, distnaciaY + 5);
  ctx.stroke();
  ctx.fill();
}

function DibujarRuleta(ArregloPreguntas) {
  objRuleta = new Winwheel({
    canvasId: "Ruleta",
    numSegments: ArregloPreguntas.length,
    outerRadius: 270,
    innerRadius: 80,
    segments: ArregloPreguntas,
    animation: {
      type: "spinToStop",
      duration: 4,
      spins: 15,
      callbackFinished: "Mensaje()",
      callbackAfter: "DibujarTriangulo()",
    },
  });

  DibujarTriangulo();
}

function leerPreguntas() {
  txtListaPreguntas = $("#ListaPreguntas").val().trim();
  var Preguntas = txtListaPreguntas.split("\n");
  var PreguntasRuleta = [];
  Preguntas.forEach(function (Elemento) {
    if (Elemento) {
      PreguntasRuleta.push({
        fillStyle: "#" + (((1 << 24) * Math.random()) | 0).toString(16),
        text: Elemento,
      });
    }
  });
  txtListaParticipantes = $("#ListaParticipantes").val().trim();
  var Participantes = txtListaParticipantes.split("\n");
  var ParticipantesRuleta = [];
  Participantes.forEach(function (Elemento) {
    if (Elemento) {
      ParticipantesRuleta.push({
        fillStyle: "#" + (((1 << 24) * Math.random()) | 0).toString(16),
        text: Elemento,
      });
    }
  });
  DibujarRuleta(PreguntasRuleta);
}
leerPreguntas();
