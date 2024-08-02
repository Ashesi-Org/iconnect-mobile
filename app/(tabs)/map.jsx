import { View, Text, Button, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ActionSheet from '../../components/action-sheet';
import { useRef } from 'react';

const FindPlaces = () => {
  const bottomSheetModalRef = useRef(null);
  const handlePressModal = () => {
    bottomSheetModalRef.current?.present();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View>
        <Text>Map</Text>
      </View>
    </SafeAreaView>
  );
};

export default FindPlaces;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
});
