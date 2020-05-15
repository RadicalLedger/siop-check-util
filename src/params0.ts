const DID_SIOP = require('did-siop');

export const PARAMS = Object.freeze({
    RP: {
        redirect_uri : 'localhost:4200/home',
        did: 'did:ethr:0xB07Ead9717b44B6cF439c474362b9B0877CBBF83',
        registration : {
            "jwks_uri": "https://uniresolver.io/1.0/identifiers/did:example:0xab;transform-keys=jwks",
            "id_token_signed_response_alg": ["ES256K-R", "EdDSA", "RS256"]
            },
        sigining_key:'CE438802C1F0B6F12BC6E686F372D7D495BC5AA634134B4A7EA4603CB25F0964',
        kid: 'did:ethr:0xB07Ead9717b44B6cF439c474362b9B0877CBBF83#owner', // Corresponding authentication method in RP's did document (to be used as kid value for key)
        key_format:DID_SIOP.KEY_FORMATS.HEX,
        key_algorithm:DID_SIOP.ALGORITHMS['ES256K-R']
    },
    USER:{
        did: 'did:ethr:0x30D1707AA439F215756d67300c95bB38B5646aEf',
        sigining_key:'3f81cb66c8cbba18fbe25f99d2fb4e19f54a1ee69c335ce756a705726189c9e7',
        kid: 'did:ethr:0x30D1707AA439F215756d67300c95bB38B5646aEf#owner', // Corresponding authentication method in User's did document (to be used as kid value for key)
        key_format:DID_SIOP.KEY_FORMATS.HEX,
        key_algorithm:DID_SIOP.ALGORITHMS['ES256K-R']
    }
});