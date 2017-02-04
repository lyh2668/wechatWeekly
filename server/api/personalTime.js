// const dataApi = require('../../database/dataApi').d

// express调用的接口

let personalTime = require('../models').personalTime

exports.getList = function (p) {
  let params = p || {}
  let rule = {}

  params.pageNum = params.pageNum || 20

  rule = {
    order: 'id DESC',
    where: {
      types: 3,
      $and: {
        id: {
          // $gt: params.startId
          $lt: params.startId
        }
      }
    },
    limit: params.pageNum
  }

  // 如果startId值不存在或者startId的值区间错误则不使用startId作为索引条件
  if (!params.startId || params.startId <= 0) {
    rule.where.$and = {}
  }

  if (params.member_id) {
    rule.where.$and.member_id = params.member_id
  }

  console.log(rule)

  return personalTime.findAll(rule)
}

exports.commit = function (p) {
  console.log('commit params: ', p)
  return personalTime.update(p, {
    where: {
      id: p.id
    }
  })
}

// module.exports = function (that) {
//   that.getList = function (p) {
//
//   }
//
//   that.commit = function (p) {
//     let params = p ? p : {}
//
//     // if (!param.pageNum) {
//     //   return Promise.reject()
//     // }
//
//     // db opt
//   }
//
//   return that
// }
/**
 * 获取personal_time的列表数据，根据params决定获取页面的条数以及下一条开始的位置
 * @param  {[Object]} p [传入的是一个参数对象]
 * @return {[Promise]}    [返回的是一个Promise]
 */
// function getList (p) {
//   let params = p ? p : {}
//
//   if (!params.pageNum) {
//     // 如果参数中没有设置每页的数目，则默认使用 20
//     params.pageNum = 20
//   }
//
//   if (!params.startId) {
//     // 如果起始id没有则默认为 0
//     params.startId = 0
//   }
//
//   return dataApi.getPersonalTimeList(params)
// }

// module.exports = { getList }
