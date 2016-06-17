import * as sinon from 'sinon';
import mu from '../src/index';
import {expect} from 'chai';
import {ILogMessage} from '../src/log-message';
import {configManager} from '../src/config/config-manager';

describe('configuration', () => {
    it('should support adding a custom adapter as a function', () => {
        // Arrange
        const adapter = sinon.spy();

        // Act
        mu.config('test', cfg => cfg.useAdapter(adapter));

        // Assert
        const config = configManager.getConfig('test');
        expect(config).not.to.be.null;
        expect(config.adapters).to.have.lengthOf(1);
        expect(config.adapters[0].log).to.equal(adapter);
    });

    it('should support adding a custom adapter as a class', () => {
        // Arrange
        class MyAdapter {
            log(msg: ILogMessage): void {
                console.log(msg);
            }
        }
        const adapter = new MyAdapter();

        // Act
        mu.config('test', cfg => cfg.useAdapter(adapter));

        // Assert
        const config = configManager.getConfig('test');
        expect(config).not.to.be.null;
        expect(config.adapters).to.have.lengthOf(1);
        expect(config.adapters[0]).to.equal(adapter);
    });
});