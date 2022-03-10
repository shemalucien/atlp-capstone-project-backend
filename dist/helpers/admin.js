"use strict";

const {
  role
} = require('../database/model/user.model');

const {
  Blog
} = require('../database/model/blog.model');

const {
  Query
} = require('../database/model/query.model');

function canViewBlog(User, Blog) {
  return user.role === role.admin;
}

function canViewQuery(user, query) {
  return user.role === role.admin;
}

module.exports = {
  canViewBlog,
  canViewQuery
};