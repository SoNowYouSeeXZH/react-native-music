import {NavigationContainer} from '@react-navigation/native';
import {PaperProvider, MD3LightTheme as DefaultTheme} from 'react-native-paper';

import RootPage from '@/page';

const theme = {
    ...DefaultTheme,
    // Specify custom property in nested object
    colors: {
        ...DefaultTheme.colors,
    },
    dark: true,
};

export default function App() {
    return (
        <NavigationContainer>
            <PaperProvider theme={theme}>
                <RootPage />
            </PaperProvider>
        </NavigationContainer>
    );
}
