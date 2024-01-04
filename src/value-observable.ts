import { BaseObservable } from "./base-observable";


export class ValueObservable<T> extends BaseObservable<T> {
    constructor(initialValue: T) {
        super(initialValue);
    }

    public set(value: T): void {
        this.current = value;
    }   
}