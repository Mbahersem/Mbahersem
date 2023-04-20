const Dossier = require('./dossier');
let path = "C:/Users/user/Downloads";

let dossier = new Dossier();
// We make sure that the copy is terminated
(async () => {
    await dossier.parcourtDossier(path);
    await dossier.toutSupprimer(path)
})();

