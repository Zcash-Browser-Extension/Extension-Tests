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
        
        /*
        const response = await fetch(wasmURL)
        const buffer = await response.arrayBuffer()
        const obj = await WebAssembly.instantiate(buffer)
        const output = new Uint8Array(obj.instance.exports.memory.buffer)
      
        const pointer = obj.instance.exports.helloWorld()
      
        let string = ""
      
        for(let i = pointer; output[i]; i++) {
          string += String.fromCharCode(output[i])
        }  
      
        //document.getElementById('container').textContent = string
        

        alert(`Path is: ${wasmURL}, output is: ${string}`)
        */
    });     
});

async function fetchAndInstantiate() {

    const response = await fetch('./main.wasm')
    const buffer = await response.arrayBuffer()
    //let isValid = await WebAssembly.validate(bytes)
    const obj = await WebAssembly.instantiate(buffer)
    const output = new Uint8Array(obj.instance.exports.memory.buffer)
      
    const pointer = obj.instance.exports.helloWorld()   
    
    let string = ""
      
    for(let i = pointer; output[i]; i++) {
      string += String.fromCharCode(output[i])
    }  
  
    //document.getElementById('container').textContent = string
    

    alert(`Output is: ${string}`)    

    //const wasmURL = chrome.runtime.getURL("main.wasm")
    //const response = await fetch('./main.wasm')
    
    /*
    fetch('./main.wasm').then(response =>
        response.arrayBuffer()
        ).then(bytes =>
            WebAssembly.instantiate(bytes, importObject)
            ).then(results => {
            results.instance.exports.helloWorld();
    })


    /*
    const response = await fetch('../out/main.wasm')
    const buffer = await response.arrayBuffer()
    const obj = await WebAssembly.instantiate(buffer)
    const output = new Uint8Array(obj.instance.exports.memory.buffer)
  
    const pointer = obj.instance.exports.helloWorld()
  
    let string = ""
  
    for(let i = pointer; output[i]; i++) {
      string += String.fromCharCode(output[i])
    }  
  
    document.getElementById('container').textContent = string
    */
  }