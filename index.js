window.addEventListener('click', event => {
    if (event.target.tagName === 'BUTTON') {
        document.querySelector('.slide-container').className =
        'slide-container ' + event.target.getAttribute('value')
    }
})

// get conatiner
const conatiner = document.querySelector('.slide-container')

// method to get slide
const getSlide = () => {
    // return calculated slide index
    return parseInt(conatiner.className[conatiner.className.lastIndexOf('slide-') + 6])
}

// method to get step
const getStep = () => {
    // return calculated step index
    return parseInt(conatiner.className[conatiner.className.lastIndexOf('step-') + 5])
}

// method to set slide
const setSlide = index => {
    // set container class
    conatiner.className = `slide-container slide-${index} step-1`
}

// method to set step
const setStep = index => {
    // set container class
    conatiner.className = `slide-container slide-${getSlide()} step-${index}`
}

// click event listener
conatiner.addEventListener('click', event => {
    // get target element
    const target = event.target
    // get step index
    let step = getStep()
    // check for swipe text
    if (target.classList.contains('text-swipe-button')) {
        // get next step
        step += target.classList.contains('left') ? -1 : 1
        // reset step if need
        if(step > 3) { step = 1 }
        // reverse step if need
        if(step < 1) { step = 3 }
        // set next step
        setStep(step)
    }
})