// augmenter le panier
// diminuer le panier
// augmenter le prix si le panier augmente
//diminuer le prix si le panier diminue, disparaitre si plus de quantité
//augmenter le total si la somme du prix des articles augmentent
//diminuer le prix si la somme du prix des articles diminuent
//PBTIQUE: plusieurs bouton, on peut pas faire un par un car si il y a 100 articles = long et fastidieux

// la partie "base de donnée"
const panier = [
  {
    id: "product-1",
    nombre: 1,
    prix: 10,
    buttonPrice: "product-price-1",
    buttonNombre: "product-nombre-1",
    productElement: "product-1",
    poubelle: "product-1",
  },
  {
    id: "product-2",
    nombre: 1,
    prix: 15,
    buttonPrice: "product-price-2",
    buttonNombre: "product-nombre-2",
    productElement: "product-2",
    poubelle: "product-2",
  },
  {
    id: "product-3",
    nombre: 1,
    prix: 25,
    buttonPrice: "product-price-3",
    buttonNombre: "product-nombre-3",
    productElement: "product-3",
    poubelle: "product-3",
  },
  {
    id: "product-4",
    nombre: 1,
    prix: 25,
    buttonPrice: "product-price-4",
    buttonNombre: "product-nombre-4",
    productElement: "product-4",
    poubelle: "product-4",
  },
];
// la partie ajouter
function addProduct(productId) {
  const product = panier.find((p) => p.id === productId);
  product.nombre++;

  // modification du prix total de l'article
  const prixTotal = product.nombre * product.prix;
  const productPriceElement = document.getElementById(product.buttonPrice);
  productPriceElement.textContent = prixTotal + " " + "€";

  // modification du nombre d'article
  const productNombreElement = document.getElementById(product.buttonNombre);
  productNombreElement.textContent = product.nombre;

  // prix du panier quand il augmente
  const prixPanier = panier.reduce((acc, currentValue) => {
    if (currentValue.nombre < 1) return acc;
    return currentValue.nombre * currentValue.prix + acc;
  }, 0);

  const panierElement = document.getElementById("article3-prixtotal");
  panierElement.textContent = prixPanier + " " + "€";
}

// la partie supprimer
function removeProduct(productId) {
  const product = panier.find((p) => p.id === productId);
  product.nombre--;

  // modification du prix total de l'article
  const prixTotal = product.nombre * product.prix;
  const productPriceElement = document.getElementById(product.buttonPrice);
  productPriceElement.textContent = prixTotal + " " + "€";

  // modification du nombre d'article
  const productNombreElement = document.getElementById(product.buttonNombre);
  productNombreElement.textContent = product.nombre;

  // suppresion de l'article quand la quantité est à 0
  if (product.nombre < 1) {
    const productElement = document.getElementById(product.productElement);
    productElement.remove();
    console.log(productElement);
  }

  // Prix du panier quand il diminue
  const prixPanier = panier.reduce((acc, currentValue) => {
    if (currentValue.nombre < 1) return acc;
    return currentValue.nombre * currentValue.prix + acc;
  }, 0);

  const panierElement = document.getElementById("article3-prixtotal");
  panierElement.textContent = prixPanier + " " + "€";
}

// Poubelle fonction reset

document.getElementById("poubelle1").addEventListener("click", (event) => {
  document.getElementById("product-1").remove();
  console.log(event);
});
document.getElementById("poubelle2").addEventListener("click", (event) => {
  document.getElementById("product-2").remove();
  console.log(event);
});
document.getElementById("poubelle3").addEventListener("click", (event) => {
  document.getElementById("product-3").remove();
  console.log(event);
});
document.getElementById("poubelle4").addEventListener("click", (event) => {
  document.getElementById("product-4").remove();
  console.log(event);
});
