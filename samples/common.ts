import * as vm from 'vso-node-api';
import * as lim from 'vso-node-api/interfaces/LocationsInterfaces';

function getEnv(name: string): string {
    let val = process.env[name];
    if (!val) {
        console.error(name + ' env var not set');
        process.exit(1);
    }
    return val;
}

export async function getWebApi(): Promise<vm.WebApi> {
    return new Promise<vm.WebApi>(async (resolve, reject) => {
        try {

            // let serverUrl = getEnv('API_URL');
            // let token = getEnv('API_TOKEN');



            let authHandler = vm.getPersonalAccessTokenHandler(token);

            let option = undefined;

            // The following sample is for testing proxy
            // option = {
            //     proxy: {
            //         proxyUrl: "http://127.0.0.1:8888"
            //         // proxyUsername: "1",
            //         // proxyPassword: "1",
            //         // proxyBypassHosts: [
            //         //     "github\.com"
            //         // ],
            //     },
            //     //ignoreSslError: true
            // };

            // The following sample is for testing cert
            // option = {
            //     cert: {
            //         caFile: "E:\\certutil\\doctest\\ca2.pem",
            //         certFile: "E:\\certutil\\doctest\\client-cert2.pem",
            //         keyFile: "E:\\certutil\\doctest\\client-cert-key2.pem",
            //         passphrase: "test123",
            //     },
            // };

            let vsts: vm.WebApi = new vm.WebApi(serverUrl, authHandler, option);
            let connData: lim.ConnectionData = await vsts.connect();
            console.log('Hello ' + connData.authenticatedUser.providerDisplayName);
            resolve(vsts);
        }
        catch (err) {
            reject(err);
        }
    });
}

export async function getDeploymentLevelWebApi(): Promise<vm.WebApi> {
    return new Promise<vm.WebApi>(async (resolve, reject) => {
        try {
            let serverUrl = getEnv('API_DEPLOYMENT_URL');
            let token = getEnv('API_TOKEN');
            let authHandler = vm.getPersonalAccessTokenHandler(token);

            let option = undefined;

            // The following sample is for testing proxy
            option = {
                proxy: {
                    proxyUrl: "http://127.0.0.1:8888"
                    // proxyUsername: "1",
                    // proxyPassword: "1",
                    // proxyBypassHosts: [
                    //     "github\.com"
                    // ],
                },
                ignoreSslError: true
            };

            // The following sample is for testing cert
            // option = {
            //     cert: {
            //         caFile: "E:\\certutil\\doctest\\ca2.pem",
            //         certFile: "E:\\certutil\\doctest\\client-cert2.pem",
            //         keyFile: "E:\\certutil\\doctest\\client-cert-key2.pem",
            //         passphrase: "test123",
            //     },
            // };

            let vsts: vm.WebApi = new vm.WebApi(serverUrl, authHandler, option);
            let connData: lim.ConnectionData = await vsts.connect();
            console.log('Hello ' + connData.authenticatedUser.providerDisplayName);
            resolve(vsts);
        }
        catch (err) {
            reject(err);
        }
    });
}

export function getProject(): string {
    return 'Test';

    //return getEnv('API_PROJECT');
}

export function banner(title: string): void {
    console.log('=======================================');
    console.log('\t' + title);
    console.log('=======================================');
}

export function heading(title: string): void {
    console.log();
    console.log('> ' + title);
}


