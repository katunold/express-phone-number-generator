const generator = (maxRange) => {
    const contactsArr = [];
    let phoneNumber;

    while (contactsArr.length < maxRange) {
        phoneNumber = `0${Math.random() * (10 ** 9) << 0}`;
        phoneNumber += '0'.repeat(10 - phoneNumber.length);
        contactsArr.indexOf(phoneNumber) === -1
          ? contactsArr.push(phoneNumber)
          : null;
    }
    return contactsArr;
};

export default generator;
