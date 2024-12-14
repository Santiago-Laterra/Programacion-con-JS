document.addEventListener("DOMContentLoaded", function(){

    //seleccionar los elementos de la interfaz
    const inputEmail = document.querySelector("#email");
    const inputPassword = document.querySelector("#Password");
    const formulario = document.querySelector("#formulario");

    //asignar eventos

    inputEmail.addEventListener("blur", validation);
    inputPassword.addEventListener("blur", validation);
       

        function validation(e){
           // console.log("hola");    //.nextElementSibling pasa al siguiente elemento. 
            if(e.target.value.trim() ===""){ // elimina los espacios.
                
                showAlert(`El campo ${e.target.id} obligatorio`, e.target.parentElement);
                return;//detiene la ejecucion del codigo.

            }
            if(e.target.id === "email" && !emailValidation(e.target.value)){

                showAlert("El mail no es valido", e.target.parentElement);
                return;
            }
            cleanAlert(e.target.parentElement);
        }

        function showAlert(message, referencia){

            //comprueba si ya existe una alert
            const alert = referencia.querySelector(".bg-danger"); //pasando esta referencia elimina lo que esta adentro del div seleccionado y no del otro
            if(alert){
                alert.remove();
            }

            //generar alerta en HTML
            const error = document.createElement("P");
            error.textContent = message;
            error.classList.add("bg-danger", "text-light", "p-2", "mt-1","styleAlert");
           // console.log(error);

            //inyectar al formulario

           //formulario.appendChild(error);
            referencia.appendChild(error);
            //formulario.innerHTML = error; 
        }

        function cleanAlert(reference){

            const alert = reference.querySelector(".bg-danger");
            alert.remove();
           //console.log("desde limpiar alerta");

        }

        function emailValidation(email){

            const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ //expresion regular es un patron en una cadena de texto o de num
            const result = regex.test(email);
            return result;

        }
});