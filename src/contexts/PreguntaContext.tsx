import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { Pregunta } from '@/types/Pregunta';

interface PreguntaContextType {
  preguntas: Pregunta[];
  loading: boolean;
  error: Error | null;
  refetch: () => void;
  setPreguntas: (preguntas: Pregunta[]) => void;
}

const PreguntaContext = createContext<PreguntaContextType | undefined>(undefined);

interface PreguntaProviderProps {
  children: ReactNode;
}

export const PreguntaProvider: React.FC<PreguntaProviderProps> = ({ children }) => {
  const [preguntas, setPreguntas] = useState<Pregunta[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchPreguntas = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/preguntas');

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data: Pregunta[] = await response.json();
      data.map(pregunta => {
        pregunta.visible = true;
      });
      
      setPreguntas(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err);
      } else {
        setError(new Error('Unknown error'));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPreguntas();
  }, []);

  return (
    <PreguntaContext.Provider value={{ preguntas, loading, error, refetch: fetchPreguntas, setPreguntas }}>
      {children}
    </PreguntaContext.Provider>
  );
};

export const usePreguntas = (): PreguntaContextType => {
  const context = useContext(PreguntaContext);
  if (!context) {
    throw new Error('usePreguntas must be used within a PreguntaProvider');
  }
  return context;
};
