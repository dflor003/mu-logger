import {expect} from 'chai';
import {ILogMessage} from '../src/log-message';
import {ILogAdapter} from '../src/loggers/log-adapter';
import {mu} from '../src/index';

class LogBucket implements ILogAdapter {
    messages: ILogMessage[] = [];

    log(message: ILogMessage): void {
        this.messages.push(message);
    }
}

describe('logging', () => {
    let logBucket: LogBucket = null;

    beforeEach(() => {
        logBucket = new LogBucket();
        mu.config('test', mu => mu.useAdapter(logBucket));
    });

    it('should process log messages', () => {
        // Arrange
        let logger = mu.logger('my-namespace', 'test');

        // Act
        logger.log('Hello world!');
        logger.log('Goodbye world!');

        // Assert
        expect(logBucket.messages).to.have.lengthOf(2);
        expect(logBucket.messages[0].message).to.equal('Hello world!');
        expect(logBucket.messages[1].message).to.equal('Goodbye world!');
    });
});