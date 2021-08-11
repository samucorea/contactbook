
//Queries to get input values, insert button and error message.
const contactName = document.querySelector('#name')
const phoneNumber = document.querySelector('#phone-number')
const address = document.querySelector('#address')

const overlay = document.querySelector('.overlay')
const editContactName = document.querySelector('#edit-name')
const editPhoneNumber = document.querySelector('#edit-phone-number')
const editAddress = document.querySelector('#edit-address')
const editBtn = document.querySelector('#edit-btn')

const insertBtn = document.querySelector('#insert-btn')
const errorMessage = document.querySelector('.error-message')

const contactList = document.querySelector('.contact-list')
const db = window.localStorage


//Get temporary values of localStorage in case the user decides to edit a contact
const tempValues = JSON.parse(db.getItem('tempValues'))

//If tempValues are not null, that means that the user wanted to edit some contact. In that case, add the values of that contact
//to the input elements, so the user can edit them and re-insert them.
if (tempValues) {
    overlay.style.display = 'initial'
    editContactName.value = tempValues.name
    editPhoneNumber.value = tempValues.phoneNumber
    editAddress.value = tempValues.address

    editBtn.onclick = () => {
        const editedContact = {
            key: tempValues.key,
            name: editContactName.value,
            phoneNumber: editPhoneNumber.value,
            address: editAddress.value
        }

        insertContact(db, editedContact)
        overlay.style.display = 'none'
        db.removeItem('tempValues')
    }

}


// Shortcut for inserting a contact with Enter key. To avoid repeating logic, simply click the insert button.
document.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        if (overlay.style.display === 'initial') {
            editBtn.click()

        }
        else {
            insertBtn.click()
        }

    }

})

// Event  clicking insertBtn
insertBtn.onclick = () => {
    //If  any values are empty, show the user an error message that tells them to complete any empty values.
    if (contactName.value === '' || phoneNumber.value === '' || address.value === '') {
        errorMessage.style.display = 'initial'

        return;
    }
    //We'll create a contact object with all the information to simplify the data processing.
    const contact = {
        key: Math.random(1, 100),//The key will be useful when entering the information on localStorage.
        name: contactName.value,
        phoneNumber: phoneNumber.value,
        address: address.value,
    }


    insertContact(db, contact)//We insert the contact to the local storage or db.
}

loadContacts(contactList, db)//Load all contacts of local storage.