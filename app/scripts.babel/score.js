'use strict';

start();

function start(){

  var score = getScore();
  writeScore(score);
}

function getScore(){
  return {
    'aggregate': 2
  };
}

function writeScore(score){
  var nodeToInsert = getNodeToInsert(score);
  var repoTopName = document.getElementsByClassName('public')[0];
  var childNodes = repoTopName.childNodes;
  repoTopName.insertBefore(nodeToInsert, repoTopName.firstChild);
}

function getNodeToInsert(score) {
  var node = document.createTextNode(score.aggregate + '')
  return node;
}
