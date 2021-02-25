"use strict";
const { UserModel } = require("../model/");

const getUser = async (ctx) => {
  const { objectId } = ctx;
  const { id } = ctx.params;
  const res = await UserModel.findOne({ _id: objectId });

  if (!res) {
    ctx.body = {
      message: `${id} not found!`,
    };
    ctx.status = 404;
  } else {
    ctx.body = res;
  }
};

const createUser = async (ctx) => {
  const { body } = ctx.request;
  const user = new UserModel(body);
  const res = await user.save();
  ctx.body = res;
  ctx.status = 201;
};

const updateUser = async (ctx) => {
  const { objectId } = ctx;
  const { id } = ctx.params;
  const { body } = ctx.request;
  const { n } = await UserModel.updateOne({ _id: objectId }, { $set: body });
  if (n === 0) {
    ctx.body = {
      message: `${id} not found!`,
    };
    ctx.status = 404;
  } else {
    ctx.body = {
      message: `${id} updated!`,
    };
  }
};

const deleteUser = async (ctx) => {
  const { objectId } = ctx;
  const { id } = ctx.params;
  const { n } = await UserModel.deleteOne({ _id: objectId });
  if (n === 0) {
    ctx.body = {
      message: `${id} not found!`,
    };
    ctx.status = 404;
  } else {
    ctx.body = {
      message: `${id} deleted!`,
    };
  }
};

const batchGetUser = async (ctx) => {
  ctx.body = ctx.query;
  const { id } = ctx.query;
  // [
  //   "160323c3b3dc6043724dfeafe",
  //   "60323c3b3dc6043724dfeaff",
  //   "60323c3b3dc6043724dfeafg"
  // ]
};

const batchCreateUser = async (ctx) => {};

const batchUpdateUser = async (ctx) => {};

const batchDeleteUser = async (ctx) => {};

const listUser = async (ctx) => {
  let { page, pageSize } = ctx.query;
  // convert string to number
  page = +page;
  pageSize = +pageSize;
  const skip = pageSize * (page - 1);
  const res = await UserModel.find().skip(skip).limit(pageSize);
  const count = await UserModel.count();

  ctx.body = { results: res, count };
};

module.exports = {
  getUser,
  createUser,
  updateUser,
  deleteUser,
  batchGetUser,
  batchCreateUser,
  batchUpdateUser,
  batchDeleteUser,
  listUser,
};
