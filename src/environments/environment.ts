// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCf1Ghr853TE_gBQj-RwGZlYtPhDoh86Xo',
    authDomain: 'moola-cache.firebaseapp.com',
    databaseURL: 'https://moola-cache.firebaseio.com',
    projectId: 'moola-cache',
    storageBucket: 'moola-cache.appspot.com',
    messagingSenderId: '33593464539'
  }
};
