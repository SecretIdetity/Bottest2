const random = require('./random');

module.exports = {
    roll: function (a) {
        let b = a.toString();
        if (a.includes(":"))
            return "do not the dice";
        a = a.replaceAll("-", ":-").replaceAll("*", ":*").replaceAll("/", ":/").replaceAll("+", ":+");
        let ser = "";
        let it = 1;
        if (a.includes("t")) {
            let b = a.split("t");
            it = parseInt(b[0]);
            a = b[1];
            if (isNaN(it) || it < 1)
                return "i did not the dice";
        }
        if (it > 64)
            return "do not the dice, use the old roll";
        a = "+" + a;
        a = a.split(":");
        for (let j = 0; j < it; j++)
            ser += rull(a);
        return `[${b.replaceAll("*", "\\*")}]\n${ser}`;
    }
}

function rull(a) {
    let str = "";
    let rs = 0;
    for (let jk = 0; jk < a.length; jk++) {
        let op = '+';
        op = a[jk][0];
        let c = [...a[jk].substring(1).replaceAll("ev", "ev1").replaceAll("even", "ev1").replaceAll("od", "od1").replaceAll("odd", "od1").matchAll(/[a-z=<>]+\d+/g)]; //not elegant but whatever
        let b = 0;
        let amt = 0;
        let sid = 1;
        let ii = 1;
        let cs = false;
        let cff = false;
        let df = false;
        let sf = false;
        amt = a[jk].match(/^[+\-*\/]\d+/g)[0].substring(1);
        if (c.length == 0) {
            jk == 0 ? str += `[${amt}] ` : str += `${op == "*" ? "\\*" : op} [${amt}] `;
            rs = eval(rs + op + amt);
            continue;
        }
        let res = [];
        let sta = []; //-2 drop -1 fail 0 1 succ
        for (let k = 0; k < c.length; k++) {
            ev = '==';
            let d = c[k][0].match(/[a-z=<>]+/g)[0];
            let e = parseInt(c[k][0].match(/\d+/g)[0]);
            if (e > 4294967295)
                e = 4294967295;
            if (d.startsWith('i')) {
                ii = 1000;
                d = d.substring(1);
            }
            if (!d.startsWith("dl") && !d.startsWith("dh") && !d.startsWith("k")) {
                if (d.endsWith("he") || d.endsWith(">=")) {
                    ev = ">=";
                    d = d.substring(0, d.length - 2);
                }
                if (d.endsWith("le") || d.endsWith("<=")) {
                    ev = "<=";
                    d = d.substring(0, d.length - 2);
                }
                if (d.endsWith("h") || d.endsWith(">")) {
                    ev = ">";
                    d = d.substring(0, d.length - 1);
                }
                if (d.endsWith("l") || d.endsWith("<")) {
                    ev = "<";
                    d = d.substring(0, d.length - 1);
                }
            }
            switch (d) {
                case 'd':
                    sid = e;
                    for (let i = 0; i < amt; i++) {
                        res.push(random.random(sid) + 1);
                        sta.push(0);
                    }
                    break;
                case 'e':
                    let i = 0;
                    for (let j = 0; j < ii; j++) {
                        b = 0;
                        if (i == res.length)
                            continue;
                        for (; i < res.length; i++)
                            if (eval(res[i] + ev + e)) {
                                b++;
                            }
                        for (let i = 0; i < b; i++) {
                            res.push(random.random(sid) + 1);
                            sta.push(0);
                        }
                    }
                    break;
                case 'k': case 'kh':
                    e = res.length - e;
                case 'dl':
                    if (e > res.length)
                        e = res.length;
                    for (let i = 0; i < e; i++) {
                        sta[find(1, res, sta)] = -2;
                    }
                    break;
                case 'kl':
                    e = res.length - e;
                case 'dh':
                    if (e > res.length)
                        e = res.length;
                    for (let i = 0; i < e; i++) {
                        sta[find(0, res, sta)] = -2;
                    }
                    break;
                case 'r':
                    for (let j = 0; j < ii; j++) {
                        b = 0;
                        for (let i = 0; i < res.length; i++)
                            if (eval(res[i] + ev + e)) {
                                res[i] = random.random(sid) + 1;
                                b++;
                            }
                        if (b == 0)
                            continue;
                    }
                    break;
                case 'min':
                    if (e <= sid)
                        for (let i = 0; i < res.length; i++)
                            if (res[i] <= e)
                                res[i] = e;
                    break;
                case 'max':
                    if (e > 0)
                        for (let i = 0; i < res.length; i++)
                            if (res[i] >= e)
                                res[i] = e;
                    break;
                case 'cs':
                    cs = true;
                    for (let i = 0; i < res.length; i++)
                        if (sta[i] != -2) {
                            if (eval(res[i] + ev + e))
                                sta[i] = 1;
                        }
                    break;
                case 'ev':
                    cs = true;
                    for (let i = 0; i < res.length; i++)
                        if (sta[i] != -2) {
                            if (res[i] % 2)
                                sta[i] = 1;
                        }
                    break;
                case 'od':
                    cs = true;
                    for (let i = 0; i < res.length; i++)
                        if (sta[i] != -2) {
                            if (!res[i] % 2)
                                sta[i] = 1;
                        }
                    break;
                case 'cf':
                    cff = true;
                    df = false;
                    sf = false;
                    for (let i = 0; i < res.length; i++)
                        if (sta[i] != -2) {
                            if (eval(res[i] + ev + e))
                                sta[i] = -1;
                        }
                    break;
                case 'sf':
                    sf = true;
                    df = false;
                    cff = false;
                    for (let i = 0; i < res.length; i++)
                        if (sta[i] != -2) {
                            if (eval(res[i] + ev + e))
                                sta[i] = -1;
                        }
                    break;
                case 'df':
                    df = true;
                    sf = false;
                    cff = false;
                    for (let i = 0; i < res.length; i++)
                        if (sta[i] != -2) {
                            if (eval(res[i] + ev + e))
                                sta[i] = -1;
                        }
                    break;
                default:
                    break;
            }
        }
        jk == 0 ? str += `[` : str += `${op == "*" ? "\\*" : op} [`;
        let rss = 0;
        for (let i = 0; i < res.length; i++) {
            switch (sta[i]) {
                case -2:
                    str += `~~${res[i]}~~, `;
                    break;
                case -1:
                    str += `__${res[i]}__, `;
                    if (cff)
                        rss++;
                    if (sf)
                        rss -= res[i];
                    if (df)
                        rss--;
                    break;
                case 1:
                    str += `**${res[i]}**, `;
                    if (cs)
                        rss++;
                    else
                        rss += res[i];
                    break;
                default:
                    str += `${res[i]}, `;
                    if (!cs && !cff)
                        rss += res[i];
                    break;
            }
        }
        if (res.length == 0)
            str += 0;
        str += `] `;
        str = str.replace(", ]", "]");
        rs = eval(rs + op + rss);
    }
    return str + `= ${rs}\n`;
}

function find(a, b, sta) {
    let c = 0;
    let d = 0;
    if (a) {
        d = Infinity;
        for (let i = 0; i < b.length; i++) {
            if (sta[i] != -2 && b[i] < d) {
                c = i;
                d = b[i];
            }
        }
    }
    else {
        for (let i = 0; i < b.length; i++) {
            if (sta[i] != -2 && b[i] > d) {
                c = i;
                d = b[i];
            }
        }
    }
    return c;
}