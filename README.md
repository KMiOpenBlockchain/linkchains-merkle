# linkchains-merkle

The Linkchain library supports the use of Merkle trees to provide blockchain-based verification of RDF quads, both at an all-in-one and per-quad level. By verification, we mean that once a set of RDF quads has been 'anchored' to a blockchain, a verifier can determine whether a given set of quads is identical to the anhored set, or not.

From the end user point of view, there are two types of data: the RDF itself, and the metadata needed to perform verification. The metadata itself comes in two forms: a compact form representing the full set of Merkle trees associated with a given set of RDF quads, and a much more verbose 'granular' form which associates each individual quad with a Merkle proof and the metadata needed to associate each proof with an immutable blockchain record. The first form of metadata can be used to verify, as a simple yes or no, whether a provided set of quads is identical up to blank node renaming to the set used to generate and anchor that metadata. The second form (which can be (re)generated at any time from the original set of quads and the first form) allows partial verification and sharing. That is, given a set of quads and a (sub)set of granular metadata, it is possible to identify exactly which quads in that set do or don't correspond to the originally anchored set.

The functions of the library correspond to four different steps of processing, given a set of quads 'quads'.

1. Generate verification metadata for 'quads' (not associated with any blockchain record)
2. Anchor verification metadata to a blockchain (adds relevant anchor details to step 1 result)
3. Generate granular verification metadata for 'quads' (repackages step 2 result for per-quad processing)
4. Verify any given set of quads against the given metadata (returns arrays of verified/unverified quads)

Only the outputs of steps 2 and 3 can be used to verify in step 4 - verification requires the anchoring metadata. Either format of metadata may be passed in to step 4.

Steps 2 and 4 require writing to, and reading from, respectively, a blockchain. Because methods for talking to different blockchains vary, as do methods for talking to the same blockchain from different environments (e.g., browser JS vs. server node.js), the corresponding library functions each take a callback function to handle the actual writing/reading, as appropriate. The library parses and handles the inputs and results as needed.With this demonstrator, callbacks which correspond to anchoring with a simple smart contract, and with a non-fungible token (NFT) contract, are provided.
 
Main linkchain Library functions used in this demonstrator:

```
getVerificationMetadata: async function (quads, options)
```
Accepts 'quads' in JSON-LD, or N-Triples/N-Quads/N3/Turtle, and 'options' ({} for defaults).
Returns unanchored Linkchain MerQL verification metadata.

Code snippet example:
```
try {
  quadsFinal = <the rdf to get verification metadata for>

  if (quadsFinal != "" && quadsFinal != null) {
    let options = {}
    metadata = await linkchains.getVerificationMetadata(quadsFinal, options);
  } else {
    alert("Please select a file of RDF first");
  }
} catch (e) {
  console.log(e);
}

```

* * *
```
anchorMetadata: async function (metadata, options, anchorFunction)
```

Accepts unanchored metadata 'metadata' (e.g., output of getVerification Metadata), options 'options', and a callback 'anchorFunction'.
Returns anchored Linkchain MerQL verification metadata.

anchorFunction takes care of actual blockchain writing based on options (contents of options vary with implementation of anchorFunction)

Code snippet example for anchoring with a MerQL Anchor Contract:
```
let options = {} // requires no additional options as it is using the default Linkchain MerQL Contract way of anchoring
let dataToAnchor = <the rdf code that was anchored>;
const anchoredMetadata = await linkchains.anchorMetadata(dataToAnchor, options, deployMerQLAnchorContract);

```

* * *
```
getGranularVerificationMetadata: async function (quads, metadata)
```
Accepts 'quads' and anchored metadata 'metadata' (e.g., output of anchorMetadata).
Returns anchored granular Linkchain MerQL metadata suitable for per-quad verification.

'quads' may be any of the RDF formats accepted by getVerificationMetadata.

This function will not work if passed unanchored metadata.

Code snippet example:
```
const rdfInputData = <the rdf code that was acnhored>
const anchoredMetadata = <data returned from linkchains.anchorMetadata>

const granularMetaData = await linkchains.getGranularVerificationMetadata(rdfInputData, anchoredMetadata);
```

* * *
```
verify: async function (quads, metadata, options, retrieveAnchor)
```

Accepts 'quads', anchored metadata 'metadata' (granular or otherwise), 'options', and a callback 'retrieveAnchor'.
Returns an object

```
{
  'verified': [...],
  'unverified': [...]
}
```
containing N-Quad string representations of the verified/unverified quads in 'quads', as appropriate. If 'metadata' is not granular, then one of verified or unverified will be empty, depending on whether the verification failed or succeeded, respectively

Code snippet example:
```
const rdfInputData = <the rdf code that was anchored>
const anchoredMetadata = <the data returned from a call to linkchains.anchorMetadata>
const granularMetaData = <the data returned from a call to linkchains.granularMetaData>

const handler = async function(anchor, options) {
  let reply = "";
  if (anchor.type == "ETHMerQL") {
    reply = await readMerQLAnchorContract(anchor, options);
  }
  console.log(reply);

  return reply;
}

let options = {}
const output = await linkchains.verify(rdfInputData, granularMetaData, options, handler);


const rdfInputData = <the rdf code that was anchored>
const anchoredMetadata = <the data returned from a call to linkchains.anchorMetadata>
let options = {}

const handler = async function(anchor, options) {
  // check if merkle or blockchain verification
  let reply = "";
  if (anchor.type == "ETHMerQL") {
    reply = await readMerQLAnchorContract(anchor, options);
  } else if (anchor.type == "RDFTokens") {
    reply = await readTokenMetadata(anchor, options);
  }

  return reply;
}

const output = await linkchains.verify(rdfInputData, anchoredMetaData, options, handler);
