//Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

//EventListeners

EventListeners();

function EventListeners(){
    // Cuando el usuario agrega un nuevo tweet

    formulario.addEventListener('submit', agregarTweet);

    // cuando el documento está listo

    document.addEventListener('DOMContentLoaded', () => {

        tweets = JSON.parse(localStorage.getItem('Tweets')) || [];

        console.log(tweets)

        crearHTML();

    })

}


//Funciones

function agregarTweet(e){

    e.preventDefault();
    
    const tweet = document.querySelector('#tweet').value;

    if(tweet.length ===0){
        mostrarError('Un mensaje no puede ir vacio');
        return; // evita que siga el codigo siempre y cuando esté dentro de una función
    }
    
    //añadir al arreglo de tweet 

    const tweetObj = {
        id   :Date.now(),
        tweet // puedes dejar solo un campo cuando se llaman igual
    }

    tweets = [...tweets, tweetObj];

    // crearemos el HTML
    crearHTML();

    // reiniciar el formulario

    formulario.reset();
    
}

function mostrarError(error){

    const mensajeError = document.createElement('p');

    mensajeError.textContent = error;

    mensajeError.classList.add('error');

    // insertar en el contenido

    const  contenido = document.querySelector('#contenido');

    contenido.appendChild(mensajeError);

    // elimina la alerta despues de 3 segundos
    setTimeout(() => {
        mensajeError.remove();
        // contenido.remove();
    }, 3000);

}

function crearHTML(){

    limpiarHtml();

    if(tweets.length > 0){

        tweets.forEach(tweet => {

            //agregar boton de eleimnat

            const btnEliminar = document.createElement('a');

            btnEliminar.classList.add('borrar-tweet');

            btnEliminar.textContent = 'X';
            
            //añadir la funcion de eliminar

            btnEliminar.onclick = () => {

                borrarTweet(tweet.id);

            }

            const li = document.createElement('li');

            //añanideremos el texto

            li.innerText = tweet.tweet;

            // Asignamos el botón
            li.appendChild(btnEliminar);

            listaTweets.appendChild(li);

        });
    }

    // manda los tweet al storage
    sincronizarStorage();
}


// agrega los tweets actuales al storage
function sincronizarStorage(){

    localStorage.setItem('Tweets', JSON.stringify(tweets));

}

//Elimina tweet

function borrarTweet(id){

    tweets = tweets.filter(tweet => tweet.id != id);

    crearHTML();

}


// limpiar html

function limpiarHtml(){

    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }

}


