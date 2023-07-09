// On séléctionne l'élément bouton newsletter du menu
const menuItemElement = document.querySelector('#newsletter-btn');

// On pose un écouteur d'évenement qui au clic sur le bouton newsletter appellera un handler
menuItemElement.addEventListener('click', handleClickNewsletterMenu);

// Création du handler (fonction de callback pour notre écouteur d'évenement)
function handleClickNewsletterMenu(event) {
    // PreventDefault sert à bloquer le comportement par défaut du navigateur vis-à-vis de l'élément ciblé
    event.preventDefault();
    // On séléctionne l'encart de la newsletter
    const newsletterPanel = document.querySelector('.newsletter');
    // On lui ajoute la classe newsletter--on (la class qui va afficher l'encart dans la page) avec la méthode classList
    newsletterPanel.classList.add('newsletter--on');
}

// On séléctionne la croix pour cacher l'encart Newsletter
const closeElement = document.querySelector('.newsletter__close');

// On écoute notre évenement clic sur le bouton croix
closeElement.addEventListener('click', handleClickNewsletterCross);

// On créé notre handler qui sera appellé lors du clic sur le bouton croix de l'encart Newsletter
function handleClickNewsletterCross() {
    // On séléctionne l'encart de la newsletter
    const newsletterPanel = document.querySelector('.newsletter');
    // On lui retire la classe newsletter--on (pour que ca l'encart ne s'affiche plus) avec l'objet classList
    newsletterPanel.classList.remove('newsletter--on');
}

// On récupère le tableau des domaines jetables
const forbiddenDomains = [
    '@yopmail.com',
    '@yopmail.fr',
    '@yopmail.net',
    '@cool.fr.nf',
    '@jetable.fr.nf',
    '@courriel.fr.nf',
    '@moncourrier.fr.nf',
    '@monemail.fr.nf',
    '@monmail.fr.nf',
    '@hide.biz.st',
    '@mymail.infos.st',
];

// On créé une fonction qui va prendre en paramètre une adresse mail (une string) et qui va checker si elle est jetable ou non
// Renvoie true si pas jetable 
// Renvoie false si jetable
function isForbiddenEmail(email) {
    // Pour verifier qu'un email est jetable, on parcours la liste des domaines jetables
    // A chaque tour de boucle, domain sera égal à un élément de forbiddenDomains
    for (const domain of forbiddenDomains) {
        // La fonction includes permet de savoir si la string "email" contient la string "domain".
        // Donc si l'email contient le domaine testé.
        if (email.includes(domain)) {
            // Si on rentre dans cette condition, alors on est tombé sur un domaine jetable, on s'arrête là et on return false
            return false;
        }
    }
    // Si on arrive ici, l'email de l'utilisateur ne fait pas partie des domaines jetables, alors on return true
    return true;
}

// On séléctionne le formulaire et on place un écouteur d'évenement dessus
// Ici on séléctionne l'enfant form qu'il y a dans la classe newsletter
const formElement = document.querySelector('.newsletter form');

// Ici je me mets sur écoute de l'évenement 'submit' sur le formulaire selectionné
formElement.addEventListener('submit', handleNewsletterSubmit);

// Je créé mon handler qui sera appelé après soumission du formulaire
function handleNewsletterSubmit(event) {
    event.preventDefault();
    console.log("Le submit a bien été effectué !");
    // Une fois le formulaire soumi, on va chercher à récupérer ce qui est tapé par l'utilisateur.
    const userValue = document.querySelector('.newsletter__field').value;
    console.log(userValue);
    // Si l'email est jetable
    if (isForbiddenEmail(userValue) === false) {
        // On arrête l'envoi du formulaire
        // On affiche un message d'erreur
        // On créé une balise <p> pour y ecrire le message d'erreur
        const newError = document.createElement('p');
        // Ajouter la classe message à notre balise <p> qu'on vient de créer
        newError.classList.add('message');
        // On ajoute le message d'erreur à notre balise <p>
        // newError.textContent = "Les adresses jetables ne sont pas admises";
        newError.innerHTML = "Les adresses jetables ne sont pas admises";
        // On séléctionne d'abord l'élément dans lequel on insère le message d'erreur
        const newsletterPanel = document.querySelector('.newsletter');
        // A l'aide de la methode append, on ajoute notre message d'erreur précedemment créé à la fin de l'élément selectionné
        // "append" ajoute à la fin tandis que "prepend" ajoute au début
        newsletterPanel.append(newError);
    }
}

// Ici je lance mes fonctions contenues dans destinations.js 
destinations.init();