
function deepCopy(obj, hash = new WeakMap()) {
    if (hash.has(obj)) return hash.get(obj);

    let newObj;

    const type = Object.prototype.toString.call(obj);

    switch (type) {
        case '[object Array]':
            newObj = [];
            break;
        case '[object Object]':
            newObj = {};
            break;
        case '[object Date]':
            newObj = new Date(obj.getTime());
            break;
        case '[object Map]':
            newObj = new Map(Array.from(obj.entries()));
            break;
        case '[object Set]':
            newObj = new Set(Array.from(obj));
            break;
        default:
            return obj;
    }

    hash.set(obj, newObj);


    for (let key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            newObj[key] = deepCopy(obj[key], hash);
        }
    }

    return newObj;
}

const obj = {
    name: 'John',
    age: 30,
    address: {
        city: 'New York',
        country: 'USA'
    },
    hobbies: ['reading', 'hiking'],
    sayHello() {
        console.log('Hello!');
    }
};

const copiedObj = deepCopy(obj);
console.log(copiedObj);