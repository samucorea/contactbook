'use strict';
function refreshPage() {
    window.location.href = window.location.pathname//This is a shortcut for reseting input values. we force a redirect.
}
function insertContact(db, contact) {

    db.setItem(contact.key, JSON.stringify(contact))//we save the contact on db with a key since the localStorage works as a dictionary.

    refreshPage()

}

function deleteContact(db, contact) {
    db.removeItem(contact.key)//remove the item from the localStorage using the key.
    refreshPage()//Again, a shortcut for displaying the data without the deleted contact.
}


function editContact(db, contact) {
    db.setItem('tempValues', JSON.stringify(contact))// We set the temporary values for the inputs.
    refreshPage()

}
function createContactNode(db, contact, parentNode) {

    //create html elements.
    const contactDiv = document.createElement('div')
    const nameh3 = document.createElement('h3')
    const phoneNumberDiv = document.createElement('div')
    const addressDiv = document.createElement('div')
    const deleteSpan = document.createElement('span')
    const editSpan = document.createElement('span')


    //add the different classes to the html elements.
    contactDiv.classList.add('contact')
    deleteSpan.classList.add('material-icons', 'icon', 'delete-button')
    editSpan.classList.add('material-icons', 'icon', 'edit-button')

    //add the text content for each element that will contain the contact information, and two icons to delete and edit a specific contact.
    nameh3.textContent = contact.name
    phoneNumberDiv.textContent = contact.phoneNumber
    addressDiv.textContent = contact.address
    deleteSpan.textContent = 'delete'
    editSpan.textContent = 'edit'


    //add events to the delete and edit button, which will execute their respective function.
    deleteSpan.onclick = () => deleteContact(db, contact)
    editSpan.onclick = () => editContact(db, contact)
    //append everything to parent div.
    contactDiv.append(nameh3, phoneNumberDiv, addressDiv, deleteSpan, editSpan)
    //append parent div to the parentNode of the document.
    parentNode.appendChild(contactDiv)
}


function loadContacts(parentNode, db) {
    //get all contact keys of localStorage.
    const contactKeys = Object.keys(db)
    //for each key, get the contact on the db, and create a contact node based on that information.
    //The data of the contact must be parsed.
    for (let key of contactKeys) {
        const contact = JSON.parse(db.getItem(key))
        createContactNode(db, contact, parentNode)

    }
}
