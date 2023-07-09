const slider = {
    // On créé un tableau qui contiendra toutes les images du slider qu'on va concatener avec "img/" dans generateSliderImages
    sliderImages : [
        'ocean.jpg',
        'ski.jpg',
        'city.jpg'
    ],
    // Ici on stock nos 3 balises img dans la propriété sliderImagesElements (c'est un tableau indexé) 
    sliderImagesElements : [],
    // Ici on stock l'index de l'image qui est affiché (c'est un int)
    currentImageIndex : 0,
    generateSliderImages : function() {
        const sliderContainer = document.querySelector('.slider');
        for (const current of slider.sliderImages) {
            const newSliderImage = document.createElement('img');
            newSliderImage.src = "img/"+current;
            newSliderImage.classList.add("slider__img");
            newSliderImage.alt = "Partir à la plage";
            sliderContainer.prepend(newSliderImage);
        }
        const firstSliderImage = document.querySelector('.slider__img');
        firstSliderImage.classList.add('slider__img--current');
    },
    // On créé notre methode init()
    init : function() {
        // generatesliderimage() créé les 3 balise <img>
        slider.generateSliderImages();
        // Ici on stock toutes les balises img qui contiennent nos images dans slider.sliderImagesElements
        slider.sliderImagesElements = document.querySelectorAll('.slider__img');

        // On récupere les boutons dans un tableau a 2 index : index [0] = bouton previous
        //                                                     et index[1] = bouton next
        const sliderButtons = document.querySelectorAll('.slider__btn');
        // On place un écouteur d'évènement sur le bouton previous (index 0)
        const previousSliderButton = sliderButtons[0];
        previousSliderButton.addEventListener('click', slider.handleClickPreviousSlide);

        // On place un écouteur d'évènement sur le bouton next (index 1)
        const nextSliderButton = sliderButtons[1];
        nextSliderButton.addEventListener('click', slider.handleClickNextSlide);
    },

    handleClickNextSlide : function() {
        // On recupère l'image actuellement affiché
        const currentImage = document.querySelector('.slider__img--current');
        // On retire l'attribut --current car on veut plus qu'il soit affiché
        currentImage.classList.remove('slider__img--current');
        // On incrémente l'index de l'image actuelle qui est censé s'afficher
        slider.currentImageIndex++;
        /* Si slider.currentImageIndex est égal à 3 alors on va afficher quelque chose qui n'existe pas
        car il n'y a que 3 éléments dans le tableau sliderImagesElements donc l'index maximal est égal à 2 */
        if (slider.currentImageIndex === 3) {
            slider.currentImageIndex = 0;
        }
        // On stock dans newCurrentImage l'élément qui doit maintenant s'afficher
        const newCurrentImage = slider.sliderImagesElements[slider.currentImageIndex];
        // Ici on va attribuer à cet élément l'attribut --current pour qu'il s'affiche 
        newCurrentImage.classList.add('slider__img--current');
    },
    
    handleClickPreviousSlide : function() {
        // On recupere l'image actuellement affiché
        const currentImage = document.querySelector('.slider__img--current');
        // On retire l'attribut --current car on veut plus qu'il soit affiché
        currentImage.classList.remove('slider__img--current');
        // On décrémente l'index de l'image actuelle qui est censé s'afficher
        slider.currentImageIndex--;
        /* Ici on pose une condition pour gérer le cas où notre index sera plus petit que 0 
        (si plus petit que 0 alors ça voudrait dire que l'on essaye d'afficher quelque chose qui n'existe pas) */
        if (slider.currentImageIndex < 0) {
            slider.currentImageIndex = 2;
        }
        const newCurrentImage = slider.sliderImagesElements[slider.currentImageIndex];
        newCurrentImage.classList.add('slider__img--current');
    }
    
}

// Ici on créé un ecouteur d'evenement lorsque le DOM a finit de se charger completement avant meme de charger le css et le reste
// On fait ça pour que ce soit fait en priorité
// On n'oublie pas d'initialiser notre module pour qu'il soit actif
document.addEventListener('DOMContentLoaded', slider.init);