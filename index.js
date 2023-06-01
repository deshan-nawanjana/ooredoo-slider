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
    if (target.classList.contains('snap-item')) {
        // get step on attribute
        step = parseInt(target.getAttribute('step'))
        // set next step
        setStep(step)
    }
})

// slides and steps array
const steps = [
    { slide: 1, step: 1 },
    { slide: 2, step: 1 },
    { slide: 3, step: 1 },
    { slide: 3, step: 2 },
    { slide: 3, step: 3 },
    { slide: 4, step: 1 },
    { slide: 4, step: 2 },
    { slide: 4, step: 3 },
    { slide: 5, step: 1 }
]

// main ribbon height
let ribbon = 100
// wheel height
let wheel = 600
// zero delta flag
let zdelta = false
// mobile mode flag
let mobile = false
// slider active state
let active = false
// last step by update
let last = null

const updateSlidePosition = loop => {
    // return in mobile mode
    if (mobile) { return }
    // get container bound
    const bound = conatiner.getBoundingClientRect()
    // calculate values
    const position = bound.top - ribbon
    const absolute = Math.abs(position)
    const duration = wheel * steps.length
    // check bound position
    if (position < 0 && absolute < duration) {
        // relocate container position in active
        conatiner.style.paddingTop = absolute + 'px'
        // calculate step index from position
        const index = parseInt(steps.length * absolute / duration)
        // set slide if available
        if (index in steps && last !== index) {
            last = index
            // get item from steps
            const item = steps[index]
            // set slide and step
            setSlide(item.slide, item.step)
        }
        // update active state
        active = true
    } else if (absolute > duration) {
        // complete container position in lower space
        conatiner.style.paddingTop = duration + 'px'
        // update active state
        active = false
    } else {
        // reset container position in upper space
        conatiner.style.paddingTop = '0px'
        // update active state
        active = false
    }
    // request next frame for loop mood
    if (loop) { requestAnimationFrame(updateSlidePosition) }
}

// update slider on scroll
window.addEventListener('scroll', () => updateSlidePosition(false))
// start update slider loop on window load
window.addEventListener('load', () => updateSlidePosition(true))

// none passive wheel event listener
window.addEventListener('wheel', event => {
    // update zero delta flag
    if (event.deltaY === 0) { zdelta = true }
    // set wheel height by zero delta
    wheel = zdelta ? 550 : Math.abs(event.deltaY) * 4
    // check for active state
    if (active && last !== steps.length - 1) {
        // set manual scroll position
        document.documentElement.scrollTop += event.deltaY
        // prevent default
        event.preventDefault()
        // stop propagation
        event.stopPropagation()
        // return false
        return false
    }
}, { passive: false })