import './gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import StackNavigation from "./navigation/Main";
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { I18nManager } from 'react-native';
import { Provider } from 'react-redux';
import store from './state/store';

//Disable RTL
try { 
  I18nManager.allowRTL(false)
} 
catch (e) {
  console.log(e)
}

function App(){
 
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <NavigationContainer>
            <StackNavigation />
          </NavigationContainer>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </Provider>
  );
}


export default App;
