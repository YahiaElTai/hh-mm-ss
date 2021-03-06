'use-strict'

const test = require('tape')
const {fromMs, fromS, toMs, toS} = require('../')

// =============================================================================
//  Test cases
// =============================================================================

test('fromMs() test', (t) => {
  // Basic functionality
  t.equal(fromMs(75000), '01:15')
  t.equal(fromMs(442800000), '123:00:00')
  t.equal(fromMs(90576), '01:30.576')
  t.equal(fromMs(-157250), '-02:37.250')

  // Output formatting
  t.equal(fromMs(38000, 'mm:ss.sss'), '00:38.000')
  t.equal(fromMs(0, 'hh:mm:ss'), '00:00:00')
  t.equal(fromMs(3600000, 'mm:ss'), '01:00:00')
  t.equal(fromMs(4500000, 'hh:mm'), '01:15')
  t.equal(fromMs(-9900000, 'hh:mm'), '-02:45')

  // Input validation
  t.throws(() => fromMs(null))
  t.throws(() => fromMs('text'))
  t.throws(() => fromMs(0, 'mm:hh:ss'))

  t.end()
})

test('fromS() test', (t) => {
  // Basic functionality
  t.equal(fromS(75), '01:15')
  t.equal(fromS(442800), '123:00:00')
  t.equal(fromS(-442800), '-123:00:00')

  // Output formatting
  t.equal(fromS(38, 'mm:ss.sss'), '00:38.000')
  t.equal(fromS(0, 'hh:mm:ss'), '00:00:00')
  t.equal(fromS(3600, 'mm:ss'), '01:00:00')
  t.equal(fromS(4500, 'hh:mm'), '01:15')
  t.equal(fromS(-9900, 'hh:mm'), '-02:45')

  // Input validation
  t.throws(() => fromS(null))
  t.throws(() => fromS('text'))
  t.throws(() => fromS(0, 'mm:hh:ss'))

  t.end()
})

test('toMs() test', (t) => {
  // Basic functionality
  t.equal(toMs('01:05:17'), 3917000)
  t.equal(toMs('137:00:00.0'), 493200000)
  t.equal(toMs('00:10.230'), 10230)
  t.equal(toMs('00:00:07.10845'), 7108)
  t.equal(toMs('-02:07:12'), -7632000)
  t.equal(toMs('02:00'), 120000)
  t.equal(toMs('02:00', 'hh:mm'), 7200000)
  t.equal(toMs('-04:35', 'hh:mm'), -16500000)

  // Input validation
  t.throws(() => toMs('13:05:02:11'))
  t.throws(() => toMs('153'))
  t.throws(() => toMs(null))
  t.throws(() => toMs('00:62'))

  t.end()
})

test('toS() test', (t) => {
  // Basic functionality
  t.equal(toS('01:05:17'), 3917)
  t.equal(toS('137:00:00.0'), 493200)
  t.equal(toS('00:10.230'), 10)
  t.equal(toS('00:00:07.10845'), 7)
  t.equal(toS('-02:07:12'), -7632)
  t.equal(toS('02:00',), 120)
  t.equal(toS('02:00', 'hh:mm'), 7200)
  t.equal(toS('-04:35', 'hh:mm'), -16500)

  // Input validation
  t.throws(() => toS('13:05:02:11'))
  t.throws(() => toS('153'))
  t.throws(() => toS(null))
  t.throws(() => toS('00:62'))

  t.end()
})

test('symmetrical conversion test', (t) => {
  // ToMs() and fromMs for all formats
  t.equal(toMs(fromMs(900000, 'mm:ss'), 'mm:ss'), 900000)
  t.equal(toMs(fromMs(915040, 'mm:ss.sss'), 'mm:ss.sss'), 915040)
  t.equal(toMs(fromMs(4500000, 'hh:mm'), 'hh:mm'), 4500000)
  t.equal(toMs(fromMs(4515000, 'hh:mm:ss'), 'hh:mm:ss'), 4515000)
  t.equal(toMs(fromMs(4515690, 'hh:mm:ss.sss'), 'hh:mm:ss.sss'), 4515690)

  // ToS() and fromS for all formats
  t.equal(toS(fromS(900, 'mm:ss'), 'mm:ss'), 900)
  t.equal(toS(fromS(921, 'mm:ss.sss'), 'mm:ss.sss'), 921)
  t.equal(toS(fromS(4500, 'hh:mm'), 'hh:mm'), 4500)
  t.equal(toS(fromS(4515, 'hh:mm:ss'), 'hh:mm:ss'), 4515)
  t.equal(toS(fromS(4515, 'hh:mm:ss.sss'), 'hh:mm:ss.sss'), 4515)

  t.end()
})

