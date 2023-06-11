// slider wrapper element
const wrapper = document.querySelector('.slider-wrapper')
// slider container element
const container = document.querySelector('.slider-container')
// navbar element
const navbar = document.querySelector('.nav-wrap')

// slide steps array
const steps = [
    { parent: 1, child: 1 },
    { parent: 2, child: 1 },
    { parent: 3, child: 1 },
    { parent: 3, child: 2 },
    { parent: 3, child: 3 },
    { parent: 4, child: 1 },
    { parent: 4, child: 2 },
    { parent: 4, child: 3 },
    { parent: 5, child: 1 }
]

// current step
let current = steps[0]

// method to set slider steps
const sliderStep = (steps, override = false) => {
    // return non override sliding with manual child steps
    if (current.parent === 5 && steps.parent === 5 && override === false) { return }
    if (current.parent === 1 && steps.parent === 1 && override === false) { return }
    // remember current steps
    current = steps
    // set step attribute
    container.setAttribute('step', steps.parent + ':' + steps.child)
}

// click event listener
window.addEventListener('click', event => {
    // get target element
    const target = event.target
    // clone current step
    const step = Object.assign({}, current)
    // check for swipe text
    if (target.classList.contains('text-swap-button')) {
        // update next step
        step.child += target.classList.contains("left") ? -1 : 1
        // reset step if need
        if (step.child > 2) { step.child = 1 }
        // reverse step if need
        if (step.child < 1) { step.child = 2 }
        // set slider step
        sliderStep(step, true)
    }
    // check for screen card
    if (target.classList.contains('screen-item')) {
        // set child from attribute
        step.child = parseInt(target.getAttribute('child'))
        // set slider step
        sliderStep(step, true)
    }
})

// method to update slider
const updateSlider = () => {
    // get navbar height
    const navbar_height = navbar.getBoundingClientRect().height
    // set navbar height property
    wrapper.style.setProperty('--navbar-height', navbar_height.toFixed(4) + 'px')
    // get wrapper bounding rect
    const wrapper_rect = wrapper.getBoundingClientRect()
    // get header position of wrapper
    const head_position = wrapper_rect.top
    // get footer position of wrapper
    const foot_position = wrapper_rect.bottom
    // get wrapper height
    const wrapper_height = wrapper_rect.height
    // check for header overtake
    if (head_position < navbar_height) {
        // set active state
        container.setAttribute('active', '')
    } else {
        // remove active state
        container.removeAttribute('active')
        // set first slider step
        sliderStep(steps[0], true)
    }
    // check for footer overtake
    if (foot_position < window.innerHeight) {
        // calculate custom top position
        const top = (window.innerHeight - foot_position - navbar_height) * -1
        // set container top position
        container.style.top = top + 'px'
        // set last slider step
        sliderStep(steps[steps.length - 1])
    } else {
        // remove custom styles
        container.removeAttribute('style')
    }
    // check for inner scroll
    if (head_position < navbar_height && foot_position > window.innerHeight) {
        // get current position
        const crr_position = Math.abs(head_position - navbar_height)
        // get maximum position
        const max_position = wrapper_height - window.innerHeight + navbar_height
        // get step index
        const step_index = parseInt(steps.length * crr_position / max_position)
        // set current slider step
        sliderStep(steps[step_index])
    }
}

// update silder onscroll
window.addEventListener('scroll', updateSlider)

// update silder onload
window.addEventListener('load', updateSlider)

// update silder resize
window.addEventListener('resize', updateSlider)

// initial wrapper display
wrapper.removeAttribute('hidden')

// initial slider update
updateSlider()