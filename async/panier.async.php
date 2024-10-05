<?php
// Gestion de la session
session_start();

// Inclure le fichier de config du site
include("../adeplacer/teetim.conf.php");

// Inclure la librairie "SQL" pour manipuler les données dans la BDR.
include("../lib/sql.lib.php");
// Obtenir une connexion au serveur de BD.
$cnx = connexion();

// Inclure la librairie de gestion du panier.
include("../lib/panier.lib.php");

// On récupère l'identifiant du panier de l'utilisateur à partir de la variable 
// de session établie dès l'arrivée au site.
$idPanier = $_SESSION["idPanier"];

// On suppose que le paramètre "action" est toujours reçu dans la requête Get.
// Ce paramètre est sensé indiquer l'opération souhaitée sur le panier : c'est à
// dire une des opération 'ajouter', 'modifier' ou 'supprimer'.
$action = $_GET["action"];

switch($action) {
  case 'ajouter' : 
      $pid = $_GET["pid"];
      ajouterArticle($cnx, $idPanier, $pid);
    break;

  /*
    [TPv34] nécessaire pour compléter le point 5
  */
  case 'supprimer' : 
    $id = $_GET["id"];
    supprimerArticle($cnx, $id);
    break;

  /*
    [TPv34] nécessaire pour compléter le point 4
  */
  case 'modifier':
    // Pour modifier un article on doit passer en plus l'index de cet article
    // (nombre qui identifie cet élément dans le tableau des articles du panier).
      $qteItem = $_GET['qte'];
      
      $aid = $_GET['id'];
      modifierArticle($cnx, $qteItem, $aid);
      
    break;

}

// Quel que soit l'opération de panier, on fini toujours en retournant le 
// détail du panier après ces modifications.
echo json_encode(obtenirDetailPanier($cnx, $idPanier));