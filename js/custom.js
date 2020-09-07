/* eslint-disable */
var participantes = "";
var participants = [
  "Daniel",
  "Mary Fernanda",
  "Maricelys",
  "Aimara",
  "Maria Fernanda",
  "Julian",
  "Jose",
  "Diego",
  "Paula",
];
for (i = 0; i <= 8; i++) {
  participantes += `${participants[i]}\n`;
}
document.getElementById("ListaParticipantes").innerHTML = participantes;
var questions = "";
var question = [
  "¿De qué depende la simultaneidad de las llamadas en el call center básico?",
  "¿Con comunicaciones unificadas es necesario tener teléfonos instalados para poder hacer las llamadas?",
  "¿Cuánto es lo mínimo de accesos que un usuario me debe comprar en comunicaciones unificadas?",
  "¿El cliente debe contar con un servicio adicional de datacenter, para poder contar con comunicaciones unificadas?",
  "¿Cuáles son los componentes opcionales de la oferta estándar? Mencione al menos 3.",
  "Enumere tres beneficios de comunicaciones unificadas",
  "¿Qué busca comunicaciones unificadas?",
  "¿Qué tipo de contrato debe firmar el usuario?",
  "¿En qué caso se requiere ingeniero preventa?",
  "¿Qué cobertura debo de validar en los sistemas de información, para poder instalar comunicaciones unificadas?",
  "Eres un suertud@, no te ha tocado pregunta esta vez",
];
questions = question.join("\n");
document.getElementById("ListaPreguntas2").innerHTML = questions;
var questions = "";
for (i = 1; i <= question.length; i++) {
  questions += `Pregunta ${i}\n`;
}
document.getElementById("ListaPreguntas").innerHTML = questions;

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
  questions = document
    .getElementById("ListaPreguntas2")
    .value.split("\n")
    .filter((val) => val !== "");
  var ind = randomInteger(0, parti.length - 1);
  participante = parti[ind];
  ind = randomInteger(0, questions.length - 1);
  question = questions[ind];
  console.log(questions);
  questions = questions.filter((val) => val != question && val != "");
  console.log(question);
  console.log(questions);
  swal(
    {
      title:
        " ¡ Turno de: " +
        participante +
        " ! \n\n Tu pregunta es: \n\n " +
        question +
        " ",
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
        $("#ListaPreguntas2").val(
          $("#ListaPreguntas2").val().replace(question, "")
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
  DibujarRuleta(PreguntasRuleta);
}
leerPreguntas();
