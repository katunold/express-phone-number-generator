import server from '../server';
import * as controllers from '../src/controllers';
import * as sinon from 'sinon';
import chai from 'chai';
import chaihttp from 'chai-http';

chai.use(chaihttp);
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
    beforeEach(() => {
        sandbox = sinon.createSandbox();
        unlink();
        sandbox.stub(fs, 'write').yields(null);
    });

    afterEach(() => {
        sandbox.restore();
        unlink();
    });

    it('should generate contacts', () => {
        chai.request(server)
          .get('/generate')
          .send()
          .end((err, res) => {
              expect(res).to.have.status(200);
              // noinspection BadExpressionStatementJS
              expect(fs.write).to.have.been.calledOnce;
          })
    });
});

