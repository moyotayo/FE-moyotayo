import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { BgCircles } from '@/components/supick/BgCircles';
import { MASCOT_SOURCES } from '@/components/supick/Mascot';
import { Sparkle } from '@/components/supick/Sparkle';
import { Stage } from '@/components/supick/Stage';
import { Fonts, Palette, Shadows } from '@/constants/supick';

export default function Login() {
  const router = useRouter();
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');

  // 시연용 mock — 입력 검증 없이 어떤 값이든(빈 값도) 통과
  const onLogin = useCallback(() => {
    router.replace('/' as never);
  }, [router]);

  const onSignup = useCallback(() => {
    router.push('/signup' as never);
  }, [router]);

  return (
    <Stage>
      <BgCircles />

      {/* SuPick wordmark + sparkle (centered) */}
      <View style={styles.wordmark} pointerEvents="none">
        <Text style={[styles.word, { color: Palette.blue600 }]}>Su</Text>
        <Text style={[styles.word, { color: '#0d2417' }]}>Pick</Text>
        <View style={styles.sparkleSlot}>
          <Sparkle color={Palette.green500} size={60} glowAlpha={0.6} />
        </View>
      </View>

      <Text style={styles.heading}>지금 바로 시작해보세요!</Text>

      {/* 학번 */}
      <Text style={[styles.label, { top: 403 }]}>학번</Text>
      <TextInput
        value={studentId}
        onChangeText={setStudentId}
        style={[styles.input, { top: 442 }]}
        accessibilityLabel="학번 입력"
      />

      {/* 비밀번호 */}
      <Text style={[styles.label, { top: 497 }]}>비밀번호</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={[styles.input, { top: 537 }]}
        accessibilityLabel="비밀번호 입력"
      />

      {/* 로그인 — returning user 시연 경로: 곧장 홈 */}
      <Pressable
        onPress={onLogin}
        style={({ pressed }) => [
          styles.pillBtn,
          { left: 450, top: 638 },
          { transform: [{ scale: pressed ? 0.96 : 1 }] },
        ]}
        accessibilityRole="button"
        accessibilityLabel="로그인 (시연용 — 곧장 홈으로)"
      >
        <Text style={styles.pillText}>로그인</Text>
      </Pressable>

      {/* 회원가입 — 다음 화면으로 */}
      <Pressable
        onPress={onSignup}
        style={({ pressed }) => [
          styles.pillBtn,
          { left: 736, top: 638 },
          { transform: [{ scale: pressed ? 0.96 : 1 }] },
        ]}
        accessibilityRole="button"
        accessibilityLabel="회원가입 화면으로"
      >
        <Text style={styles.pillText}>회원가입</Text>
      </Pressable>

      {/* Mascot (standing — Figma 의 waving 포즈 자산이 없어 근사) */}
      <Image
        source={MASCOT_SOURCES.standing}
        style={styles.mascot}
        contentFit="contain"
        pointerEvents="none"
      />
    </Stage>
  );
}

const styles = StyleSheet.create({
  wordmark: {
    position: 'absolute',
    top: 150,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  word: {
    fontFamily: 'Pretendard-Black',
    fontSize: 128,
    lineHeight: 145,
    letterSpacing: -2,
    textShadowColor: 'rgba(0,0,0,0.25)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
  },
  sparkleSlot: {
    marginLeft: 10,
    marginTop: 30,
  },
  heading: {
    position: 'absolute',
    top: 346,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontFamily: 'Pretendard-Bold',
    fontSize: 32,
    color: Palette.black,
  },
  label: {
    position: 'absolute',
    left: 498,
    fontFamily: Fonts.display,
    fontSize: 28,
    color: Palette.black,
  },
  input: {
    position: 'absolute',
    left: 498,
    width: 444,
    height: 54,
    borderRadius: 8,
    backgroundColor: Palette.white,
    paddingHorizontal: 16,
    fontFamily: 'Pretendard-Regular',
    fontSize: 20,
    color: Palette.black,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
    ...(Platform.OS === 'web'
      ? ({ outlineColor: 'rgba(42,153,229,0.6)' } as object)
      : null),
  },
  pillBtn: {
    position: 'absolute',
    width: 254,
    height: 80,
    borderRadius: 40,
    backgroundColor: Palette.white,
    borderWidth: 2,
    borderColor: Palette.blue600,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.dropSoft(),
  },
  pillText: {
    fontFamily: Fonts.display,
    fontSize: 32,
    color: Palette.black,
  },
  mascot: {
    position: 'absolute',
    right: -80,
    bottom: -40,
    width: 560,
    height: 700,
  },
});
