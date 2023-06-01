// get conatiner
const conatiner = document.querySelector('.slide-container')

// method to get slide
const getSlide = () => {
    // get class name
    const name = conatiner.className
    // return calculated slide index
    return parseInt(name[name.lastIndexOf('slide-') + 6])
}

// method to get step
const getStep = () => {
    // get class name
    const name = conatiner.className
    // return calculated step index
    return parseInt(name[name.lastIndexOf('step-') + 5])
}

// method to set slide
const setSlide = (index, step = 1) => {
    // set container class
    conatiner.className = `slide-container slide-${index} step-${step}`
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
        if (step > 3) { step = 1 }
        // reverse step if need
        if (step < 1) { step = 3 }
        // set next step
        setStep(step)
    }
    // check for snap card
    if(target.classList.contains('snap-item')) {
        // get step on attribute
        step = parseInt(target.getAttribute('step'))
        // set next step
        setStep(step)
    }
})

// slides and steps array
const steps = [
    [1, 1],
    [2, 1],
    [3, 1], [3, 2], [3, 3],
    [4, 1], [4, 2], [4, 3],
    [5, 1]
]

// method to set slide
const setSlider = index => {
    // check index in steps
    if (index in steps) {
        // return if busy or set busy state
        if (states.busy) { return } else { states.busy = true }
        // update index
        states.index = index
        // set slide by index
        setSlide(...steps[index])
        // timeout and release busy state 
        setTimeout(() => states.busy = false, 400)
    } else {
        // deactive slider
        states.active = false
        // reset index
        states.index = null
    }
}

// slide states
const states = { active: false, index: null, busy: false }

// window on scroll passive listener
window.addEventListener('wheel', event => {
    // get wheel direction
    const direction = event.deltaY > 0 ? 'down' : 'up'
    // get container bound
    const bound = conatiner.getBoundingClientRect()
    // get container height
    const height = bound.height
    // get bound position
    const position = bound.top < 900 && bound.top > 100
        ? 'top' : (bound.top + height) > -600 && (bound.top + height) < 200
            ? 'bottom' : null
    // method to prevent
    const prevent = () => {
        // prevent default(
        event.preventDefault()
        // stop propagation
        event.stopPropagation()
        // return false
        return false
    }
    // check active state
    if (states.active && bound.top === 0) {
        // lock scroll position to container
        conatiner.scrollIntoView()
        // check busy state
        if (states.busy === false) {
            // set index by direction
            setSlider(states.index + (direction === 'down' ? 1 : -1))
        }
        // return prevent
        return prevent()
    } else if (states.active && bound.top !== 0) {
        // lock scroll position to container
        conatiner.scrollIntoView()
        // return prevent
        return prevent()
    } else {
        // check wheel direction and position
        if (direction === 'down' && position === 'top' && bound.top !== 0) {
            // set active state
            states.active = true
            // lock scroll position to container
            conatiner.scrollIntoView()
            // start slider from top
            setSlider(0)
            // return prevent
            return prevent()
        } else if (direction === 'up' && position === 'bottom' && bound.top !== 0) {
            // set active state
            states.active = true
            // lock scroll position to container
            conatiner.scrollIntoView()
            // start slider from bottom
            setSlider(steps.length - 1)
            // return prevent
            return prevent()
        }
    }
    // check active state
    if (states.active) {
        // lock scroll position to container
        conatiner.scrollIntoView()
        // prevent event
        return prevent()
    }
}, { passive: false })