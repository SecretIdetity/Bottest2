const aes = require('./aes');
let rnd = [];
let ctr = 0;

module.exports = {
    set: function (a) {
        ctr = a;
        return ctr;
    }
}

module.exports = {
    get: function () {
        return ctr;
    }
}

module.exports = {
    length: function () {
        return rnd.length;
    }
}

module.exports = {
    reset: function(a) {
        ctr = a;
        rnd = [];
        return ctr;
    }
}

module.exports = {
    random: function (a) {
        if (rnd.length == 0) {
            let b = aes.aes([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], [0x01, 0x23, 0x45, 0x67, 0x89, 0xab, 0xcd, 0xef, 0, 0, 0, 0, ctr & 0xff000000, ctr & 0xff0000, ctr & 0xff00, ctr & 0xff]);
            ctr++;
            while (b.length > 0) {
                rnd.push(b.pop() * 0x01000000 + b.pop() * 0x00010000 + b.pop() * 0x00000100 + b.pop() * 0x00000001);
            }
        }
        return Math.floor((rnd.pop() / 0x100000000) * a);
    }
}