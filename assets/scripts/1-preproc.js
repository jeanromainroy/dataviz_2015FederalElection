"use strict";

/**
 * Fichier permettant de traiter les données provenant du fichier CSV.
 */


/**
 * Précise le domaine et la plage de couleurs pour l'échelle qui est utilisées pour distinguer les partis politiques.
 *
 * @param color     Échelle de couleurs.
 * @param parties   Les informations à utiliser sur les différents partis.
 */
function colorScale(color, parties) {
  // TODO: Préciser le domaine de l'échelle en y associant chacun des partis politique de la liste spécifiée en paramètre.
  //       De plus, préciser la gamme de couleurs en spécifiant les couleurs utilisées par chacun des partis.
  var partiesName = [];
  parties.forEach(function(d) {
    partiesName.push(d.name);
  });

  var partiesColor = [];
  parties.forEach(function(d) {
    partiesColor.push(d.color);
  });
  
  color.domain(partiesName).range(partiesColor);
}

/**
 * Convertit chacun des nombres provenant du fichier CSV en type "number".
 *
 * @param data      Données provenant du fichier CSV.
 */
function convertNumbers(data) {
  // TODO: Convertir les propriétés "id" et "votes" en type "number" pour chacun des éléments de la liste.
  data.forEach(function(d){
    d.id = parseInt(d.id);
    d.votes = parseInt(d.votes);
  })
}

/**
 * Réorganise les données afin de combiner les résultats pour une même circonsription.
 *
 * @param data      Données provenant du fichier CSV.
 * @return {Array}  Les données réorganisées qui seront utilisées. L'élément retourné doit être un tableau d'objets
 *                  comptant 338 entrées, c'est-à-dire, une entrée par circonscription. Chacune des entrées devra
 *                  présenter les résultats pour chacun des candidats triés en ordre décroissant (du candidat ayant
 *                  obtenu le plus de votes à celui en ayant reçu le moins). L'objet retourné doit avoir la forme suivante:
 *
 *                  [
 *                    {
 *                      id: number              // Le numéro de la circonscription
 *                      name: string,           // Le nom de la circonscription
 *                      results: [              // Le tableau contenant les résultats pour les candidats s'étant présentés.
 *                                              // *** Ce tableau doit être trié en ordre décroissant de votes. ***
 *                        {
 *                          candidate: string,  // Le nom du candidat
 *                          votes: number,      // Le nombre de votes obtenus pour le candidat
 *                          percent: string,    // Le pourcentage des votes obtenus par le candidat
 *                          party: string       // Le parti politique du candidat
 *                        },
 *                        ...
 *                      ]
 *                    },
 *                    ...
 *                  ]
 */
function createSources(data) {
  // TODO: Retourner l'objet ayant le format demandé. Assurez-vous de trier le tableau "results" pour chacune des entrées
  //       en ordre décroissant de votes (le candidat gagnant doit être le premier élément du tableau).

  // Add every unique electoral district
  var electoralDistricts = [];
  var newData = []
  data.forEach(function(d){
    if(!electoralDistricts.includes(d.name)){
      electoralDistricts.push(d.name);

      newData.push({
        name: d.name,
        id: d.id,
        results: []
      });
    }
  });

  // Add the results for every electoral districts
  newData.forEach(function(d1){

    d1.results = data.filter(function(d){return d.name === d1.name;}).map(function(d2){
      return {
        candidate: d2.candidate,
        votes: d2.votes,
        percent: d2.percent,
        party: d2.party
      }
    });
  });

  // Order in descending order
  newData.forEach(function(d){
    d.results.sort(function(x,y){
      return d3.descending(x.votes,y.votes);
    });
  });

  return newData;
}
