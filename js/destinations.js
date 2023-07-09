// Module de gestion des actions possibles pour les destinations
const destinations = {
    // Methode permettant d'initialiser le module
    // Souvent, la methode init() sert à ajouter des écouteurs d'évènement
    init : function() {
        const likeButton = document.querySelectorAll('.btn__like');
        for (const currentLike of likeButton) {
            currentLike.addEventListener('click', destinations.handleLikeClick);
        }
    },

    errorMessage : "Vous devez être connecté pour gérer vos favoris",

    handleLikeClick : function (event) {
        // Ici je sélectionne la zone où je veux afficher le message d'erreur
        const tousLarticle = event.target.closest('.card');
        // Ici on stock dans oldMessages tous les anciens messages d'erreur
        const oldMessages = tousLarticle.querySelectorAll('.message');
        // On parcours tous ces messages d'erreur pour les supprimer un à un
        for (const oldMessage of oldMessages) {
            oldMessage.remove();
        }
        // Ici je créé l'élément qui va contenir le message d'erreur, donc, ici, je créé une balise <p>
        const errorMessage = document.createElement('p');
        // Ici je rajoute à l'élément <p> que je viens de créer la class 'message' (adapté pour les messages d'erreur)
        errorMessage.classList.add('message');
        // Ici j'ajoute le contenu du message
        errorMessage.textContent = destinations.errorMessage;
        // Ici grâce a prepend je l'ajoute tout en haut de l'élément selectionné
        tousLarticle.prepend(errorMessage);
    }
}
