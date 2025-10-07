export const validateEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

export const showMessage = (element, message, type) => {
    element.textContent = message
    element.className = `message ${type}`
}