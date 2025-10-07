import { initForm } from '../../modules/formController.js'
import { API_URL } from '../../config/settings.js'
import { createDragon } from './dragon.js'

createDragon()

document.addEventListener('DOMContentLoaded', () => {
    initForm(API_URL)
})

const stars = document.getElementById('stars')
let mouseX = 0, mouseY = 0

document.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth - .5) * 2
    const y = (e.clientY / window.innerHeight - .5) * 2

    mouseX = x * 10
    mouseY = y * 10

    stars.style.transform = `translate(${mouseX}px, ${mouseY}px) scale(1.02)`
})