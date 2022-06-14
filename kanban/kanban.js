/*
var refTable = document.getElementById('tableID');
var nouvelleLigne = refTable.insertRow(0);
var nouvelleCellule = nouvelleLigne.insertCell(0);
var nouveauTexte = document.createTextNode('Nouvelle ligne supérieure')
nouvelleCellule.appendChild(nouveauTexte);
*/

var refTable = document.getElementById('tableID');
var assignTH = document.getElementById('assignTH');
console.log(assignTH);
var tr = document.createElement('tr');
var td = document.createElement('td');
var cell = document.createTextNode('cell');
td.appendChild(cell);
tr.appendChild(td);
assignTH.appendChild(tr);
