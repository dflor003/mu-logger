export class Utils {
    static coalesce<T>(val: T,  defaultVal: T) {
        return val === null || typeof val === 'undefined' ? defaultVal : val;
    }
}