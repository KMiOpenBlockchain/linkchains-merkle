const VOCAB = "https://blockchain.open.ac.uk/vocab/";

const defaults = {
    "DEFAULT_LSD" : 64,
    "DEFAULT_INDEXTYPE" : 'subject',
    "DEFAULT_DIVISOR" : 0x1,
    "DEFAULT_HASH_ALG" : 'KECCAK-256',
    "DEFAULT_JSONLD_CONTEXT" : {
        "@vocab" : VOCAB
    },
    "DEFAULT_ANCHOR_TYPE" : "ETHMerQL"
};

const defaultOptions = {
    "DEFAULT_OPTIONS" : {
        quadHash : defaults.DEFAULT_HASH_ALG,
        treeHash: defaults.DEFAULT_HASH_ALG,
        indexHash: defaults.DEFAULT_HASH_ALG,
        lsd: defaults.DEFAULT_LSD,
        indexType: defaults.DEFAULT_INDEXTYPE,
        divisor: defaults.DEFAULT_DIVISOR
    }
};

exports.defaults = defaults;
exports.defaultOptions = defaultOptions;