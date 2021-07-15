'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {
    isDuplicated: async (word) => {
        return await strapi.services.kanji.count({ kanji: word }) > 0;
    }
};
