// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  host: 'localhost',
	user: 'root',
	password: 'mfj123',
	database: 'pm',
  SERVER_URL: 'mysql://bd10f96685d9c8:8203766d@eu-cdbr-west-02.cleardb.net/heroku_57b74cfd3c406d8'
};
