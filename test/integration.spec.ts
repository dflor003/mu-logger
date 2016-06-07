import {expect} from 'chai';
import * as sinon from 'sinon';
import mu from '../src/index';
import {ILogAdapter} from '../src/loggers/log-adapter';
import {ILogMessage} from '../src/log-message';
import {configManager} from '../src/config/config-manager';

class LogBucket implements ILogAdapter {
    messages: ILogMessage[] = [];

    log(message: ILogMessage): void {
        this.messages.push(message);
    }
}

describe('mu-logger', () => {

    beforeEach(() => configManager.reset());

    describe('config', () => {

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

    describe('logging', () => {
        let logBucket: LogBucket = null;

        beforeEach(() => {
            logBucket = new LogBucket();
            mu.config('test', mu => mu.useAdapter(logBucket));
        });

        it('should process log messages', () => {
            let logger = mu.logger('my-namespace', 'test');
            logger.log('Hello world!');
            logger.log('Goodbye world!');

            expect(logBucket.messages).to.have.lengthOf(2);
            expect(logBucket.messages[0].message).to.equal('Hello world!');
            expect(logBucket.messages[1].message).to.equal('Goodbye world!');
        });
    });
});