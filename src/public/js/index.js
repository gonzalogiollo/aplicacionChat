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
    allowEscapekey: false, // esto hace que si dan escape tampoco se salga el modal.
}).then(result => { //aca hacemos el .then para que sea una promesa y poder enviar el value del result al user que definimos como variable. 
    user = result.value
    socket.emit('authenticated', user); //el usuario se autentica
})

chatbox.addEventListener('keyup', evt =>{
    if(evt.key==='Enter'){
        if(chatbox.value.trim().length > 0){
            socket.emit('message', {user, message: chatbox.value})
        }
    }

})

socket.on('messageLogs', data=>{
    let log = document.getElementById('messageLogs')
    let messages = '';
    data.forEach(message =>{
        messages += `${message.user} dice: ${message.message}<br>`
    });
    log.innerHTML=messages;
})

socket.on('newUserConnected', data =>{
    swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmation: false,
        timer: 3000,
        title: `${data} se ha unido al chat`,
        icon: 'success'
    })
})