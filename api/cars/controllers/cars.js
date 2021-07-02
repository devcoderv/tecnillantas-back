"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");
const path = require("path");
const csv = require("csv-parser");
const fs = require("fs-extra");
const carsJSON = require("../cars.json");
// const carsJSON = require("../cars.json");
// const { pipeline } = require("stream/promises");
// const { Workbook } = require("exceljs");
module.exports = {
  async forBrands(ctx) {
    const { brand } = ctx.params;
    const cars = await strapi.services.cars.find({ brand });
    return sanitizeEntity(cars, { model: strapi.models.cars });
  },
  async forBrandsAndYear(ctx) {
    const { brand, year } = ctx.params;
    const cars = await strapi.services.cars.find({ brand, year });
    return sanitizeEntity(cars, { model: strapi.models.cars });
  },

  async createExcel(cxt) {
    const results = carsJSON.map((item) => {
      item.llantas && (item.llantas = JSON.parse(item.llantas));
      return item;
    });

    for await (const item of results) {
      await strapi.services.cars.create(item);
    }

    cxt.send(results);
  },
};
