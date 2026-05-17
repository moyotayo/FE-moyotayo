import { StyleSheet, View } from 'react-native';

type Props = {
  topLeft?: boolean;
  bottomRight?: boolean;
  dim?: boolean;
};

export function BgCircles({ topLeft = true, bottomRight = true, dim = false }: Props) {
  return (
    <>
      {topLeft && <View style={styles.topLeft} />}
      {bottomRight && <View style={styles.bottomRight} />}
      {dim && <View style={styles.dim} />}
    </>
  );
}

const styles = StyleSheet.create({
  topLeft: {
    position: 'absolute',
    left: -140,
    top: -180,
    width: 740,
    height: 720,
    borderRadius: 360,
    backgroundColor: 'rgba(197,223,240,0.55)',
    pointerEvents: 'none',
  },
  bottomRight: {
    position: 'absolute',
    right: -180,
    bottom: -220,
    width: 720,
    height: 720,
    borderRadius: 360,
    backgroundColor: 'rgba(168,213,190,0.55)',
    pointerEvents: 'none',
  },
  dim: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    pointerEvents: 'none',
  },
});
