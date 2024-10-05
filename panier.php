<?php
$page = "panier";
include('commun/entete.com.php');
?>
<main class="page-panier">
  <article class="amorce">
    <h1><?= $_["titrePage"]; ?></h1>
  </article>
  <article class="principal">
    <div class="liste-panier">
      <!-- 
        [TPv34] Point 3 : utilisez la variable $detailPanier pour générer 
        dynamiquement le contenu du panier.
      -->
      <!-- Gabarit d'un article dans le panier -->

      <?php
      if (count($detailPanier) > 0) :
        foreach ($detailPanier as $idArticle) :
      ?>
          <article class="item-panier" data-aid="<?= $idArticle["id"]; ?>">
            <div class="image-nom">
              <div class="image">
                <img src="images/produits/teeshirts/<?= $idArticle["image"] ?>" alt="Nom du produit ici">
              </div>
              <div class="nom"><?= $idArticle["nom"] ?> </div>
              <button class="btn-supprimer material-icons" title="Cliquez pour supprimer cet article du panier">delete</button>
            </div>
            <div class="qte-prix">
              <div class="prix">
                <span class="etiquette-prix">Prix : </span>
                <span class="valeur-prix montant montant-fr"><?= $idArticle["prix"] ?></span>
              </div>
              <div class="quantite">
                <span class="etiquette-qte">Quantité : </span>
                <span class="valeur-qte">
                  <input type="number" name="quantite" value="<?= $idArticle["qte"] ?>" min="1" max="9">
                  <button class="btn-modifier material-icons" title="Cliquez pour mettre à jour la quantité pour cet article">update</button>
                </span>
              </div>
              <div class="total-article">
                <span class="etiquette-soustotal">Sous-total : </span>
                <span class="valeur-soustotal montant montant-fr"><?= number_format($idArticle["prix"] * $idArticle['qte'], 2)  ?></span>
              </div>
            </div>
          </article>
        <?php endforeach; ?>
      <?php else : ?>
        <p>Vous n'avez aucun article dans le panier 😞</p>
      <?php endif ?>
      
    </div>
    <div class="sommaire-panier">
      <span class="nb-articles">(<?= $_["nbArticles"]; ?> <span class="nombre"><?= $totalPanier; ?></span>)</span>
      <span class="sous-total">
        <?= $_["sousTotal"]; ?>
        <span class="montant montant-fr"><?= number_format($totalPrix, 2); ?></span>
      </span>
      <span class="btn-commander"><?= $_["btnCommander"]; ?></span>
    </div>
  </article>
</main>

<!-- Gabarit utilisé pour les requêtes asynchrones -->
<template id="gabarit-panier">
<article class="item-panier" data-aid="">
            <div class="image-nom">
              <div class="image">
                <img src="images/produits/teeshirts/" alt="Nom du produit ici">
              </div>
              <div class="nom"></div>
              <button class="btn-supprimer material-icons" title="Cliquez pour supprimer cet article du panier">delete</button>
            </div>
            <div class="qte-prix">
              <div class="prix">
                <span class="etiquette-prix">Prix : </span>
                <span class="valeur-prix montant montant-fr"></span>
              </div>
              <div class="quantite">
                <span class="etiquette-qte">Quantité : </span>
                <span class="valeur-qte">
                  <input type="number" name="quantite" value="" min="1" max="9">
                  <button class="btn-modifier material-icons" title="Cliquez pour mettre à jour la quantité pour cet article">update</button>
                </span>
              </div>
              <div class="total-article">
                <span class="etiquette-soustotal">Sous-total : </span>
                <span class="valeur-soustotal montant montant-fr"></span>
              </div>
            </div>
          </article>
</template>
<?php include('commun/pied2page.com.php'); ?>