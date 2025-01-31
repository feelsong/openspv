/**
 * KeyPair
 * =======
 *
 * A keyPair is a collection of a private key and a public key.
 * const keyPair = new KeyPair().fromRandom()
 * const keyPair = new KeyPair().fromPrivKey(privKey)
 * const privKey = keyPair.privKey
 * const pubKey = keyPair.pubKey
 */
'use strict'

import { PrivKey as DefaultPrivKey } from './priv-key.mjs'
import { PubKey } from './pub-key.mjs'
import { Struct } from './struct.mjs'
import { Bw } from './bw.mjs'

class KeyPair extends Struct {
  constructor (privKey, pubKey, PrivKey = DefaultPrivKey) {
    super({ privKey, pubKey })
    this.PrivKey = PrivKey
  }

  fromJSON (json) {
    if (json.privKey) {
      this.privKey = this.PrivKey.fromJSON(json.privKey)
    }
    if (json.pubKey) {
      this.pubKey = PubKey.fromJSON(json.pubKey)
    }
    return this
  }

  fromBr (br) {
    const buflen1 = br.readUInt8()
    if (buflen1 > 0) {
      this.privKey = new this.PrivKey().fromFastBuffer(br.read(buflen1))
    }
    const buflen2 = br.readUInt8()
    if (buflen2 > 0) {
      this.pubKey = new PubKey().fromFastBuffer(br.read(buflen2))
    }
    return this
  }

  toBw (bw) {
    if (!bw) {
      bw = new Bw()
    }
    if (this.privKey) {
      const privKeybuf = this.privKey.toFastBuffer()
      bw.writeUInt8(privKeybuf.length)
      bw.write(privKeybuf)
    } else {
      bw.writeUInt8(0)
    }
    if (this.pubKey) {
      const pubKeybuf = this.pubKey.toFastBuffer()
      bw.writeUInt8(pubKeybuf.length)
      bw.write(pubKeybuf)
    } else {
      bw.writeUInt8(0)
    }
    return bw
  }

  fromString (str) {
    return this.fromJSON(JSON.parse(str))
  }

  toString () {
    return JSON.stringify(this.toJSON())
  }

  toPublic () {
    const keyPair = new KeyPair().fromObject(this)
    keyPair.privKey = undefined
    return keyPair
  }

  fromPrivKey (privKey) {
    this.privKey = privKey
    this.pubKey = new PubKey().fromPrivKey(privKey)
    return this
  }

  static fromPrivKey (privKey) {
    return new this().fromPrivKey(privKey)
  }

  fromRandom () {
    this.privKey = new this.PrivKey().fromRandom()
    this.pubKey = new PubKey().fromPrivKey(this.privKey)
    return this
  }

  static fromRandom () {
    return new this().fromRandom()
  }
}

export { KeyPair }
