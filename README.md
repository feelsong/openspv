fullnode (alpha)
================

fullnode is an ES6 (javascript) implementation of the Genesis Blockchain
intended to satisfy certain goals:

1. Bring the blockchain to web browsers and node.js in a decentralized,
trust-minimized manner, without the required use of a third-party API.

2. Support ease-of-use by being internally consistent. It should not be
necessary to read the source code of a class or function to know how to use it.
Once you know how to use part of the library, the other parts should feel
natural.

3. Have 100% test coverage, or nearly so, so that the library is known to be
reliable. This should include running standard test vectors from the reference
implementation.

4. Library objects have an interface suitable for use with a command-line
interface or other libraries and tools, in particular having toString,
fromString, toJSON, fromJSON, toBuffer, fromBuffer, toHex, fromHex methods.

5. All standard features of the blockchain are implemented (or will be) and
saved in lib/. All BIPs are correctly implemented and, where appropriate, saved
as bipxx.js in lib/ (since that is their standard name). In order to allow
rapid development, fullnode includes non-standard and experimental features.
Any non-standard features (such as colored coins or stealth addresses) are
labeled as such in index.js as well as in comments.

6. Expose everything, including dependencies. This makes it possible to develop
apps that require fine-grained control over the basics, such as big numbers and
points. However, it also means that you can hurt yourself if you misuse these
primitives.

7. It is always possible to create a new object without using "new".

8. Minimize the use of dependencies so that all code can be easily audited.

9. All instance methods modify the state of the object and return the object,
unless there is a good reason to do something different. To access the result
of an instance method, you must access the object property(s) that it modifies.

10. Use the features of ES6 (ECMAScript 6, the latest version of javascript)
available in the latest stable releases of node.js. fullnode is not intended to
work with node.js 0.10, although it does work with node 0.12 with the --harmony
flag.

Alpha Caveat
------------

fullnode is still alpha, and has an unstable API. Once the API has been
finalized, and the code audited, version 1.0 will be released. It is
recommended not to use fullnode for production software until that time.

Environment Variables
---------------------
- `FULLNODE_JS_BASE_URL` - Default "/".
- `FULLNODE_JS_BUNDLE_FILE` - Default "fullnode.js"
- `FULLNODE_JS_WORKER_FILE` - Default "fullnode-worker.js"
- `FULLNODE_JS_BUNDLE_MIN_FILE` - Default "fullnode-min.js"
- `FULLNODE_JS_WORKER_MIN_FILE` - Default "fullnode-worker-min.js"
- `FULLNODE_NETWORK` - Default "mainnet"

You can change the network to run the CLI in testnet mode:
```
FULLNODE_NETWORK=testnet ./bin/fullnode.js
```

Documentation
-------------

While fullnode is under heavy development, the API changes frequently, and the
documentation is not kept up-to-date. However there is some documentation, and
it can be built with groc:

```
npm install -g groc
groc
```

License
-------

In order to support maximum interoperability with other software, fullnode is
MIT-licensed. See LICENSE.
