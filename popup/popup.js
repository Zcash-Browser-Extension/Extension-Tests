document.addEventListener('DOMContentLoaded', function() {
    const setLocalStorage = document.getElementById('setLocalStorage')
    const getLocalStorage = document.getElementById('getLocalStorage')
    const runHelloWorld = document.getElementById('runHelloWorld')
    const runFactorial = document.getElementById('runFactorial')

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
        fetchAndInstantiateFactorial()
    })     
});

async function fetchAndInstantiateHelloWorld() {

    const response = await fetch('./main.wasm')
    const buffer = await response.arrayBuffer()
    // Apprently 'wasm-eval' must be set in manifest 
    // for WebAssembly.instantiate to execute in Chrome extension
    const obj = await WebAssembly.instantiate(buffer) 
    const output = new Uint8Array(obj.instance.exports.memory.buffer)
      
    const pointer = obj.instance.exports.helloWorld()   
    
    let string = ""
      
    for(let i = pointer; output[i]; i++) {
      string += String.fromCharCode(output[i])
    }  
  
    document.getElementById('helloWorldOutput').textContent = string  
  }

  async function fetchAndInstantiateFactorial() {

    const response = await fetch('./factorial.wasm')
    const buffer = await response.arrayBuffer()
    // Apprently 'wasm-eval' must be set in manifest 
    // for WebAssembly.instantiate to execute in Chrome extension
    const obj = await WebAssembly.instantiate(buffer) 
    const output = new Uint8Array(obj.instance.exports.memory.buffer)
      
    // Simple method is possible because factorial returns a number, not a string
    document.getElementById('factorialOutput').textContent  = obj.instance.exports.factorial(5)    
  }