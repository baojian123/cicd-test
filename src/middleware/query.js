"use strict";

const mongoose = require("mongoose");

const MAX_NUMBER_IDS = 10;

module.exports = (ctx, next) => {
  // ids: "123,123,789"
  let { ids } = ctx.params;
  ids = ids.split(",");
  const objectIds = [];

  if (ids.length > MAX_NUMBER_IDS) {
    ctx.throw(400, `Number of ids should not exceed ${MAX_NUMBER_IDS}`);
  }

  for (let i = 0; i < ids.length; i++) {
    try {
      // DRY: don't repeat yourself
      objectIds.push(new mongoose.Types.ObjectId(ids[i]));
    } catch (e) {
      ctx.throw(400, `id: ${ids[i]} ${e.message}`);
    }

    for (let j = i + 1; j < ids.length; j++) {
      if (ids[i] === ids[j]) {
        ctx.throw(400, `id: ${ids[i]} should not duplicate`);
      }
    }
  }

  ctx.params.ids = ids;
  ctx.params.objectIds = objectIds;

  return next();
};
