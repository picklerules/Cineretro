import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import accueilDonnees from "./Accueil.json";
import Accueil from './Accueil';

describe('Composant Accueil', () => {
    test('verifie si chaque paragraphe du contenu de Accueil.json est présent dans le document', () => {
      render(<Accueil />);
  
      accueilDonnees.forEach((paragraphe) => {
        expect(screen.getByText(paragraphe)).toBeInTheDocument();
      });
    });
  });

