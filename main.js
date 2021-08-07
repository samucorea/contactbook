const contactName = document.querySelector('#name')
const phoneNumber = document.querySelector('#phone-number')
const address = document.querySelector('#address')
const insertBtn = document.querySelector('#insert-btn')

const contactList = document.querySelector('.contact-list')
const db = window.localStorage

const tempValues = JSON.parse(db.getItem('tempValues'))

if (tempValues) {
    contactName.value = tempValues.name || ''
    phoneNumber.value = tempValues.phoneNumber || ''
    address.value = tempValues.address || ''
    db.removeItem('tempValues')
}


phoneNumber.addEventListener('keydown', e => {
    if (isNaN(e.target.value)) {
        e.preventDefault()
    }
    else {
        console.log('yes')
    }
})

document.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        insertBtn.click()
    }
})
insertBtn.onclick = () => {
    if (contactName.value === '' || phoneNumber.value === '' || address.value === '') return;
    const contact = {
        key: Math.random(1, 100),
        name: contactName.value,
        phoneNumber: phoneNumber.value,
        address: address.value,
    }


    insertContact(db, contact)
}

loadContacts(contactList, db)