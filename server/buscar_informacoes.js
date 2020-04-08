const https = require("https");

const xpath = require('xpath');
const DOMParser = require('xmldom').DOMParser;


module.exports = (url, enderecoXPath, extracaoDados, tratamentoExtra = null) => {
  return new Promise((accept, reject) => {
      https.get(url, res => {
        let rawData = "";

        res.on("data", chunk => {
          rawData += chunk;
        });

        res.on("end", () => {
          try {
            let html = rawData
              .replace("document.getElementById('content').innerHTML = '", "")
              .replace("';jQuery('.tabela').tablesorter();", "")
              .replace(/(<\w*)(\s\w+\s*=\s*[\w\\'":\/\.\-\s]*)+(>)/gm,"$1$3")
              .replace(/<a>/gm, "")
              .replace(/<\/a>/gm, "");

            if (tratamentoExtra)
              html = tratamentoExtra(html);

            const doc = new DOMParser().parseFromString(html);
            const registros = xpath.select(enderecoXPath, doc);
            const dadosFormatados = registros.map(r => extracaoDados(r));

            accept(dadosFormatados);
          } catch (e) {
            reject(e);
          }
        });
      });
    });
}
