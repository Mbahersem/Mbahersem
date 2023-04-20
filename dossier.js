const Fichier = require('./fichier');
// FileSystem module
const fs = require('node:fs');

class Dossier {
    fichier = new Fichier();
    reg = /^[a-zA-Z0-9_-]+\.[a-z0-9]+$/;

    /*
    @Goal : Read in the directory, check the extension of a file, copy the file in the folder with the associated extension
    @Param : Path to the directory
    */
    async parcourtDossier(chemin) {
        fs.readdir(chemin, (err, files) => {
            if(err) throw err;
            files.forEach(async file => {

                if(this.fichier.verifType(chemin + '/' + file) !== undefined) {
                    // console.log(file);
                    let ext = this.fichier.verifType(chemin + '/' + file);
                    ext = ext.split('.')[1];
                    const existe = this.verifDossier(chemin + '/' + ext);
    
                    if(existe) {
                        await this.fichier.copieFichier(chemin + '/' + file, chemin + '/' + ext);
                    }
                    else {
                        this.creerDossier(chemin + '/' + ext);
                        await this.fichier.copieFichier(chemin + '/' + file, chemin + '/' + ext);
                    }
                }
            });
        });
    }

    /*
    @Goal : Verify if a folder exists
    @Param : Path to the directory
    @Return a boolean
    */
    verifDossier(chemin) {
        fs.exists(chemin, (exist) => {
            let val = exist ? true : false;
            return val;
        });
    }

    /*
    @Goal : Create a folder
    @Param : Path to the directory
    */
    creerDossier(chemin) {
        fs.mkdir(chemin, {recursive: true}, (err) => {
            if(err) throw err;
        });
    }

    /*
    @Goal : Delete each file in the folder
    @Param : Path to the directory
    */
    async toutSupprimer(chemin) {
        fs.readdir(chemin, (err, files) => {
            if(err) console.log(err);
            files.forEach(async file => {
                if(this.fichier.verifType(chemin + '/' + file) !== undefined)
                    this.fichier.supprimeFichier(chemin + '/' + file);
            });
        });
    }

    async estFichier(chemin) {
        fs.stat(chemin, (err, stats) => {
            if(err) console.log(err);
            return stats.isFile();
        });
    }
}

// We exports the class
module.exports = Dossier;