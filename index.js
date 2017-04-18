
let fs = require( 'fs' );

/**
 * Simple function that converts a node-style callback function into either a resolved Promise or a rejected one.
 */
function cb( resolve, reject ) {
	return ( err ) => {
		if ( err )
			reject( err );
		resolve();
	};
}

/**
 * Wrapper around fs.unlink function to make it a Promise.
 */
function unlink( filename ) {
	return new Promise(( resolve, reject ) => {
		fs.unlink( filename, cb( resolve, reject ) );
	} );
}

/**
 * Wrapper around fs.rename function to make it a Promise.
 */
function rename( oldname, newname ) {
	return new Promise(( resolve, reject ) => {
		fs.rename( oldname, newname, cb( resolve, reject ) );
	} );
}

/**
 * Simple function to silently ignore errors with code 'ENOENT' and rethrow the rest.
 */
function ignoreFileNotFound( err ) {
	if ( 'code' in err && err.code === 'ENOENT' )
		return;
	throw err;
}

/**
 * Simple function that invokes an array of promises sequentially.
 */
function chain( promises ) {
	let promise = Promise.resolve();
	if ( promises.length > 0 ) {
		for ( let i = promises.length - 1; i >= 0; i-- ) {
			promise = promise.then( promises[ i ] );
		}
	}
	return promise;
}

/**
 * Main function. Rotates a file by changing its extension to '.N', up to count times, after which it is deleted forever.
 */
function rotate( filename, count = 3, compress = false ) {

	let promises = [];
	promises.push( unlink( `${filename}.${count}` ).catch( ignoreFileNotFound ) );
	for ( let i = count - 1; i >= 0; i-- ) {
		promises.push( rename( `${filename}.${i}`, `${filename}.${i + 1}` ).catch( ignoreFileNotFound ) );
	}
	promises.push( rename( `${filename}`, `${filename}.0` ).catch( ignoreFileNotFound ) );
	return chain( promises );

}

module.exports = rotate;