import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

import { STAGE_HEIGHT, STAGE_WIDTH } from '@/constants/supick';

export function Stage({ children }: { children: ReactNode }) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const fit = () => {
      const { width, height } = Dimensions.get('window');
      setScale(Math.min(width / STAGE_WIDTH, height / STAGE_HEIGHT));
    };
    fit();
    const sub = Dimensions.addEventListener('change', fit);
    return () => sub.remove();
  }, []);

  return (
    <View style={styles.host}>
      <View style={[styles.stage, { transform: [{ scale }] }]}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  host: {
    flex: 1,
    backgroundColor: '#E9EEF2',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  stage: {
    width: STAGE_WIDTH,
    height: STAGE_HEIGHT,
    backgroundColor: '#FFFFFF',
    position: 'relative',
    overflow: 'hidden',
  },
});
