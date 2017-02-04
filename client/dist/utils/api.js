const env = require('../config/config').env;

let apiBaseUrl = {
  'develop': '127.0.0.1:54321',
  'test': 'https://www.51banhui.com/api',
  'production': ''
};

let developApiList = {
  'getWeeklyList': apiBaseUrl[env] + '/weekly',
  'postWeeklyDetail': apiBaseUrl[env] + '/weekly/commit',
  'login': apiBaseUrl[env] + '/login'
};
let testApiList = developApiList;
let productionApiList = developApiList;
let apiList = {
  'develop': developApiList,
  'test': testApiList,
  'production': productionApiList
};

let api = {
  'develop': apiList.develop,
  'test': apiList.test,
  'production': apiList.production
};

console.log('api: ', api, ' env: ', env, ' api env: ', api[env]);

module.exports = api[env];
//# sourceMappingURL=api.js.map
