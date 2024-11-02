class Steam {
    constructor(value) {
        this.value = value;
        this.subscribers = [];
    }

    map(fn) {
        return new Steam(fn(this.value));
    }

    emit(value) {
        this.value = value;
        this.subscribers.forEach(fn => fn(value));
    }
}

let nums = new Steam(1);
let doubleNums = nums.map(x => x * 2);

doubleNums.emit(2);
nums.emit(3);
