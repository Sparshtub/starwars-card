import { useState, useEffect } from 'react';
import type { Planet } from '../types/starwars';
import { fetchPlanet } from '../services/swapi';

export function useHomeworld(homeworldUrl: string | null) {
  const [planet, setPlanet] = useState<Planet | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!homeworldUrl) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPlanet(null);
      setLoading(false);
      return;
    }

    let isMounted = true;
    setLoading(true);
    setError(null);

    fetchPlanet(homeworldUrl)
      .then((data) => {
        if (isMounted) {
          setPlanet(data);
          setLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (isMounted) {
          const msg = err instanceof Error ? err.message : 'Could not fetch homeworld';
          setError(msg);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [homeworldUrl]);

  return { planet, loading, error };
}
