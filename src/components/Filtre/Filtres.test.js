import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Filtres from './Filtres';


describe('Composant Filtres', () => {

    test('Vérifie la gestion du click et de l\'affichage du filtre actif', async () => {

        // Mock de la fonction handleFiltres
        const onFiltreChange = jest.fn();

        render(<Filtres onFiltreChange={onFiltreChange} />);

        const filterItem = screen.getByText('Réalisateur alphabétique (A-Z)');
        fireEvent.click(filterItem);

        expect(onFiltreChange).toHaveBeenCalled();

        const elFiltreActif = screen.getByTestId('filtreActif');
        await waitFor(() => {
            expect(elFiltreActif.textContent).toBe('Réalisateur alphabétique (A-Z)');
        });
    });
});