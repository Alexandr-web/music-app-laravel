export default class Cookie {
    add(name, value, stringify = false, days = 1) {
        const date = new Date();
        const data = stringify ? JSON.stringify(value) : value;

        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));

        const expires = `; expires=${date.toUTCString()}`;

        document.cookie = `${name}=${data} ${expires}; path=/`;
    }

    get(name, parse = false) {
        const nameEQ = `${name}=`;
        const ca = document.cookie.split(";");

        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];

            while (c.charAt(0) === " ") {
                c = c.substring(1, c.length);
            }

            if (c.indexOf(nameEQ) === 0) {
                const val = c.substring(nameEQ.length, c.length);

                return parse ? JSON.parse(val) : val;
            }
        }

        return null;
    }

    remove(name) {
        if (this.get(name)) {
            document.cookie = `${name}=; Max-Age=-99999999;`;
        }
    }
}