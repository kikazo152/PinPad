// CONSTANTS AND VARIABLES 

const firstButton = document.getElementById('save');
const secondButton = document.getElementById('ok');
const secondOverlay = document.getElementById('secondOverlay');
const secondModal = document.getElementById('secondModal');
const headerElement = document.getElementById('header');
const hidePassword = document.getElementById('hidePassword');
const revealPassword = document.getElementById('revealPassword');
const pinSaved = localStorage.getItem('Pin') ? localStorage.getItem('Pin') : false;
const cookieActive = obtenerCookie('sesion');
let parrafoElement = document.createElement('p');
let headerText = '';
let printNumber = document.getElementById('pin');
let arrayNumber = [];
let firstArray = [];
let secondArray = [];
let counter = 3;

// COOKIE 

if (cookieActive) {
    ;
    handleCorrectPin(true);;
};

// FUNCTION FOR CHECK ACTIVE COOKIES

function obtenerCookie(nombre) {
    var nombreBuscado = nombre + "=";
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.indexOf(nombreBuscado) === 0) {
            return cookie.substring(nombreBuscado.length, cookie.length);
        }
    }
    return "";
}

// FUNCTION TO CHANGE EYES

const eyes = (id, id2) => {
    hidePassword.style.display = id
    revealPassword.style.display = id2
}

// SHOW AND HIDE EYES 

let showPassword = () => {
    if (printNumber.type === 'password') {
        printNumber.type = 'text'
        hidePassword.style.display = 'block'
        revealPassword.style.display = 'none'
    } else {
        printNumber.type = 'password'
        revealPassword.style.display = 'block'
        hidePassword.style.display = 'none'
    }
}

if (arrayNumber.length === 0) {
    eyes('none', 'none')
}

// LOCALSTORAGE CONDITION

if (pinSaved) {
    printNumber.value = '******';
    revealPassword.style.display = 'block';
    document.getElementById('modal').style.display = 'none';
    document.getElementById('myModal').style.display = 'none';
    secondModal.style.display = 'block';
    secondOverlay.style.display = 'block';
    firstButton.style.display = 'none';
    secondButton.style.display = 'block';
    firstArray = pinSaved.split(',');
}


// MODAL CLOSE FUNCTION

function closeModal() {
    document.getElementById('modal').style.display = 'none';
    document.getElementById('myModal').style.display = 'none';
    secondOverlay.style.display = 'none'
    secondModal.style.display = 'none'
    revealPassword.style.display = 'none'

    printNumber.value = ''
    arrayNumber = []
    classes('input_text', 'input_text_notaNumber', 'input_text_wrong', 'input_text_correct');
}

// FUNCTION TO CHANGE INPUT CLASS

const classes = (id, id2, id3, id4) => {
    printNumber.classList.add(id)
    printNumber.classList.remove(id2)
    printNumber.classList.remove(id3)
    printNumber.classList.remove(id4)
}


// FUNCTION IF THE PIN IS CORRECT

function handleCorrectPin(notFirstTime) {
    !notFirstTime ? establecerCookie("sesion", "activo", 10) : null;
    printNumber.value = 'CORRECT';
    window.location.href = 'https://www.codebay-innovation.com/';
    eyes('none', 'none')
    classes('input_text_correct', 'input_text', 'input_text_notaNumber', 'input_text_wrong')
}

// FUNCTION IF THE PIN IS INCORRECT

function handleWrongPin() {
    classes('input_text_wrong', 'input_text', 'input_text_notaNumber', 'input_text_correct')
    printNumber.type = 'text';
    printNumber.value = 'Wrong';
    arrayNumber = [];

    if (counter > 2 || counter === 2) {
        headerElement.style.display = 'block';
        counter--;
        const attempts = counter === 1 ? 'intento' : 'intentos';
        const remaining = counter === 1 ? 'queda' : 'quedan';
        updateDisplay('block', `¡El pin no es correcto, te ${remaining} ${counter} ${attempts}!`);
    } else {
        updateDisplay('block', 'No te quedan intentos');
        window.location.href = 'https://policia.es/';
    }
}

// FUNCTION SET TIMEOUT COOKIE

function establecerCookie(nombre, valor, tiempoExpiracionSeg) {
    var fechaExpiracion = new Date();
    fechaExpiracion.setTime(fechaExpiracion.getTime() + (tiempoExpiracionSeg * 1000));
    var cadenaCookie = nombre + "=" + valor + ";expires=" + fechaExpiracion.toUTCString() + ";path=/";
    document.cookie = cadenaCookie;
}


// FUNCTION IF NO NUMBER IS ENTER

function handleNotANumber() {
    printNumber.type = 'text';
    hidePassword.style.display = 'none';
    classes('input_text_notaNumber', 'input_text', 'input_text_wrong', 'input_text_correct');
    eyes('none', 'none')
    printNumber.value = 'NOT A NUMBER';
    arrayNumber = [];
}

// FUNCTION IF 6 DIGITS ARE NOT ENTERED

function handleValidationError() {
    printNumber.type = 'text';
    eyes('none', 'none')
    classes('input_text_wrong', 'input_text', 'input__text_notaNumber', 'input_text_correct');
    printNumber.value = 'ERROR';
    arrayNumber = [];
}

// FUNCTION TO PAINT INTENTS

function updateDisplay(type, message) {
    printNumber.type = type;
    eyes('none', 'none')
    parrafoElement.textContent = message;
}

// ADD NUMBER TO THE ARRAY

const addNumber = (number) => {
    classes('input_text', 'input_text_wrong', 'input_text_notaNumber', 'input_text_correct')
    arrayNumber.push(number)

    if (printNumber.type === 'text') {
        eyes('block', 'none')
    } else {
        eyes('none', 'block')
    }

    if (arrayNumber.length <= 6) {
        printNumber.value = arrayNumber.join('')
    } else {
        alert('Has alcanzado el limite de caracteres')
        arrayNumber.pop()
    }

}


// DELETE LAST NUMBER OF THE ARRAY

const deleteArray = () => {
    classes('input_text', 'input_text_notaNumber', 'input_text_wrong', 'input_text_correct');
    arrayNumber.pop()
    printNumber.value = arrayNumber.join('')

    if (arrayNumber.length === 0) {
        hidePassword.style.display = 'none'
        revealPassword.style.display = 'none'
    }
}


// VALIDATE ARRAY

savePin = () => {

    let valor = printNumber.value;

    // PIN CONDITIONS

    if (isNaN(valor)) {
        handleNotANumber();
    } else if (!isNaN(valor) & valor.length === 6) {
        printNumber.value = 'SAVED';
        
        firstArray.push(arrayNumber);
        localStorage.setItem('Pin', firstArray);
        firstButton.style.display = 'none';
        secondButton.style.display = 'block';
        secondOverlay.style.display = 'block';
        secondModal.style.display = 'block';
        eyes('none', 'none');
        printNumber.type = 'text';
        classes('input_text_correct', 'input_text_notaNumber', 'input_text_wrong', 'input_text');
        return firstArray;
    } else {
        handleValidationError();
    }

}


// ENTER PIN


const checkIt = () => {

    let valor = printNumber.value;

    headerElement.appendChild(parrafoElement)
    secondArray = [...arrayNumber];
    secondArray.flat();

    // CONDITIONS
    if (isNaN(valor)) {
        handleNotANumber()
    }
    else if (valor.length != 6) {
        handleValidationError()

    }
    else if (firstArray.join() != secondArray.join()) {
        handleWrongPin()
    }
    else {
        handleCorrectPin()
    }

}







