const contactName = document.querySelector('#name')
const phoneNumber = document.querySelector('#phone-number')
const address = document.querySelector('#address')
const insertBtn = document.querySelector('#insert-btn')

const contactList = document.querySelector('.contact-list')
const db = window.localStorage


insertBtn.onclick = () => {
    const contact = {
        key: Math.random(1, 100),
        name: contactName.value,
        phoneNumber: phoneNumber.value,
        address: address.value,
    }


    insertContact(db, contact)
}

loadContacts(contactList, db)