function insertContact(db, contact) {

    db.setItem(contact.key, JSON.stringify(contact))

    location.replace('/')

}

function createContactNode(contact) {
    const contactDiv = document.createElement('div')
    const nameh3 = document.createElement('h3')
    const phoneNumberDiv = document.createElement('div')
    const addressDiv = document.createElement('div')
    const deleteSpan = document.createElement('span')

    contactDiv.classList.add('contact')
    deleteSpan.classList.add('material-icons', 'icon')

    nameh3.textContent = contact.name
    phoneNumberDiv.textContent = contact.phoneNumber
    addressDiv.textContent = contact.address
    deleteSpan.innerHTML = 'delete'

    contactDiv.append(nameh3, phoneNumberDiv, addressDiv, deleteSpan)

    return contactDiv
}

function loadContacts(parentNode, db) {
    const contactKeys = Object.keys(db)

    for (let key of contactKeys) {
        const contact = JSON.parse(db.getItem(key))
        const contactElement = createContactNode(contact)
        parentNode.appendChild(contactElement)
    }
}

