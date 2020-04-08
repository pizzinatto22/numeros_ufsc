const url = "https://cse.ufsc.br/wp-content/plugins/institucional-centros/ajax_centros_request.php?type=grad&centro=CSE&title=Cursos";

const extrairDado = require("./extrair_dado");
const buscarInformacoes = require("./buscar_informacoes");
const tratamentoExtra = require("./tratamento_extra");

function extrairDadosGraduacao(tableRow) {
  return {
    curso: extrairDado(tableRow, 0),
    vagas: extrairDado(tableRow, 1),
    alunos: extrairDado(tableRow, 2)
  }
}

module.exports = () => {
  return buscarInformacoes(url, "//table/tbody/tr", extrairDadosGraduacao, tratamentoExtra)
    .then(listaCursos => {

      let dados = {
        presencial_vagas: 0,
        presencial_alunos: 0,
        ead_vagas: 0,
        ead_alunos : 0
      }

      for (let c of listaCursos) {
        if (c.curso.match(/ead/i)) {
          dados.ead_vagas += (parseInt(c.vagas, 10)) || 0;
          dados.ead_alunos += (parseInt(c.alunos, 10)) || 0;
        } else {
          dados.presencial_vagas += (parseInt(c.vagas, 10)) || 0;
          dados.presencial_alunos += (parseInt(c.alunos, 10)) || 0;
        }
      }

      return dados;

    });
}
