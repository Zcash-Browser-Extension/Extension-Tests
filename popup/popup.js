document.addEventListener('DOMContentLoaded', function() {
    const setLocalStorage = document.getElementById('setLocalStorage')
    const getLocalStorage = document.getElementById('getLocalStorage')

    setLocalStorage.addEventListener('click', function() {
        const inputValue = document.getElementById('localStorage').value
        localStorage.setItem('extensionTest', inputValue)
        alert(`Local storage set to ${localStorage.getItem('extensionTest')}`)
    });

    getLocalStorage.addEventListener('click', function() {
        alert(`Local storage set to ${localStorage.getItem('extensionTest')}`)
    });    
});