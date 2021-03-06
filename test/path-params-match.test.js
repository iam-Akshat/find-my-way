'use strict'

const t = require('tap')
const FindMyWay = require('../')

t.test('path params match', (t) => {
  t.plan(12)

  const findMyWay = FindMyWay({ ignoreTrailingSlash: true })

  const b1Path = function b1StaticPath () {}
  const b2Path = function b2StaticPath () {}
  const cPath = function cStaticPath () {}
  const paramPath = function parameterPath () {}

  findMyWay.on('GET', '/ab1', b1Path)
  findMyWay.on('GET', '/ab2', b2Path)
  findMyWay.on('GET', '/ac', cPath)
  findMyWay.on('GET', '/:pam', paramPath)

  t.equals(findMyWay.find('GET', '/ab1').handler, b1Path)
  t.equals(findMyWay.find('GET', '/ab1/').handler, b1Path)
  t.equals(findMyWay.find('GET', '/ab2').handler, b2Path)
  t.equals(findMyWay.find('GET', '/ab2/').handler, b2Path)
  t.equals(findMyWay.find('GET', '/ac').handler, cPath)
  t.equals(findMyWay.find('GET', '/ac/').handler, cPath)
  t.equals(findMyWay.find('GET', '/foo').handler, paramPath)
  t.equals(findMyWay.find('GET', '/foo/').handler, paramPath)

  const noTrailingSlashRet = findMyWay.find('GET', '/abcdef')
  t.equals(noTrailingSlashRet.handler, paramPath)
  t.deepEqual(noTrailingSlashRet.params, { pam: 'abcdef' })

  const trailingSlashRet = findMyWay.find('GET', '/abcdef/')
  t.equals(trailingSlashRet.handler, paramPath)
  t.deepEqual(trailingSlashRet.params, { pam: 'abcdef' })
})
