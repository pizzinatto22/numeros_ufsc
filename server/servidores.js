const url = "https://cse.ufsc.br/wp-content/plugins/institucional-centros/ajax_centros_request.php?type=servidores&centro=CSE&title=Servidores";

const extrairDado = require("./extrair_dado");
const buscarInformacoes = require("./buscar_informacoes");

function extrairDadosServidores(tableRow) {
  return {
    nome: extrairDado(tableRow, 0),
    cargo: extrairDado(tableRow, 1),
    funcao: extrairDado(tableRow, 2),
    setor: extrairDado(tableRow, 3),

  }
}

function computar(origem, chave) {
  origem[chave] = (origem[chave] || 0) + 1;
}

module.exports = () => {
  return buscarInformacoes(url, "//table/tbody/tr", extrairDadosServidores)
    .then(listaServidores => {

      let dados = {
        outros: [],
        professores: [],
        tecnicos: [],
        setores: [],
      }

      for (let s of listaServidores) {
        const setor = s.setor;
        const cargo = s.cargo;

        dados.setores[setor] = dados.setores[setor] || [];


        if (s.cargo.match(/indefinido/i)) {
          computar(dados.outros, cargo);

          dados.setores[setor].outros = dados.setores[setor].outros || [];
          computar(dados.setores[setor].outros, cargo);

        } else if (s.cargo.match(/professor/i)) {
          computar(dados.professores, cargo);

          dados.setores[setor].professores = dados.setores[setor].professores || [];
          computar(dados.setores[setor].professores, cargo);
        } else {
          computar(dados.tecnicos, cargo);

          dados.setores[setor].tecnicos = dados.setores[setor].tecnicos || [];
          computar(dados.setores[setor].tecnicos, cargo);
        }

      }

      return dados;

    });
}
