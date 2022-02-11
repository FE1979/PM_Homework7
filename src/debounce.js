const debounce = (fn, time = 500) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), time)
    }
}

module.exports = { debounce }