var sha3_512 = require('js-sha3').sha3_512;
var sha3_384 = require('js-sha3').sha3_384;
var sha3_256 = require('js-sha3').sha3_256;
var sha3_224 = require('js-sha3').sha3_224;
var keccak512 = require('js-sha3').keccak512;
var keccak384 = require('js-sha3').keccak384;
var keccak256 = require('js-sha3').keccak256;
var keccak224 = require('js-sha3').keccak224;
var shake128 = require('js-sha3').shake128;
var shake256 = require('js-sha3').shake256;
var cshake128 = require('js-sha3').cshake128;
var cshake256 = require('js-sha3').cshake256;
var kmac128 = require('js-sha3').kmac128;
var kmac256 = require('js-sha3').kmac256;
var crypto = require('crypto');

exports.getHash= function(messagein, hashMethod) {
	switch (hashMethod.type) {
		case "SHA3-512":
			return sha3_512(messagein);
			break;
		case "SHA3-384":
			return sha3_384(messagein);
			break;
		case "SHA3-256":
			return sha3_256(messagein);
			break;
		case "SHA3-224":
			return sha3_224(messagein);
			break;
		case "KECCAK512":
			return keccak512(messagein);
			break;
		case "KECCAK384":
			return keccak384(messagein);
			break;
		case "KECCAK256":
			return keccak256(messagein);
			break;
		case "KECCAK224":
			return keccak224(messagein);
			break;
		case "SHAKE128":
			return shake128(messagein, 256);
			break;
		case "SHAKE256":
			return shake256(messagein, 512);
			break;
		default:
			// valid hashTypes include all crypto hash algorithms
			// such as 'md5', 'sha1', 'sha224', 'sha256', 'sha384', 'sha512'
			return crypto.createHash(hashMethod).update(messagein).digest("hex");
			break;
	}
}