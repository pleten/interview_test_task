'use strict';

module.exports = function () {
    return actor({

        /**
         * Check multiple texts are NOT on the page, up to second level of nesting
         *
         * @param {object} texts - given texts
         */
        seeMany(texts) {
            Object.keys(texts).forEach((textKey) => {
                let text = texts[textKey];

                if (text.hasOwnProperty('self')) {
                    if (Object.getPrototypeOf(text) !== Object.prototype)
                        Object.keys(text).forEach((nestedKey) => {
                            this.see(text[nestedKey]);
                        });
                } else if (Object.getPrototypeOf(text) !== Object.prototype) {
                    this.see(text);
                }
            });
        },
    });
}
