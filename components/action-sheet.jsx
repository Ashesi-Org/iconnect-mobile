import React, { forwardRef, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { BottomSheetModal, BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';

const ActionSheet = forwardRef(({ children, snapPoints = ['25%', '40%', '70%'] }, ref) => {
  // Callback to render the backdrop
  const renderBackdrop = useCallback(
    (props) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />,
    []
  );

  return (
    <View style={styles.container}>
      <BottomSheetModal ref={ref} backdropComponent={renderBackdrop} index={1} snapPoints={snapPoints}>
        <BottomSheetView>
          <View>{children}</View>
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
});

export default ActionSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});
