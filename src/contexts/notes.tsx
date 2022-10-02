import React, { useState, createContext } from 'react';

type NotesType = {
  id: number;
  text: string;
  urgent: boolean;
  date: string;
};

export const NotesContext = createContext({
  notes: [
    {
        id: 1,
        text: 'Emilly linda',
        urgent: false,
        date: '1995-12-17'
    },
    {
        id: 2,
        text: 'Emilly Front',
        urgent: true,
        date: '1995-12-17'
    }
  ],
  setNotes: (notes: Array<NotesType>) => {},
});

export const NotesProvider = ({ children }: any) => {
  const [notes, setNotes] = useState<Array<NotesType> | []>([
    {
        id: 3,
        text: 'Emilly linda',
        urgent: false,
        date: '1996-12-17'
    },
    {
        id: 2,
        text: 'Emilly Front',
        urgent: true,
        date: '1995-12-17'
    }
  ]);

  return <NotesContext.Provider value={{ notes, setNotes }}>{children}</NotesContext.Provider>;
};

export default NotesContext;
