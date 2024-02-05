"use strict";
//cardapiocopy
function pronto(){
var inmensagem =document.getElementById("inmensagem")//selecionou id que vc vai dg a msg
var msg=document.getElementById("msg")//selecionei id com h1 q vai surgir a msg escrita
var letras = inmensagem.value;//cria var n existente cm value para dar valor nela
msg.textContent="" + letras;//id do h1 q eu selecionei para passar a msg enviada textcontent e para pegar frase de algum lugar
 
}
var inenviar=document.getElementById("inenviar");
inenviar.addEventListener("click",pronto)

//termino da funçao de mostrar cardapio
const notes=document.querySelector(".notes");
const addnotetitle = document.querySelector(".add_note_title");
const addnotetext = document.querySelector(".add_note_text");
const addnotebtn = document.querySelector(".add_note_btn");
const deleteallnote = document.querySelector(".delete_all_note_btn");

let localStorageSize = localStorage.length / 2;
let numClick = 1;
let i = 0;
let article;
let inputtitle;
let textarea;
let buttons;
let deletenote;
let savenote;
let keytitle = 0;
let keytext = 1000000;

function adicionarnota(){
    article = document.createElement("ARTICLE");
    inputtitle = document.createElement("INPUT");
    textarea = document.createElement("TEXTAREA");
    buttons = document.createElement("DIV");
    deletenote = document.createElement("IMG");
    savenote = document.createElement("IMG");

    article.appendChild(inputtitle);
    article.appendChild(textarea);
    article.appendChild(buttons);
    buttons.appendChild(deletenote);
    buttons.appendChild(savenote);
    notes.appendChild(article);

    article.classList.add("your_note");
    article.classList.add(`your_note_${i}`);
    inputtitle.classList.add(`your_note_title${i}`);
    textarea.classList.add(`your_note_text${i}`);
    buttons.classList.add("button_action");
    deletenote.classList.add(`${keytitle}`);
    deletenote.classList.add(`${keytext}`);
    deletenote.classList.add(`your_note_btn${i}`);
    savenote.classList.add(`${keytitle}`);
    savenote.classList.add(`${keytext}`);
    savenote.classList.add(`your_note_btn${i}`);
}
function atribuirvalor(){
  const yournotetitle = document.querySelector(`.your_note_title${i}`);
  const yournotetext = document.querySelector(`.your_note_text${i}`);

  deletenote.src = "https://img.icons8.com/color/48/000000/delete-forever.png";
  savenote.src = "https://img.icons8.com/color/48/000000/save--v1.png";

  yournotetitle.value = addnotetitle.value;
  yournotetext.value = addnotetext.value;

  localStorage.setItem(keytitle, yournotetitle.value);
  localStorage.setItem(keytext, yournotetext.value);

  addnotetitle.value = "";
  addnotetext.value = "";
}
function recuperarvalor(){
    const yournotetitle = document.querySelector(`.your_note_title${i}`);
    const yournotetext = document.querySelector(`.your_note_text${i}`);

    deletenote.src = "https://img.icons8.com/color/48/000000/delete-forever.png";
    savenote.src = "https://img.icons8.com/color/48/000000/save--v1.png";

    yournotetitle.value = localStorage.getItem(keytitle);
    yournotetext.value = localStorage.getItem(keytext);
}
function eliminarnota(){
    deletenote.addEventListener("click", (e)=>{
        let resposta = confirm("tem certeza que deseja excluir a nota");
        if(resposta){
            notes.removeChild(e.path[2]);
            localStorage.removeItem(e.path[0].classList[0]);
            localStorage.removeItem(e.path[0].classList[1]);
        }
    });
}
function guardarnota(){
    savenote.addEventListener("click", (e)=>{
        let valoranteriortitle = localStorage.getItem(e.path[0].classList[0]);
        let valoranteriortext = localStorage.getItem(e.path[0].classList[1]);

        let valoratualtitle = e.path[2].children[0].value;
        let valoratualtext = e.path[2].children[1].value;

        if(valoranteriortitle != valoranteriortitle || valoranteriortext != valoratualtext){
           if(valoratualtitle.length != 0 && valoranteriortext.length != 0){
            let resposta = confirm("tem certeza que deseja guardar");
            if(resposta){
                localStorage.setItem(e.path[0].classList[0],valoratualtitle);
                localStorage.setItem(e.path[0].classList[1],valoratualtext);
            }
        }else{
            alert("nao pode deixar nenhum campo vazio");
           }
        }
    });
}
addnotebtn.addEventListener("click", ()=>{
    if(addnotetitle.value.length != 0 && addnotetext.value.length != 0){
      adicionarnota();
      atribuirvalor();
      i++
      numClick++
      keytitle++
      keytext++
      localStorageSize = localStorage.length / 2;
      eliminarnota();
      guardarnota();

    }
});
window.addEventListener("load", ()=>{
    if(localStorage.length > 0){
        while(localStorageSize > i){
            if(localStorage.getItem(keytitle) == null &&
             localStorage.getItem(keytext) == null){
                keytitle++
                keytext++
             }else{
                adicionarnota();
                recuperarvalor();
                eliminarnota();
                guardarnota();
                i++
                keytext++
                keytitle++
                numClick++
             }
        }
    }
});
deleteallnote.addEventListener("click",(e)=>{
 let resposta = confirm("tem certeza que deseja excluir tudo?");
 if(resposta){
    localStorage.clear();
    for(let j = 0; j < localStorageSize; j++){
        const articleclass = document.querySelectorAll(".your_note");
        notes.removeChild(articleclass[0]);
    }
 }
});