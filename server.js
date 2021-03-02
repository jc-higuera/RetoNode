// Importa los módulos que usará la aplicación
var http = require("http");
var fs = require("fs");
const axios = require("axios").default;
const url = require("url");

let proveedores;
let clientes;
// Crea una nueva instancia del servidor
http
  .createServer(function (req, res) {
    // Lee el archivo testfile.txt el cual se encuentra en la misma ruta que este script
    fs.readFile("testfile.html", "utf8", function (err, data) {
      if (err) throw err; // Retorna error si no encuentra el archivo
      const queryObject = url.parse(req.url, true).pathname;
      console.log(queryObject);
      // Encabezado de la respuesta del servidor
      res.writeHead(200, { "Content-Type": "text/html" });
      let html;
      async function getJSON() {
        await axios({
          method: "get",
          url:
            "https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json",
        })
          .then((res) => (proveedores = res.data))
          .then(() => console.log(proveedores));
        await axios({
          method: "get",
          url:
            "https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json",
        })
          .then((res) => (clientes = res.data))
          .then(() => console.log(clientes));
          if(queryObject=='/api/proveedores'){
              html=buildHtmlProveedores(proveedores);
          }else if(queryObject=='/api/clientes'){
              html=buildHtmlClientes(clientes);
          }
          res.end(html);

      }
      getJSON();

      // Especifica el contenido que debe ser incluido en la respuesta
      
    });
  })
  .listen(8080); // Puerto que usará el servidor para escuchar las solicitudes



function buildHtmlProveedores(datos) {
  var header =
    '<meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Document</title><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossorigin="anonymous"><script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script><script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-Piv4xVNRyMGpqkS2by6br4gNJ7DXjqk09RmUpJ8jgGtD7zP9yug3goQfGII0yAns" crossorigin="anonymous"></script>';
  var body = '<h2>Proveedores</h2>';
  body = body + '<table class="table table-striped">';
  body = body + '<thead><tr><th scope="col">Id</th><th scope="col">Nombre</th><th scope="col">Contacto</th></tr></thead>';
  body = body + '<tbody>';

  datos.forEach(element => {
      body = body + '<tr>';
      body = body + '<th scope="row">'+element.idproveedor+'</th>';
      body = body + '<td>'+element.nombrecompania+'</td>';
      body = body + '<td>'+element.nombrecontacto+'</td>';
      body = body + '</tr>';
  });

  body = body + '</tbody></table>';

  // concatenate header string
  // concatenate body string

  return (
    "<!DOCTYPE html>" +
    "<html><head>" +
    header +
    "</head><body>" +
    body +
    "</body></html>"
  );
}
function buildHtmlClientes(datos) {
    var header =
      '<meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Document</title><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossorigin="anonymous"><script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script><script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-Piv4xVNRyMGpqkS2by6br4gNJ7DXjqk09RmUpJ8jgGtD7zP9yug3goQfGII0yAns" crossorigin="anonymous"></script>';
    var body = '<h2>Clientes</h2>';
    body = body + '<table class="table table-striped">';
    body = body + '<thead><tr><th scope="col">Id</th><th scope="col">Nombre</th><th scope="col">Contacto</th></tr></thead>';
    body = body + '<tbody>';
  
    datos.forEach(element => {
        body = body + '<tr>';
        body = body + '<th scope="row">'+element.idCliente+'</th>';
        body = body + '<td>'+element.NombreCompania+'</td>';
        body = body + '<td>'+element.NombreContacto+'</td>';
        body = body + '</tr>';
    });
  
    body = body + '</tbody></table>';
  
    // concatenate header string
    // concatenate body string
  
    return (
      "<!DOCTYPE html>" +
      "<html><head>" +
      header +
      "</head><body>" +
      body +
      "</body></html>"
    );
  }
