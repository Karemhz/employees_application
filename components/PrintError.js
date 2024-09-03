import {Alert} from 'react-native';

const PrintError = error =>
  Alert.alert(
    'Error',
    'Sorry we have some error with API, Please try again later... \n\n' + error,
    [{text: 'OK', onPress: () => {}}],
  );

export default PrintError;
