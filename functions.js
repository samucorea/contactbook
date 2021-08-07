function insertContact(db, contact) {

    db.setItem(contact.key, JSON.stringify(contact))

    location.replace('/')

}

function deleteContact(db, contact) {
    db.removeItem(contact.key)
    location.replace('/')
}

function setTemporaryInputValues(db, contact) {

    db.setItem('tempValues', JSON.stringify(contact))

}


function editContact(db, contact) {
    deleteContact(db, contact)
    setTemporaryInputValues(db, contact)

}
function createContactNode(db, contact, parentNode) {
    const contactDiv = document.createElement('div')
    const nameh3 = document.createElement('h3')
    const phoneNumberDiv = document.createElement('div')
    const addressDiv = document.createElement('div')
    const deleteSpan = document.createElement('span')
    const editSpan = document.createElement('span')



    contactDiv.classList.add('contact')
    deleteSpan.classList.add('material-icons', 'icon')
    editSpan.classList.add('material-icons')


    nameh3.textContent = contact.name
    phoneNumberDiv.textContent = contact.phoneNumber
    addressDiv.textContent = contact.address
    deleteSpan.textContent = 'delete'
    editSpan.textContent = 'edit'


    editSpan.style.cursor = 'pointer'


    deleteSpan.onclick = () => deleteContact(db, contact)
    editSpan.onclick = () => editContact(db, contact)

    contactDiv.append(nameh3, phoneNumberDiv, addressDiv, deleteSpan, editSpan)

    parentNode.appendChild(contactDiv)
}


function loadContacts(parentNode, db) {
    const contactKeys = Object.keys(db)

    for (let key of contactKeys) {
        const contact = JSON.parse(db.getItem(key))
        createContactNode(db, contact, parentNode)

    }
}
