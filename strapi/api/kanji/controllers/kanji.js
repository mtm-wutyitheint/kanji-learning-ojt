'use strict';
const { sanitizeEntity } = require('strapi-utils');
const _ = require('lodash');
const { isNil, conforms } = require('lodash');

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
        let messages = 'duplicate words : ';
        if (await strapi.services.kanji.isDuplicated(word.kanji)) {
          isDuplicated = true;
          messages = messages + `${word.kanji}`;
        }
        if (isDuplicated) {
          return ctx.response.conflict(messages);
        }
        let entity = await strapi.services.kanji.create(word);
        entities.push(entity);
      }));

    } catch (err) {
      console.error(err.message);
      return ctx.response.badRequest(err.message);
    }
    return entities.map(entity => sanitizeEntity(entity, { model: strapi.models.kanji }));
  },

  async quizAnswerWithMeaning(ctx) {
    try {
      const quizs = [];
      const entities = await strapi.services.kanji.find({ _limit: -1 });
      if (entities.length == 0) {
        return ctx.send({ message: 'No data in kanji table' }, 400);
      }
      const meaning_list = _.map(entities, entity => {
        return {
          meaning: entity.meaning,
          ischoose: false,
          isCorrect: false,
          disable: false
        };
      });
      const randomMeaning = strapi.services.kanji.getRandom(entities, 30);
      if (isNil(randomMeaning)) {
        return ctx.send({ message: 'Data is null or underfined value' }, 404);
      }
      if (randomMeaning.length == 0) {
        return ctx.send({ message: 'No kanji words found' }, 404);
      }
      await Promise.all(randomMeaning.map(word => {
        let meanings = _.cloneDeep(meaning_list);
        meanings = _.filter(meaning_list, m => m.meaning !== word.meaning);
        let answer_list = strapi.services.kanji.getRandom(meanings, 5)
        answer_list.push({
          meaning: word.meaning,
          ischoose: false,
          isCorrect: false,
          disable: false
        });
        answer_list = strapi.services.kanji.shuffle(answer_list);
        const quiz = {
          kanji: word.kanji,
          correct: word.meaning,
          answer_list
        }
        quizs.push(quiz);
      }))
      // console.log(quizs)
      return quizs;
    }
    catch (error) {
      console.log('=========== Error in quizAnswerWithMeaning ========');
      console.error(error);
    }
  },

  async quizAnswerWithKanji(ctx) {
    try {
      const quizs = [];
      const entities = await strapi.services.kanji.find({ _limit: -1 });
      if (entities.length == 0) {
        return ctx.send({ message: 'No data in kanji table' }, 400);
      }
      const kanji_list = _.map(entities, entity => {
        return entity.kanji;
      });
      const randomMeaning = strapi.services.kanji.getRandom(entities, 30);
      if (isNil(randomMeaning)) {
        return ctx.send({ message: 'Data is null or underfined value' }, 404);
      }
      if (randomMeaning.length == 0) {
        return ctx.send({ message: 'No meaning found' }, 404);
      }
      await Promise.all(randomMeaning.map(word => {
        let kanjis = _.cloneDeep(kanji_list);
        kanjis = _.filter(kanji_list, m => m !== word.kanji);
        let answer_list = strapi.services.kanji.getRandom(kanjis, 5)
        answer_list.push(word.kanji);
        answer_list = strapi.services.kanji.shuffle(answer_list);
        const quiz = {
          meaning: word.meaning,
          correct: word.kanji,
          answer_list
        }
        quizs.push(quiz);
      }))
      return quizs;
    }
    catch (error) {
      console.log('=========== Error in quizAnswerWithKanji ========');
      console.error(error);
    }
  }
};
