import * as uuidLib from 'node-uuid';
import * as momentLib from 'moment';

export function coalesce<T>(val: T, defaultVal: T): T {
    return val === null || typeof val === 'undefined' ? defaultVal : val;
}

export function uuid(): string {
    return uuidLib.v4();
}

export function moment(): moment.Moment {
    return momentLib();
}