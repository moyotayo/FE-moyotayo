import { usePathname, useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Button } from './Button';
import { Sparkle } from './Sparkle';
import { Palette } from '@/constants/supick';

const ITEMS: { id: string; label: string; href: string }[] = [
  { id: 'home', label: '홈', href: '/' },
  { id: 'recommend', label: '시간표 추천', href: '/recommend' },
  { id: 'reviews', label: '강의 평가', href: '/reviews' },
];

export function TopNav() {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/' || pathname === '';
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <View style={styles.bar}>
      <Pressable
        style={styles.logo}
        onPress={() => router.replace('/' as never)}
        accessibilityRole="link"
        accessibilityLabel="SuPick 홈으로 이동"
      >
        <Text style={[styles.wordmark, { color: Palette.blue600 }]}>Su</Text>
        <Text style={[styles.wordmark, { color: Palette.black, marginLeft: 1 }]}>
          Pick
        </Text>
        <View style={{ marginLeft: 6 }}>
          <Sparkle color={Palette.green500} size={26} />
        </View>
      </Pressable>

      <View style={{ flex: 1 }} />

      <View style={styles.items}>
        {ITEMS.map((item) => (
          <Button
            key={item.id}
            variant={isActive(item.href) ? 'ghost-active' : 'ghost'}
            onPress={() => router.replace(item.href as never)}
            accessibilityLabel={`${item.label} ${isActive(item.href) ? '(현재 화면)' : '으로 이동'}`}
          >
            {item.label}
          </Button>
        ))}
      </View>

      <View style={{ flex: 1 }} />

      <Button
        variant={pathname === '/mypage' ? 'ghost-active' : 'ghost'}
        onPress={() => router.replace('/mypage' as never)}
        accessibilityLabel={`마이페이지 ${pathname === '/mypage' ? '(현재 화면)' : '으로 이동'}`}
      >
        마이페이지
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    position: 'absolute',
    top: 28,
    left: 60,
    right: 60,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 20,
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  wordmark: {
    fontFamily: 'Pretendard-Black',
    fontSize: 48,
    lineHeight: 50,
    letterSpacing: -1.2,
  },
  items: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 40,
  },
});
