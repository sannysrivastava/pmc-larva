const path = require( 'path' );

/**
 * Get Larva Configuration
 *
 * Find larva.config.js according to the current working directory.
 * For consuming projects, this will be theme/assets/, and for the
 * mono-repo, it will be packages/larva.
 *
 * For test env, the CWD is overridden to the local directory for fixtures.
 * (this is a problem for writing project-level tests, but for a later time.)
 *
 * @param {string} key string that indicates a specific configuration property, e.g. patterns.
 * @param {boolean} usePackageDefault fall back to package default if not defined in app
 *
 * @returns value of the specified key.
 */

const defaultConfig = require( path.join( __dirname, '../../../../larva.config.js' ) );

module.exports = function getAppConfiguration( key, usePackageDefault ) {

	try {
		let appRoot = process.cwd();

		if ( 'test' === process.env.NODE_ENV ) {
			appRoot = path.join( __dirname, '../../__tests__/fixtures/' );
		}

		let config = require( `${appRoot}/larva.config.js` );

		// If config not found in approot, fallback to package default in root
		if ( undefined === config && usePackageDefault ) {
			return defaultConfig[ key ];
		}

		return config[key];

	} catch ( error ) {
		console.warn( 'Using default configuration. ');

		return defaultConfig[ key ];
	}
};
