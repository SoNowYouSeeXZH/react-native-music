import {createContext} from 'react';
import {Audio} from 'expo-av';

interface SoundContextProps {
    sound?: Audio.Sound;
    setSound: (n?: Audio.Sound) => void;
}

export const SoundContext: React.Context<SoundContextProps> = createContext({
    sound: undefined,
    setSound: (n: Audio.Sound) => {},
} as SoundContextProps);
