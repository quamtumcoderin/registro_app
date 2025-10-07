export function showLoader(container) {
    const loader = document.createElement('div')
    loader.className = 'loader'
    loader.innerHTML = `<div class="spinner"></div>`
    container.appendChild(loader)
}

export function hideLoader(container) {
    const loader = container.querySelector('.loader')
    if (loader) loader.remove()
}