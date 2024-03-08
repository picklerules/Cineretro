import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ListeFilms from './ListeFilms';
import TuileFilm from '../TuileFilm/TuileFilm';


describe('Composant ListeFilms', () => {   //ici c'est la description du groupe de test

    // Objet fictif
    const mockFilm = {
        titre: 'Alien - Le 8ème passager',
        genres: ['Horreur', 'Science-fiction'],
        description: 'Un vaisseau spatial perçoit une transmission non-identifiée comme un signal de détresse...',
        titreVignette: 'alienle8emepassager.jpg',
        realisation: 'Ridley Scott',
        annee: 1979,
        notes: [3, 4, 5, 2, 1],
        commentaires: [
            { commentaire: 'Ccommentaire 1', auteur: 'admin' },
            { commentaire: 'Commentaire 2', auteur: 'admin' },
        ]
    };


    test('Vérifie la tuile d\'un film', () => {

        //me permet de faire une version fictive et virtuelle
        render(<TuileFilm data={mockFilm} />);

        expect(screen.getByText(mockFilm.titre)).toBeInTheDocument();
        const elImg = document.querySelector('img');
        expect(elImg).toHaveAttribute('src', `/img/${mockFilm.titreVignette}`);


    });



    /**
     * À faire pour tous les films (boucle forEach)
     */
    test('Vérifie si les clés sont présentes dans la réponse', async () => {

        //sur mockFilms faire la poutine pour trouver la moyenne et le nombre de votes 
        //copier coller la fonction moyenne pour eviter de l'importer
        //render le composant vote avec sa/ses props 
        //sur screen toBeInTheDocument() pour moyenne puis nombre de votes




    });
});