import generator from '../helpers';
import * as fs from 'fs';
const generateContacts = (req, res) => {
    const contacts = generator(10000);
    const contactsFile = fs.openSync('./contacts.json', 'w', 0o777);
    fs.write(
      contactsFile,
      Buffer.from(JSON.stringify({ contacts }), 'utf-8'),
      err => console.log(err)
    );
    res.render('index', { title: 'Express' });
};

export {
    generateContacts,
    fs
};
