const DID_SIOP = require('did-siop');
const CONFIGS = require('./params');

let siop_rp: any = undefined;
let request: any;

async function startProcess(){
    console.log('startProcess');
    
    siop_rp = await DID_SIOP.RP.getRP(
        CONFIGS.PARAMS.RP.redirect_uri, // RP's redirect_uri
        CONFIGS.PARAMS.RP.did, // RP's did
        CONFIGS.PARAMS.RP.registration
    )
    console.log('Got RP instance ....');
    siop_rp.addSigningParams(
        CONFIGS.PARAMS.RP.sigining_key, // Private key
        CONFIGS.PARAMS.RP.kid, // Corresponding authentication method in RP's did document (to be used as kid value for key)
        CONFIGS.PARAMS.RP.key_format, //Format in which the key is supplied. List of values is given below
        CONFIGS.PARAMS.RP.key_algorithm
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
        await provider.setUser(CONFIGS.PARAMS.USER.did);// User's did
        console.log('User DID set to Provider ...');
    
        provider.addSigningParams(
            CONFIGS.PARAMS.USER.sigining_key, // User's private key
            CONFIGS.PARAMS.USER.kid, // Corresponding authentication method in user's did document (to be used as kid value for key)
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

console.log(CONFIGS);

startProcess();