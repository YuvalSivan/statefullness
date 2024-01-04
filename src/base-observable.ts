import { Observable, Observer } from "./observable";


export abstract class BaseObservable<T> implements Observable<T> {
    private observers = new Set<Observer<T>>();
    private _current: T;

    constructor(initialValue: T) {
        this._current = initialValue;
    }

    public subscribe(observer: Observer<T>): void {
        this.observers.add(observer);
    }

    public unsubscribe(observer: Observer<T>): void {
        this.observers.delete(observer);
    }

    public map<U>(fn: (value: Observable<T>) => Observable<U>): Observable<U> {
        return fn(this);
    }

    public get current(): T {
        return this._current;
    }

    protected set current(value: T) {
        this._current = value;
        this.observers.forEach(observer => observer(value));
    }
}