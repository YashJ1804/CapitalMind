const cache = new Map();

const get = (key) => {
    return cache.get(key);
};

const set = (key, value) => {
    cache.set(key, value);
};

const has = (key) => {
    return cache.has(key);
};

const remove = (key) => {
    cache.delete(key);
};

const clear = () => {
    cache.clear();
};

module.exports = {
    get,
    set,
    has,
    remove,
    clear
};