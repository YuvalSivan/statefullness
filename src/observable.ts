
export type Observer<T> = (value: T) => void | Promise<unknown>;

export interface Observable<T> {
    subscribe(observer: Observer<T>): void;
    unsubscribe(observer: Observer<T>): void;

    readonly current: T;

    map<U>(fn: (value: Observable<T>) => Observable<U>): Observable<U>;
}