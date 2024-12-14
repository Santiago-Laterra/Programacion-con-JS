const carrito = document.querySelector("#carrito")
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const listaCursos = document.querySelector("#lista-cursos");
const limpiarCarrito = document.querySelector("#vaciar-carrito");

let arrayCarrito = []; // este array va a contener los articulos que vaya seleccionando. 

// console.log(carrito);
// console.log(contenedorCarrito);
// console.log(listaCursos);
// console.log(limpiarCarrito);

registrarEventListeners(); //aca registro todos mis eventos 

function registrarEventListeners(){ //funcion que guarda todos los eventos

   //agrego un curso presionando "agregarCarrito"
   listaCursos.addEventListener('click', agregarCurso ); //agregarCurso es una funcion adentro del evento

   carrito.addEventListener("click",eliminarCurso);

   limpiarCarrito.addEventListener("click",() =>{ //esto es una funcion anonima es para cuando es poco coidgo.

      arrayCarrito = []; //reseteamos el arreglo

      limpiarHTML();//Eliminados todo del html.

   })
}
   
//funciones
   function agregarCurso(e){
     //e.preventDefault(); // cancela la accion por default que tenia lo que estemos presionando.

      if(e.target.classList.contains('agregar-carrito')){
         
         //const cursoSeleccionado = e.target.parentElement.parentElement.parentElement.parentElement; // creamos variable para no tener todo el codigo
         const cursoSeleccionado = e.target.closest(".card");
         
         leerDatosDelCurso(cursoSeleccionado);
      }
      //console.log(e.target.classList); //target te muestra a donde le estas dando click y classList ves las clases en lo que estas apretando.
   }
   function eliminarCurso(e){

      /*
      if(e.target.classList.contains('borrar-curso')){
         
         const cursoId= e.target.getAttribute("data-id");
         const cursoTalle =  e.target.parentElement.parentElement.querySelector('td.TALLE').textContent;
         
         arrayCarrito = arrayCarrito.map(curso => {
            if (curso.id == cursoId && curso.talle !== cursoTalle ) {
                curso.cantidad -= 1;       
            }
            return curso;
        }).filter(curso => curso.cantidad > 0);
         carritoHTML(); 
      
      }*/





      if (e.target.classList.contains('borrar-curso')) {
         const uniqueKey = e.target.getAttribute("data-id");
         arrayCarrito = arrayCarrito.map(curso => {
             if (curso.uniqueKey === uniqueKey) {
                 curso.cantidad--;
             }
             return curso;
         }).filter(curso => curso.cantidad > 0);
         carritoHTML();
     }







   }

   function leerDatosDelCurso(curso){ //curso es cursoSeleccionado

      //console.log(curso); //toma todo el html del curso seleccionado por el usuario. 
     
      //creamos objeto con el contenido del curso para que lo contenga. 
      


      /*
      const infoCurso = {

         imagen: curso.querySelector("img").src, //obtengo la imagen
         tituloCurso: curso.querySelector("h3").textContent, //obtengo el titulo del curso
         precio: curso.querySelector("h4").textContent,//obtengo el precio del curso 
         id: curso.querySelector("a").getAttribute("data-id"),//obtengo el id especifico de cada curso
         talle: curso.querySelector(".form-check-input:checked").getAttribute("value"),
         cantidad: 1, //asigne la cantidad para saber cuanto van agregando. 
         
      }*/
         const infoCurso = {
            imagen: curso.querySelector("img").src,
            tituloCurso: curso.querySelector("h3").textContent,
            precio: curso.querySelector("h4").textContent,
            id: curso.querySelector("a").getAttribute("data-id"),
            talle: curso.querySelector(".form-check-input:checked").getAttribute("value"),
            uniqueKey: `${curso.querySelector("a").getAttribute("data-id")}-${curso.querySelector(".form-check-input:checked").getAttribute("value")}`,
            cantidad: 1
        };
   



      console.log(infoCurso.talle); // muestro el objeto o estructura

      //verificar si ya existe el curso en el carrito.   (.some recorre un arreglo y permite verificar si un elemento exite).

      //const existe = arrayCarrito.some(curso => curso.id === infoCurso.id  && infoCurso.talle == curso.talle); // itera en el carrito y verifica que si el id del curso es = 
      //al de infocurso.id si esta significa que esta repetido. 
      const existe = arrayCarrito.some(curso => curso.uniqueKey === infoCurso.uniqueKey);




      /*

      if(existe){
         //actualizar la cantidad si el curso ya existe.
         const cursos = arrayCarrito.map(curso => {

            if(curso.id === infoCurso.id && infoCurso.talle == curso.talle ){
               curso.cantidad ++;
               return curso; //retorna el objeto actualizados

            }else{ //como itera por todos los cursos y hay que no se cumpla esa condicion y tiene que retornar el curso como ya esta.
               return curso;  //retorna los objetos que no son los  duplicados.
            }

         });  //crea un nuevo arreglo sin modificar el creado. 
            arrayCarrito= [...cursos];
      } else{

      //agrego los elementos al array carrito
      arrayCarrito = [...arrayCarrito, infoCurso]; //si no hacemos una copia el anterior se borraria.
      //los ... hace una copia del carrito con los elementos que se agregan y el "," "pushea" pone el contenido del infoCurso 
      }
       // lo llamo despues de agregar el curso para poder despues agregarlo al carrito en el html */
   
   
   
      if (existe) {
         const cursos = arrayCarrito.map(curso => {
             if (curso.uniqueKey === infoCurso.uniqueKey) {
                 curso.cantidad++;
                 return curso;
             } else {
                 return curso;
             }
         });
         arrayCarrito = [...cursos];
     } else {
         arrayCarrito = [...arrayCarrito, infoCurso];
     }
   
     carritoHTML();
   
   
   
   
   
   
   }



   function carritoHTML(){

      //limpiar el html
      limpiarHTML();

      //recorre el carrito y crea el html
      arrayCarrito.forEach( curso => {
         // const { imagen titulo, precio, cantidad, id } = curso; Destroyer para no tener que utilizar curso
         const row = document.createElement('tr'); // creo un tr en el html de tbody
         
         
         /* 
         row.innerHTML= `
            <td>
               <img src="${curso.imagen}">
            </td>
            <td>
               ${curso.tituloCurso}
            </td>
            <td class="TALLE">
            ${curso.talle}
            </td>
            <td>
               ${curso.precio}
            </td>
            <td>
               ${curso.cantidad}
            </td>
            <td>
            <a href="#" class="borrar-curso nav-link" data-id="${curso.id}" > X </a>
            </td>
         `;*/


         row.innerHTML = `
    <td>
        <img src="${curso.imagen}">
    </td>
    <td>
        ${curso.tituloCurso}
    </td>
    <td class="TALLE">
        ${curso.talle}
    </td>
    <td>
        ${curso.precio}
    </td>
    <td>
        ${curso.cantidad}
    </td>
    <td>
        <a href="#" class="borrar-curso nav-link" data-id="${curso.uniqueKey}">X</a>
    </td>
`;












         //agrega al html del carrito en el tbody
         
         contenedorCarrito.appendChild(row);//le agrega al padre que es tr le agrega un hijo el td con el titulo

      })


   }


   function limpiarHTML(){
      //forma lenta
      contenedorCarrito.innerHTML= '';

      //forma rapida
      // while(contenedorCarrito.firstChild){

      //    contenedorCarrito.removeChild(contenedorCarrito.firstChild); MIENTRAS QUE HAYA UN HIJO ELIMINA EL PRIMERO.
      // }
   }