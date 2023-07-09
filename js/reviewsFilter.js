const reviewsFilter = {

    init : function() {
    // Initialisation du module
    // Pour le moment on ne fait que selectionner les boutons de rating et on va les écouter
    // checkbox = case à cocher
    const ratingCheckboxes = document.querySelectorAll('.filter input'); // On selectionne input dans son parent (.filter)
    // On effectue la boucle qui va parcourir mon tableau qui contient mes 3 éléments HTML checkbox
    for (const checkBox of ratingCheckboxes) {
        checkBox.addEventListener('click', reviewsFilter.handleClickOnRatingCheckbox);
        }
    },

    // Ici la fonction (handler) qui s'exécute à chaque clic d'un bouton pour filtrer les resultats des commentaires, le parametre event va nous permettre de recolter un maximum d'infos sur l'élément sur lequel on a cliqué
    handleClickOnRatingCheckbox : function (event) {
        // On récupère la case sur laquelle on a coché
        const ratingCheckboxes = event.target;
        // Ici dans rating on stock la valeur exacte de la note. Si on clique sur 3 étoiles alors rating = 3, etc
        const rating = ratingCheckboxes.value;
        // Il nous reste plus qu'à afficher/cacher les commentaires ayant la même notation
        reviewsFilter.toggleReviewsFromRating(rating);
    },

    // Cette méthode va selectionner les commentaires ayant une note donnée (par le clic)
    // Et elle inverse sa visibiltié
    // Si le commentaire est caché (hidden) => on l'affiche
    // Si le commentaire est affiché => on le cache
    toggleReviewsFromRating : function(rating) {
        // On récupère la liste des commentaires ayant la note donnée (rating)
        // Et à l'aide de dataset c'est plus pratique
        // Dans toutes mes class review trouve moi toutes mes data-rating rating (rating = l'élément où t'as cliqué, 1, 2 ou 3 donc)
        const reviewsToFilter = document.querySelectorAll('.review[data-rating="'+rating+'"]'); /* Autre façon de concatener selon Thomas : 
        `.review[data-rating = "${rating}"]` */
        // On va devoir parcourir tous nos commentaires pour inverser sa visibilité
        for (const reviewElement of reviewsToFilter) {
            // On peut faire ça avec toggle
            // Si la class review--hidden est présente, toggle l'enlève
            // Si la class review--hidden est absente, toggle l'ajoute
            reviewElement.classList.toggle('review--hidden');
        }
    }
}

reviewsFilter.init();