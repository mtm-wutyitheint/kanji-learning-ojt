'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async importKanji(ctx) {
        const words = ctx.request.body;
        let entities = [];
        try {
          await Promise.all(words.map(async (word) => {
            let isDuplicated = false;
            let messages = 'duplicate words.:';
            if (await strapi.services.kanji.isDuplicated(word.kanji)) {
              isDuplicated = true;
              messages = messages + `${word.kanji}\n`;
            }
            if (isDuplicated) {
              return ctx.response.conflict(messages);
            }
          }));
          await Promise.all(words.map(async (word) => {
            let entity = await strapi.services.kanji.create(word);
            entities.push(entity);
          }));
        } catch (err) {
          console.error(err.message);
          return ctx.response.badRequest(err.message);
        }
        return entities.map(entity => sanitizeEntity(entity, { model: strapi.models.kanji }));
      },
};
