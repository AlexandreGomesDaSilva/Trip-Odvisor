const theme = {
    init : function() {
        // On selectionne le bouton de changement de theme 
        const changeThemeButton = document.querySelector('#theme-switch');
        // Au click, on lance la fonction handleChangeTheme
        changeThemeButton.addEventListener('click', theme.handleChangeTheme);
        
        // On selectionne tous les boutons de changement de couleur 
        const colorButtonsElements = document.querySelectorAll('.theme-button');

        // On place un écouteur d'evenement sur chaque boutons du tableau colorButtonsElements à l'aide d'une boucle for of
        for (const Element of colorButtonsElements) {
            // Au click, on lance la fonction handleChangeColorClick
            Element.addEventListener('click', theme.handleThemeColorClick);
        }

        // Ici je lance la méthode initLocalState()
        // Cette méthode me permet d'initaliser le theme du site en fonction de la valeur de la clé 'theme'
        // C-a-d que si theme = dark alors on va ajouter la classe dark-theme à la balise <body>
        // Et inversement si theme = light alors on supprime la classe theme-dark à la balise <body>
        // Pareil pour les boutons de couleurs vert, rouge et bleu
        theme.initLocalState();
    },

    initLocalState : function() {
        // On va recuperer la valeur du theme dans localStorage
        const localSave = localStorage.getItem('theme');
        // On check si le theme est en mode dark ou non
        if (localSave === "dark") {
            // On ajoute la classe theme-dark
            document.body.classList.add('theme-dark');
        }
        // Sinon, si le theme n'est pas egal à dark ( = à light)
        else {
            // Alors on retire la classe theme-dark à notre balise <body>
            document.body.classList.remove('theme-dark');
        }

        // Enfin, on check si on a sauvegardé un theme de couleur dans le localStorage
        const colorTheme = localStorage.getItem('colorTheme');
        // Si on a une valeur, alors on applique le theme de couleur
        if (colorTheme) {
            theme.changeColorTheme(colorTheme);
        }
    },

    handleChangeTheme : function() {
        // Ici je selectionne toute ma balise <body>
        const body = document.querySelector('body');
        /* Je pose ensuite une condition où je dis que si <body> contient la classe theme-dark 
        (ce qui signifie que le theme du site sera sombre) */
        if (body.classList.contains('theme-dark')) {
            // Alors on retire la classe theme-dark, pour que le site devienne clair
            body.classList.remove('theme-dark');
            // Ici je sauvegarde dans le localStorage, la clé 'theme' je lui attribue la valeur 'light'
            localStorage.setItem('theme', 'light');
        }
        // Sinon, ça voudrait dire que le theme est clair de base
        else {
            // Alors on ajoute la classe theme-dark pour que la page devienne sombre
            body.classList.add('theme-dark');
            /* Ici dans le localStorage j'attribue à la clé 'theme' la valeur 'dark' car maintenant le theme est sombre 
            (c'est ce qui fait que le navigateur se souvient du dernier theme selectionné) */
            localStorage.setItem('theme', 'dark');
        }
    },
    
    // Fonction dites "callback" pour notre écouteur d'évènement
    handleThemeColorClick : function (event) {
        // On récupère l'id du bouton cliqué, il contient le nom du thème
        const themeColor = event.target.id; // event.currentTarget.id fait la même chose
            // Débugage
            console.log(themeColor)
        // On éxécute ensuite la fonction changeColorTheme avec l'id sur lequel on a cliqué
        theme.changeColorTheme(themeColor);
        // On enregistre le theme dans le localStorage
        // Comme le nom du theme est une string, pas besoin de le convertir
        // setItem est la méthode qui permet de sauvegarder un élément dans le localStorage
        localStorage.setItem('colorTheme', themeColor);
    },

    changeColorTheme : function (leThèmeVoulu) {
        // On selectionne le body
        const bodyElement = document.querySelector('body');
        // On supprime les potentielles classes de theme présentent sur le body (ATTENTION, on ne parle pas du theme-dark ici)
        bodyElement.classList.remove('theme-red','theme-blue','theme-green') // classList.remove peut prendre plusieurs paramètres
        // On ajoute à l'attribut classe de body le theme selectionné
        bodyElement.classList.add(leThèmeVoulu);
        // On modifie le logo
        const logoPath = "img/logo-"+leThèmeVoulu+".png";
        // On selectionne le logo 
        const logoElement = document.querySelector('.logo__image');
        // On modifie son attribut src
        logoElement.src = logoPath; 
    }
};

// Ici on créé un écouteur d'évènement. Le DOM se chargera complètement avant même de charger le css et le reste
// On fait ça pour que ce soit fait en priorité
// On n'oublie pas d'initialiser notre module pour qu'il soit actif
document.addEventListener('DOMContentLoaded', theme.init);