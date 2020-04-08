const url = "https://cse.ufsc.br/wp-content/plugins/institucional-centros/ajax_centros_request.php?type=posgrad&centro=CSE&title=Cursos";

const extrairDado = require("./extrair_dado");
const buscarInformacoes = require("./buscar_informacoes");
const tratamentoExtra = require("./tratamento_extra");

function extrairDadosPos(tableRow) {
  return {
    curso: extrairDado(tableRow, 0),
    nivel: extrairDado(tableRow, 1),
    alunos: extrairDado(tableRow, 2),
  }
}

module.exports = () => {
  return buscarInformacoes(url, "//table/tbody/tr", extrairDadosPos, tratamentoExtra)
    .then(listaAlunos => {

      let dados = {
        mestrado: 0,
        mestrado_profissionalizante: 0,
        doutorado: 0,
        pos_doutorado: 0,
        outro: 0
      }

      for (let a of listaAlunos) {
        const qt = parseInt(a.alunos, 10);

        if (a.nivel.match(/mestrado pro/i)) {
          dados.mestrado_profissionalizante += qt;
        } else if (a.nivel.match(/mestrado/i)) {
          dados.mestrado += qt;
        } else if (a.nivel.match(/pós dou/i)) {
          dados.pos_doutorado += qt;
        } else if (a.nivel.match(/doutorado/i)) {
          dados.doutorado += qt;
        } else {
          dados.outro += qt;
        }
      }

      return dados;

    });
}
