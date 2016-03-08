const glob = require('glob');

// Just a wrapper for glob to return a promise instead of a callback-based funtion
export default (path) => {
    return new Promise((resolve, reject) => {
        glob(path, null, (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(
                result
                    .map((file) => file.replace(/^.*[\\\/]/, ''))
                    .sort((fileNameA, fileNameB) => {
                        // Sorting the files based on the id written by webpack
                        const id1 = fileNameA.split('.').shift();
                        const id2 = fileNameB.split('.').shift();
                        return parseInt(id1) > parseInt(id2);
                    })
            );
        })
    })
}
