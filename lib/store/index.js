/*
 * Module dependencies
 */

import Emitter from 'component-emitter'
import store from 'store'

/**
 * Initialize an emitter singleton
 */

const emitter = new Emitter()

/**
 * Export `store`
 */

export default store

/**
 * Monkeypath store.set(key, value)
 */

const set = store.set
store.set = function (key, val) {
  const old = store.get(key)
  const ret = set.call(store, key, val)
  emitter.emit('storage', {
    oldValue: old,
    newValue: val,
    key: key
  })
  return ret
}

/**
 * Subscribe
 */

const subscribe = store.subscribe
store.subscribe = function (fn) {
  let ret
  if (subscribe) ret = subscribe.apply(store, arguments)
  if (typeof fn === 'function') {
    emitter.on('storage', fn)
  }
  return ret
}

/**
 * Unsubscribe
 */

const unsubscribe = store.unsubscribe
store.unsubscribe = function (fn) {
  let ret
  if (unsubscribe) ret = unsubscribe.apply(store, arguments)
  if (typeof fn === 'function') {
    emitter.off('storage', fn)
  }
  return ret
}
