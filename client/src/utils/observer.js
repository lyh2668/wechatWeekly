
var fnsList = {}

/**
 * 监听事件，观察者
 * @param  {String}   key [事件关键字]
 * @param  {Function} fn  [回调函数]
 * @return {[void]}       [空]
 */
function listen (key, fn) {
  if (!(key in fnsList)) {
    fnsList[key] = []
  }

  fnsList[key].push(fn)
}

/**
 * 事件触发函数
 * @return {Boolean} [成功返回真，否则返回假]
 */
function trigger () {
  // 获取传递进来的首个参数，即为key值，并从参数列表中出队列
  var key = [].shift.apply(arguments)
  var fns = fnsList[key]

  if (!fns || fns.length === 0) {
    return false
  }

  for (var i = 0; i < fns.length; ++i) {
    fns[i].apply(this, arguments)
  }

  return true
}

module.exports = {
  listen: listen,
  trigger: trigger
}
