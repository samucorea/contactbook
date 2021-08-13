'use strict';
class Contact {

    constructor(name, phoneNumber, address, key = null) {
        this.key = key || Math.random(1, 100);
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.address = address;
    }

}