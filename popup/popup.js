document.addEventListener('DOMContentLoaded', function() {
    const setLocalStorage = document.getElementById('setLocalStorage')
    const getLocalStorage = document.getElementById('getLocalStorage')
    const runWASM = document.getElementById('runWASM')

    setLocalStorage.addEventListener('click', function() {
        const inputValue = document.getElementById('localStorage').value
        localStorage.setItem('extensionTest', inputValue)
        alert(`Local storage set to ${localStorage.getItem('extensionTest')}`)
    });

    getLocalStorage.addEventListener('click', function() {
        alert(`Local storage set to ${localStorage.getItem('extensionTest')}`)
    });    

    runWASM.addEventListener('click', function() {     
        fetchAndInstantiate()
    });     
});

async function fetchAndInstantiate() {

    const response = await fetch('./main.wasm')
    const buffer = await response.arrayBuffer()
    // Apprently 'unsafe-eval' must be set in manifest 
    // for WebAssembly.instantiate to execute in Chrome extension
    const obj = await WebAssembly.instantiate(buffer) 
    const output = new Uint8Array(obj.instance.exports.memory.buffer)
      
    const pointer = obj.instance.exports.helloWorld()   
    
    let string = ""
      
    for(let i = pointer; output[i]; i++) {
      string += String.fromCharCode(output[i])
    }  
  
    //document.getElementById('container').textContent = string
    

    alert(`Output is: ${string}`)    
  }