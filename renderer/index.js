const {ipcRenderer} = require('electron')

function send(event){
  event.preventDefault();
  let nombre = document.getElementById("nombre").value;
  ipcRenderer.send('form-listener',nombre);
}

function regresar(event){
  ipcRenderer.send('regresar',"Pedido desde result")
}
