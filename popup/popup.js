import {getInfo} from './wasmbridge.js'

document.addEventListener('DOMContentLoaded', function() {
    const setLocalStorage = document.getElementById('setLocalStorage')
    const getLocalStorage = document.getElementById('getLocalStorage')
    const runHelloWorld = document.getElementById('runHelloWorld')
    const runFactorial = document.getElementById('runFactorial')
    const runhelloWorldGrpc = document.getElementById('runhelloWorldGrpc')
    const runGetInfo = document.getElementById('runGetInfo')

    setLocalStorage.addEventListener('click', function() {
        const inputValue = document.getElementById('localStorage').value
        localStorage.setItem('extensionTest', inputValue)
        document.getElementById('localStorageContent').textContent = localStorage.getItem('extensionTest')
    })

    getLocalStorage.addEventListener('click', function() {
        document.getElementById('localStorageContent').textContent = localStorage.getItem('extensionTest')
    })   

    runHelloWorld.addEventListener('click', function() {     
        fetchAndInstantiateHelloWorld()
    })  
    
    runFactorial.addEventListener('click', function() {   
        const inputValue = document.getElementById('factorialArg').value  
        fetchAndInstantiateFactorial(inputValue)
    })     

    runhelloWorldGrpc.addEventListener('click', function() {     
        fetchHelloWorldGRPC()
    })    
    
    runGetInfo.addEventListener('click', function() {     
        fetchGetInfoGRPC()
    })     
});

async function getWASMObject(path) {
    const response = await fetch(path)
    const buffer = await response.arrayBuffer()
    // Apprently 'wasm-eval' must be set in manifest 
    // for WebAssembly.instantiate to execute in Chrome extension
    const obj = await WebAssembly.instantiate(buffer) 
    return(obj)
}

async function fetchAndInstantiateHelloWorld() {
    const obj = await getWASMObject('./main.wasm')

    const pointer = obj.instance.exports.helloWorld() 
    const output = new Uint8Array(obj.instance.exports.memory.buffer)  
    
    let string = ""
      
    for(let i = pointer; output[i]; i++) {
      string += String.fromCharCode(output[i])
    }  
  
    document.getElementById('wasmOutput').textContent = string  
  }

async function fetchAndInstantiateFactorial(argument) {
    const obj = await getWASMObject('./factorial.wasm')
      
    // Simple method is possible because factorial returns a number, not a string
    document.getElementById('wasmOutput').textContent  = obj.instance.exports.factorial(argument)    
}

async function fetchHelloWorldGRPC() {
    let url = "http://23.92.18.222:8000"
    fetch(url)
    .then(resp => resp.json())
    .then(message => {
        document.getElementById('lightwalletdOutput').textContent = message
    } );    
}

async function fetchGetInfoGRPC() {
    document.getElementById('lightwalletdOutput').textContent = getInfo()
}