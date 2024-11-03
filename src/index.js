class Stream {
    constructor(initValue) {
        this.value = initValue;
        this.subscribers = [];
    }

    
    map(fn) {
        // create a new stream with transformed value
        let stream = new Stream(fn(this.value));
        // add the new stream's emit method as a subscriber to the current stream
        this.subscribers.push(stream.emit.bind(stream));
        return stream;
    }

    emit(value) {
        this.value = value;
        this.subscribers.forEach(fn => fn(value));
    }
}

let priceStream = new Stream(100);
let discountedPrice = priceStream.map(x => x * 0.5); // 50 percent discount

priceStream.emit(180);
console.log("Initial price", priceStream.value);
console.log("Discounted price", discountedPrice.value);

priceStream.emit(200);
console.log("Initial price", priceStream.value);
console.log("Discounted price", discountedPrice.value);

