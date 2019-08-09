import * as controllers from '../src/controllers';
import * as sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chai from 'chai';
import chaihttp from 'chai-http';

chai.use(chaihttp);
chai.use(sinonChai);
const { expect } = chai;

const { fs } = controllers;

const unlink = () => {
    try {
        fs.unlinkSync('contacts.json');
    } catch (e) {
        // pass
    }
};

describe('generate route', () => {
    let sandbox;
    let res;
    beforeEach(() => {
        sandbox = sinon.createSandbox();
        unlink();
        sandbox.stub(fs, 'write').yields(null);
        res = {
            render: sinon.spy()
        };
    });

    afterEach(() => {
        sandbox.restore();
        unlink();
    });

    it('should generate contacts', () => {
        controllers.generateContacts({ params: {} }, res);
        expect(fs.write).to.have.been.calledOnce;
    });

    it('should return a list of numbers in ascending order', () => {
        sandbox.stub(fs, 'readFile').yields(null, '{"contacts": ["0100047120", "0100000121", "0100048309", "0100016834"]}');
        controllers.readContacts({params: {}}, res);
        expect(fs.readFile).to.have.been.calledOnce;
        expect(res.render).to.have.been.calledOnceWith(
          'index',
          {
              highestContact: '0100048309',
              lowestContact: '0100000121',
              numbers: ['0100000121', '0100016834', '0100047120', '0100048309'],
              title: "Phone Number Generator",
              totalContacts: 4
          }
        );
    });

    it('should return a list of numbers in descending order', () => {
        sandbox.stub(fs, 'readFile').yields(null, '{"contacts": ["0100047120", "0100000121", "0100048309", "0100016834"]}');
        controllers.readContacts({params: { sort: 'descending'}}, res);
        expect(fs.readFile).to.have.been.calledOnce;
        expect(res.render).to.have.been.calledOnceWith(
          'index',
          {
              highestContact: "0100048309",
              lowestContact: "0100000121",
              numbers: ["0100048309", "0100047120", "0100016834", "0100000121"],
              title: "Phone Number Generator",
              totalContacts: 4
          }
        );
    });

    it('should return an empty array', () => {
        sandbox.stub(fs, 'readFile').yields(null, '{"contacts": []}');
        controllers.readContacts({ params: {} }, res);
        expect(fs.readFile).to.have.been.calledOnce;
    });

    it('should return an empty list if no contacts were generated', () => {
        sandbox.stub(fs, 'readFile').yields({});
        controllers.readContacts({ params: {} }, res);
        expect(fs.readFile).to.have.been.calledOnce;
        expect(res.render).to.have.been.calledOnceWith(
          'index',
          { error: 'Please Generate the Contacts' }
        );
    });

});

