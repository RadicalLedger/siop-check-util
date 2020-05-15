const DID_SIOP = require('did-siop');

let siop_rp: any = undefined;
let request: any;

async function startProcess(){
    console.log('startProcess');
    
    siop_rp = await DID_SIOP.RP.getRP(
        'localhost:4200/home', // RP's redirect_uri
        'did:ethr:0xB07Ead9717b44B6cF439c474362b9B0877CBBF83', // RP's did
        {
        "jwks_uri": "https://uniresolver.io/1.0/identifiers/did:example:0xab;transform-keys=jwks",
        "id_token_signed_response_alg": ["ES256K-R", "EdDSA", "RS256"]
        }
    )
    console.log('Got RP instance ....');
    siop_rp.addSigningParams(
        'CE438802C1F0B6F12BC6E686F372D7D495BC5AA634134B4A7EA4603CB25F0964', // Private key
        'did:ethr:0xB07Ead9717b44B6cF439c474362b9B0877CBBF83#owner', // Corresponding authentication method in RP's did document (to be used as kid value for key)
        DID_SIOP.KEY_FORMATS.HEX, //Format in which the key is supplied. List of values is given below
        DID_SIOP.ALGORITHMS['ES256K-R']
    );

    console.log('RP SigningParams added ...');
    request = await siop_rp.generateRequest();

    console.log('Request generated ...', request);

    console.log('Moving to Provider side ...');

    let resJWT = await OnExtension(request);    
    
    let valid = await siop_rp.validateResponse(resJWT);
    console.log('Response validated...');
    console.log('Validated response',valid); 
}

async function OnExtension(request:string):Promise<string>{
    const provider = new DID_SIOP.Provider();

    return new Promise(async (resolve, reject) => {
        await provider.setUser('did:ethr:0x30D1707AA439F215756d67300c95bB38B5646aEf');// User's did
        console.log('User DID set to Provider ...');
    
        provider.addSigningParams(
          '3f81cb66c8cbba18fbe25f99d2fb4e19f54a1ee69c335ce756a705726189c9e7', // User's private key
          'did:ethr:0x30D1707AA439F215756d67300c95bB38B5646aEf#owner', // Corresponding authentication method in user's did document (to be used as kid value for key)
          DID_SIOP.KEY_FORMATS.HEX, //Format in which the key is supplied. List of values is given below
          DID_SIOP.ALGORITHMS['ES256K-R'] //Algorithm. List of values is given below
        );// If several keys are provided, one will be selected randomly when generating the request. To remove a key use provider.removeSigningParams(kid)
        
        console.log('User SigningParams added ...');

        // Request validation and response generation
        provider.validateRequest(request).then(decodedRequest => {
            console.log('Request validation completed ...');
            console.log('decodedRequest',decodedRequest);
            let jwtExpiration = 5000;
            provider.generateResponse(decodedRequest.payload, [jwtExpiration]).then(responseJWT => {
                console.log('Response generated ...');
                console.log('responseJWT',responseJWT); 
                resolve(responseJWT);
          })
        })
        .catch(err => {
          console.log("invalid request" , err);
          reject(err);
        })            

    } );

}

console.log('on the main function');

startProcess();