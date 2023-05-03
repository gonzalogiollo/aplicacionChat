const socket = io();

// Swal.fire({
//     title: 'Saludos',
//     text: 'mensaje inicial',
//     icon: 'success'
// })

let user; //generamos una valriable que luego llenaremos con la promesa de abajo.
const chatbox = document.getElementById('chatBox')

Swal.fire({
    title: 'Identificate',
    input: 'text', //este campo tipo input es donde va a colocar el nombre de usuario.
    text: 'Ingresa el user para identificarte en el chat',
    inputValidator: (value) =>{ //esto lo que hace es que si la persona no coloca un nombre de user no puede ingresar al chat.
        return !value && "necesitas escribir un nombre de user para chatear"
    },
    allowOutsideClick: false, //esto hace que si se clickea por afuera del modal, el modal queda esperando que se complete el campo del value.
    
}).then(result => { //aca hacemos el .then para que sea una promesa y poder enviar el value del result al user que definimos como variable. 
    user = result.value
})