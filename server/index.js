const servidores = require("./servidores");
const alunos = require("./graduacao");
const pos = require("./pos_graduacao");


(async () => {
  const dados = {
    servidores: await servidores(),
    graduacao: await alunos(),
    pos: await pos(),
  };

  console.log("acabou com: ", dados);
})();
