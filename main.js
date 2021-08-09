
//Queries to get input values, insert button and error message.
const contactName = document.querySelector('#name')
const phoneNumber = document.querySelector('#phone-number')
const address = document.querySelector('#address')
const insertBtn = document.querySelector('#insert-btn')
const errorMessage = document.querySelector('.error-message')

const contactList = document.querySelector('.contact-list')
const db = window.localStorage


//Get temporary values of localStorage in case the user decides to edit a contact
const tempValues = JSON.parse(db.getItem('tempValues'))

//If tempValues are not null, that means that the user wanted to edit some contact. In that case, add the values of that contact
//to the input elements, so the user can edit them and re-insert them.
if (tempValues) {
    contactName.value = tempValues.name
    phoneNumber.value = tempValues.phoneNumber
    address.value = tempValues.address
    db.removeItem('tempValues')//remove the tmp values.
}


// Shortcut for inserting a contact with Enter key. To avoid repeating logic, simply click the insert button.
document.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        insertBtn.click()
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