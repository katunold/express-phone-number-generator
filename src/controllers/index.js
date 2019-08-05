import { generator, quickSort} from '../helpers';
import * as fs from 'fs';

const readContacts = (req, res) => {
    const { sort } = req.params;
    let numbers;
    let highestContact;
    let lowestContact;
    fs.readFile('contacts.json', { encoding: 'utf-8', flag: 'r' }, (err, data ) => {
        if (err) {
            return res.render('index', {
                error: 'Please Generate the Contacts'
            });
        }
        try {
            const { contacts } = JSON.parse(data);
            const dataStats = quickSort(contacts, 0, contacts.length - 1);
            highestContact = dataStats[contacts.length - 1];
            lowestContact = dataStats[0];
            numbers = sort === 'descending'
              ? contacts.reverse()
              : contacts;
        } catch (e) {
            numbers = [];
        }

        return res.render('index',
          { title: 'Phone Number Generator',
              numbers,
              totalContacts: numbers.length,
              highestContact,
              lowestContact
          }
        );

    })
};

const generateContacts = (req, res) => {
    const contacts = generator(10000);
    const contactsFile = fs.openSync('./contacts.json', 'w', 0o777);
    fs.write(
      contactsFile,
      Buffer.from(JSON.stringify({ contacts }), 'utf-8'),
      err => console.log(err)
    );
    readContacts(req, res);
    // res.render('index', { title: 'Phone Number Generator' });
};

export {
    generateContacts,
    readContacts,
    fs
};
