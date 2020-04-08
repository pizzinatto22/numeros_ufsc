module.exports = (html) => {
  if (html.indexOf("<tbody>") == -1 && html.indexOf("</tbody>") >= 0) {
    const what = "</thead>";
    index = html.indexOf(what);
    const offset = index + what.length;

    html = html.substring(0, offset) + "<tbody>"+ html.substring(offset);
  }


  return html
    .replace(/(<\/td>)(<tr>|<\/tbody>)/gmi,"$1</tr>$2")
    .replace(/<br>/gmi, "")
    .replace(/<hr>/gmi, "");
}
