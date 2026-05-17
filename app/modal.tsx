import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { Fonts, Palette } from '@/constants/supick';

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>모달 화면</Text>
      <Link href={'/' as never} dismissTo style={styles.link}>
        <Text style={styles.linkText}>홈으로 돌아가기</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: Palette.white,
  },
  title: {
    fontFamily: Fonts.display,
    fontSize: 32,
    color: Palette.black,
  },
  link: {
    marginTop: 16,
    paddingVertical: 15,
  },
  linkText: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 16,
    color: Palette.blue600,
  },
});
