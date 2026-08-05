import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CharacterModal } from '../components/CharacterModal';
import type { Person } from '../types/starwars';

vi.mock('../hooks/useHomeworld', () => ({
  useHomeworld: () => ({
    planet: {
      name: 'Tatooine',
      terrain: 'desert',
      climate: 'arid',
      population: '200000',
      rotation_period: '23',
      orbital_period: '304',
      diameter: '10465',
      gravity: '1 standard',
      surface_water: '1',
      residents: [],
      films: [],
      created: '2014-12-09T13:50:49.641000Z',
      edited: '2014-12-20T20:58:18.411000Z',
      url: 'https://swapi.py4e.com/api/planets/1/',
    },
    loading: false,
    error: null,
  }),
}));

const mockLukeSkywalker: Person = {
  name: 'Luke Skywalker',
  height: '172',
  mass: '77',
  hair_color: 'blond',
  skin_color: 'fair',
  eye_color: 'blue',
  birth_year: '19BBY',
  gender: 'male',
  homeworld: 'https://swapi.py4e.com/api/planets/1/',
  films: [
    'https://swapi.py4e.com/api/films/1/',
    'https://swapi.py4e.com/api/films/2/',
    'https://swapi.py4e.com/api/films/3/',
    'https://swapi.py4e.com/api/films/6/',
  ],
  species: [],
  vehicles: [],
  starships: [],
  created: '2014-12-09T13:50:51.644000Z',
  edited: '2014-12-20T21:17:56.891000Z',
  url: 'https://swapi.py4e.com/api/people/1/',
};

describe('CharacterModal Integration Test', () => {
  const handleClose = vi.fn();

  it('renders character details and homeworld information correctly', () => {
    render(
      <CharacterModal
        person={mockLukeSkywalker}
        speciesName="Human"
        onClose={handleClose}
      />
    );

    // 1. Verify Character Name header
    expect(screen.getByRole('heading', { level: 2, name: 'Luke Skywalker' })).toBeInTheDocument();

    // 2. Verify Height formatted in meters (172 cm -> 1.72 m)
    expect(screen.getByText('1.72 m')).toBeInTheDocument();

    // 3. Verify Mass in kg (77 -> 77 kg)
    expect(screen.getByText('77 kg')).toBeInTheDocument();

    // 4. Verify Creation Date formatted in dd-MM-yyyy (2014-12-09 -> 09-12-2014)
    expect(screen.getByText('09-12-2014')).toBeInTheDocument();

    // 5. Verify Birth Year and Films count
    expect(screen.getByText('Birth Year: 19BBY')).toBeInTheDocument();
    expect(screen.getByText('4 films')).toBeInTheDocument();

    // 6. Verify Homeworld info fetched and displayed (Tatooine, desert, and population count)
    expect(screen.getByRole('heading', { level: 4, name: 'Tatooine' })).toBeInTheDocument();
    expect(screen.getByText('desert')).toBeInTheDocument();
    expect(screen.getAllByText(/200,000/).length).toBeGreaterThan(0);
  });

  it('handles characters with "unknown" height and mass gracefully', () => {
    const mockUnknownChar: Person = {
      ...mockLukeSkywalker,
      name: 'R2-D2',
      height: 'unknown',
      mass: 'unknown',
    };

    render(
      <CharacterModal
        person={mockUnknownChar}
        speciesName="Droid"
        onClose={handleClose}
      />
    );

    expect(screen.getByRole('heading', { level: 2, name: 'R2-D2' })).toBeInTheDocument();
    expect(screen.getAllByText('Unknown').length).toBeGreaterThanOrEqual(2);
  });

  it('renders nothing when person prop is null', () => {
    const { container } = render(
      <CharacterModal
        person={null}
        speciesName="Human"
        onClose={handleClose}
      />
    );

    expect(container.firstChild).toBeNull();
  });
});
