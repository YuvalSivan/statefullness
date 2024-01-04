import { BaseObservable } from "./base-observable";
import { Observable } from "./observable";


export class SelectObservable<T, U> extends BaseObservable<U> {
    private _sourceChangeCallback: (value: T) => void;

    constructor(
        private source: Observable<T>,
        initialValue: U,
        private mapFn: (value: T) => U,
        private compare: (a: U, b: U) => boolean = (a, b) => a === b
    ) {
        super(initialValue);

        this._sourceChangeCallback = this.onSourceChange.bind(this);

        source.subscribe(this._sourceChangeCallback);
    }

    public close(): void {
        this.source.unsubscribe(this._sourceChangeCallback);
    }

    private onSourceChange(value: T): void {
        const newValue = this.mapFn(value);

        if (!this.compare(newValue, this.current)) {
            this.current = newValue;
        }
    }
}