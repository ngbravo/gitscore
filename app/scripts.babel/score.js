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

  //TODO should find a better way to verify. Maybe using the GitHub API(?)
  var repoTopName = document.getElementsByClassName('public')[0];
  if(repoTopName === undefined) {
    repoTopName = document.getElementsByClassName('private')[0];
  }

  var childNodes = repoTopName.childNodes;
  repoTopName.insertBefore(nodeToInsert, repoTopName.firstChild);
}

function getNodeToInsert(score) {
  var node = document.createTextNode(score.aggregate + '')
  return node;
}
