const DID_SIOP = require('did-siop');

export const PARAMS = Object.freeze({
    RP: {
        redirect_uri : 'localhost:4200/home',
        did: 'did:ethr:0xA51E8281c201cd6Ed488C3701882A44B1871DAd6',
        registration : {
            "jwks_uri": "https://uniresolver.io/1.0/identifiers/did:example:0xab;transform-keys=jwks",
            "id_token_signed_response_alg": ["ES256K-R", "EdDSA", "RS256"]
            },
        sigining_key:'8329a21d9ce86fa08e75354469fb8d78834f126415d5b00eef55c2f587f3abca',
        kid: 'did:ethr:0xA51E8281c201cd6Ed488C3701882A44B1871DAd6#owner', // Corresponding authentication method in RP's did document (to be used as kid value for key)
        key_format:DID_SIOP.KEY_FORMATS.HEX,
        key_algorithm:DID_SIOP.ALGORITHMS['ES256K-R']
    },
    USER:{
        did: 'did:ethr:0xb278bbd5683Ec4F5b15af0283003635ECa5E6Ca1',
        sigining_key:'17cee1971853695343b678edf2e8a7184dd98a6fb5b9e82d52a39ee67779f5fe',
        kid: 'did:ethr:0xb278bbd5683Ec4F5b15af0283003635ECa5E6Ca1#owner', // Corresponding authentication method in User's did document (to be used as kid value for key)
        key_format:DID_SIOP.KEY_FORMATS.HEX,
        key_algorithm:DID_SIOP.ALGORITHMS['ES256K-R']
    }
});