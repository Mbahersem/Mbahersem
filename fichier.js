const fs = require('node:fs');
const path = require('node:path');

class Fichier {
    /*
    @Goal : Check the extension of a file
    @Param : The path to the file
    @Return the extension
     */
    verifType(chemin) {
        return path.extname(chemin);
    }

    /*
    @Goal : Copy the file into the folder
    @Params :
        -cheminFichier : Path to the file
        -dest : Path of the directory
     */
    async copieFichier(cheminFichier, dest) {
        const fileName = path.basename(cheminFichier);
        fs.copyFile(cheminFichier, dest + '/' + fileName, (err) => {
            if(err) {
                // console.log(err);
            }
            // console.log(fileName, 'copié');
        });
    }

    /*
    @Goal : Delete a file
    @Param : Path to the file
     */
    supprimeFichier(chemin) {
        fs.unlink(chemin, (err) => {
            if(err) {
                // console.log(err);
                return;
            }
            // console.log(`${chemin} supprimé` );
        });
    }
}

module.exports = Fichier;