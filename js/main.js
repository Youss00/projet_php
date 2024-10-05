// [TPv2] Point 6 et 7


// Langue du site
let langue = document.documentElement.lang;
// Ou encore : let langue = document.querySelector('html').lang;

// Gestion du tri et filtre de produits
let selectFiltreOuTri = document.querySelector('.controle form');
if (selectFiltreOuTri) {
  selectFiltreOuTri.addEventListener('change', function (evt) {
    fetch("async/teeshirts.async.php?filtre="
      + this.filtre.value
      + "&tri="
      + this.tri.value
    ).then(afficherProduits);
  });
}

function afficherProduits(rep) {
  rep.json().then(function (res) {
    let conteneurProduits = document.querySelector("main.page-teeshirts article.principal");
    let gabaritProduit = document.getElementById("gabarit-produit");
    conteneurProduits.innerHTML = "";
    for (let prod of res) {
      let cloneProd = gabaritProduit.content.cloneNode(true);
      cloneProd.firstElementChild.dataset.pid = prod.id;
      cloneProd.querySelector('.ventes').innerHTML = prod.ventes;
      cloneProd.querySelector('img').src += prod.image;
      cloneProd.querySelector('img').alt = prod.nom;
      cloneProd.querySelector('.nom').innerHTML = prod.nom;
      cloneProd.querySelector('.montant').innerHTML = prod.prix;
      conteneurProduits.appendChild(cloneProd);
    }
  });
}


/******** Gestion du panier d'achats *********/

/***** Fonctions générales *****/
/*  
  [TPv34] Point 2 : utilisez la valeur du paramètre detailPanier dans la fonction 
  qui suit pour mettre à jour l'interface utilisateur (sommaire dans l'entête, 
  sommaire dans la page panier, badge, et message de panier vide).
*/
/**
 * Gère la mise à jour de l'affichage de l'interface utilisateur après les actions
 * asynchrones sur le panier (les sommaires, le badge, le message de panier vide).
 * 
 * @param {Array} detailPanier : Tableau numérique contenant des tableaux 
 *                               associatifs représentant chacun un article dans
 *                               le panier.
 */
function gererAffichageActionsPanier(detailPanier) {
  // Vérifiez la console pour comprendre la variable detailPanier !
  console.log("État du panier : ", detailPanier);

  let conteneurSousTotal = document.querySelector(".ligne2 .sous-total");
  let conteneurSousTotalSommaire = document.querySelector("div.sommaire-panier span.montant");
  let conteneurBadge = document.querySelector(".badge");

  // console.log(conteneurSousTotalSommaire);
  let conteneurQteSommaire = document.querySelector("main.page-panier .nombre");
  // console.log(conteneurQteSommaire);
  let conteneurQuantite = document.querySelector("span.nombre");

  let gabaritPanier = document.getElementById("gabarit-panier");
  let conteneurPanier = document.querySelector(".liste-panier");

  //Etape 2: mettre en asynchrone quand on ajoute au panier
  let quantite = 0;
  let sousTotal = 0;

  for (let article of detailPanier) {
    quantite += parseInt(article["qte"]);
    sousTotal += parseFloat(article["prix"] * article["qte"]);
  }
  console.log(conteneurQuantite);
  conteneurSousTotal.innerHTML = sousTotal.toFixed(2);
  conteneurQuantite.innerHTML = quantite;
  //Faire l'async du badge pour le faire afficher dynamiquement
  conteneurBadge.innerHTML = quantite;

  if (conteneurQteSommaire && conteneurSousTotalSommaire) {
    conteneurSousTotalSommaire.innerHTML = sousTotal.toFixed(2);
    conteneurQteSommaire.innerHTML = quantite;
  }

  //Étape 4: Implementer en async le changement de quantité rendu dans la page panier

  if (conteneurPanier) {  
  if (quantite > 0) {
    conteneurPanier.innerHTML = "";
    for (let idArticle of detailPanier) {
      let cloneArticle = gabaritPanier.content.cloneNode(true);
      cloneArticle.firstElementChild.dataset.aid = idArticle.id;
      cloneArticle.querySelector('.nom').innerHTML = idArticle.nom;
      cloneArticle.querySelector('img').src += idArticle.image;
      cloneArticle.querySelector('span.valeur-prix').innerHTML = idArticle.prix;
      cloneArticle.querySelector('input').value = idArticle.qte;
      cloneArticle.querySelector('span.valeur-soustotal').innerHTML = (idArticle.prix * idArticle.qte).toFixed(2);
      conteneurPanier.appendChild(cloneArticle);
    }

  } else{
   // si la quantité dans le panier est vide, on affiche le message suivant
    conteneurPanier.innerHTML = " <p>Vous n'avez aucun article dans le panier 😞</p>";
  }
}


}


/***** AJOUTER *****/
// Saisir le conteneur de tous les produits.
let conteneurProduits = document.querySelector(".liste-produits");

// Écouter le clic sur ce conteneur.
if (conteneurProduits) {
  conteneurProduits.addEventListener('click', gererRequeteAjoutPanier);
}

/**
 * Gère la requête HTTP asynchrone pour ajouter un produit au panier.
 * @param {Event} evt : objet événement généré par le DOM. 
 */
function gererRequeteAjoutPanier(evt) {
  // On saisit la cible directe du clic.
  let cibleClic = evt.target;
  // S'il s'agit d'un élément ayant la classe "btn-ajouter"
  if (cibleClic.classList.contains("btn-ajouter")) {
    // On accède à la valeur de l'attribut data- contenant l'identifiant du produit.
    let pid = cibleClic.closest("div.produit").dataset.pid;
    // Et on émet une requête HTTP asynchrone avec l'API Fetch.
    fetch("async/panier.async.php?action=ajouter&pid=" + pid).then(gererReponseAjoutPanier);
  }
}

/**
 * Décode la réponse JSON et appelle la fonction qui gère l'affichage.
 * @param {Object} reponse : objet réponse de la requête HTTP asynchrone. 
 */
function gererReponseAjoutPanier(reponse) {
  reponse.json().then(gererAffichageActionsPanier);
}

/***** FIN - AJOUTER *****/

/*
  [TPv34] Point 4 : Code requis pour modifier la quantité d'un article.
*/
// Saisir le bouton permettant de déclencher l'évènement de modification de quantité.

let connteneurProdModif = document.querySelector('.page-panier');
if (connteneurProdModif) {
  connteneurProdModif.addEventListener('click', gererRequeteModifierPanier);
}
//  console.log(connteneurProdModif);
function gererRequeteModifierPanier(evt) {
  //On vérifie si l'utilisateur a cliqué sur le bouton de diminution ou augmentation de quantité
  if (evt.target.classList.contains('btn-modifier')) {
    //On recupere l'id et la qté du produit dans son container parent
    let aid = evt.target.closest("article.item-panier").dataset.aid;
    let qteItem = parseInt(evt.target.parentNode.querySelector('input').value);
    console.log(qteItem, aid);
    if (qteItem == 0) {
      fetch("async/panier.async.php?action=supprimer&id=" + aid).then(gererReponseSupprimerPanier);
    }
    else {
      fetch("async/panier.async.php?action=modifier&id=" + aid + "&qte=" + qteItem).then(gererReponseModifierPanier);
    }

  }
  // console.log(gererRequeteModifierPanier);


}
function gererReponseModifierPanier(reponse) {
  reponse.json().then(gererAffichageActionsPanier);
}


/*
  [TPv34] Point 5 : Code requis pour supprimer un article du panier.
*/

let conteneurSupprimerProduit = document.querySelector(".page-panier");
if (conteneurSupprimerProduit) {
  conteneurSupprimerProduit.addEventListener("click", gererRequeteSupprimerPanier);
}
function gererRequeteSupprimerPanier(evt) {

  if (evt.target.classList.contains('btn-supprimer')) {
    let id = evt.target.closest("article.item-panier").getAttribute("data-aid");
    console.log(id);
    fetch("async/panier.async.php?action=supprimer&id=" + id).then(gererReponseSupprimerPanier);
  }
}
function gererReponseSupprimerPanier(reponse) {
  reponse.json().then(gererAffichageActionsPanier);
}