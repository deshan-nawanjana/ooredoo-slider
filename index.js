window.addEventListener('click', event => {
    if (event.target.tagName === 'BUTTON') {
        document.querySelector('.slide-container').className =
        'slide-container ' + event.target.getAttribute('value')
    }
})