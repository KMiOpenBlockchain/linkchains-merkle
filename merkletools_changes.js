The node modules code for Merkle Tools "merkletools.js" has been extended to permit Keccak256 encryption and also to be able to retrieve the Merkle Tree array data externally

.
.
.
var sha3512 = require('js-sha3').sha3_512
var sha3384 = require('js-sha3').sha3_384
var sha3256 = require('js-sha3').sha3_256
var sha3224 = require('js-sha3').sha3_224
var crypto = require('crypto')
.
.
.


becomes

.
.
.
var sha3512 = require('js-sha3').sha3_512
var sha3384 = require('js-sha3').sha3_384
var sha3256 = require('js-sha3').sha3_256
var sha3224 = require('js-sha3').sha3_224
var crypto = require('crypto')
var keccak256 = require('js-sha3').keccak_256
.
.
.

AND
.
.
.
  var hashFunction = function (value) {
    switch (hashType) {
      case 'SHA3-224':
        return Buffer.from(sha3224.array(value))
      case 'SHA3-256':
        return Buffer.from(sha3256.array(value))
      case 'SHA3-384':
        return Buffer.from(sha3384.array(value))
      case 'SHA3-512':
        return Buffer.from(sha3512.array(value))
      default:
        return crypto.createHash(hashType).update(value).digest()
    }
  }
  .
  .
  .
  
becomes
  
  .
  .
  .
  var hashFunction = function (value) {
    switch (hashType) {
      case 'SHA3-224':
        return Buffer.from(sha3224.array(value))
      case 'SHA3-256':
        return Buffer.from(sha3256.array(value))
      case 'SHA3-384':
        return Buffer.from(sha3384.array(value))
      case 'SHA3-512':
        return Buffer.from(sha3512.array(value))
      case 'KECCAK256':
        return Buffer.from(keccak256.array(value))
      default:
        return crypto.createHash(hashType).update(value).digest()
    }
  }
  .
  .
  .
  
  
AND the following function is added
  
  this.getMerkleTree = function () {
    if (!tree.isReady || tree.levels.length === 0) return null
    return tree
  }