module.exports = (tableRow, index) => {
  let child = tableRow.childNodes["" + index];
  if (child)
    child = child.firstChild;

  if (child)
    return child.data;

  return "";
}
