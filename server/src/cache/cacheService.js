const cache = new Map();

const DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes

const get = (key) => {
    const item = cache.get(key);

    if (!item) return null;

    if (Date.now() > item.expiry) {
        cache.delete(key);
        return null;
    }

    return item.value;
};

const set = (key, value, ttl = DEFAULT_TTL) => {
    cache.set(key, {
        value,
        expiry: Date.now() + ttl
    });
};

const has = (key) => {
    return get(key) !== null;
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