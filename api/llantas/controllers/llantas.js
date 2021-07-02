"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");
module.exports = {
  async find(ctx) {
    // const { brand } = ctx.query;
    // ctx.send(ctx.query);
    const llantas = await strapi.services.llantas.find(ctx.query);
    return sanitizeEntity(llantas, { model: strapi.models.llantas });
  },
};
