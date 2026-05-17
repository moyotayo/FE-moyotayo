import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { BgCircles } from '@/components/supick/BgCircles';
import { MASCOT_SOURCES } from '@/components/supick/Mascot';
import { Sparkle } from '@/components/supick/Sparkle';
import { Stage } from '@/components/supick/Stage';
import { Fonts, Palette, Shadows } from '@/constants/supick';
import { useSupickStore } from '@/src/store/useSupickStore';

const LOADING_MS = 1500;

export default function Signup() {
  const router = useRouter();
  const markStarted = useSupickStore((s) => s.markStarted);

  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [agree1, setAgree1] = useState(false);
  const [agree2, setAgree2] = useState(false);
  const [loading, setLoading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // 시연용 mock — 검증 없이 항상 통과. 1.5초 로딩 후 홈으로.
  const onSubmit = useCallback(() => {
    setLoading(true);
    timerRef.current = setTimeout(() => {
      markStarted();
      router.replace('/' as never);
    }, LOADING_MS);
  }, [markStarted, router]);

  const onBack = useCallback(() => {
    if (router.canGoBack()) router.back();
    else router.replace('/login' as never);
  }, [router]);

  return (
    <Stage>
      <BgCircles />

      {/* ← Back */}
      <Pressable
        onPress={onBack}
        style={styles.backBtn}
        accessibilityRole="button"
        accessibilityLabel="뒤로 가기"
      >
        <Text style={styles.backText}>←</Text>
      </Pressable>

      {/* SuPick wordmark */}
      <View style={styles.wordmark} pointerEvents="none">
        <Text style={[styles.word, { color: Palette.blue600 }]}>Su</Text>
        <Text style={[styles.word, { color: '#0d2417' }]}>Pick</Text>
        <View style={styles.sparkleSlot}>
          <Sparkle color={Palette.green500} size={60} glowAlpha={0.6} />
        </View>
      </View>

      <Text style={styles.heading}>회원가입</Text>

      {/* 학번 */}
      <Text style={[styles.label, { top: 372 }]}>학번</Text>
      <TextInput
        value={studentId}
        onChangeText={setStudentId}
        style={[styles.input, { top: 412 }]}
        accessibilityLabel="학번 입력"
      />

      {/* 포털 비밀번호 */}
      <Text style={[styles.label, { top: 469 }]}>포털 비밀번호</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={[styles.input, { top: 510 }]}
        accessibilityLabel="포털 비밀번호 입력"
      />

      {/* 동의 1 */}
      <Pressable
        onPress={() => setAgree1((v) => !v)}
        style={[styles.checkbox, { top: 595 }]}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: agree1 }}
        accessibilityLabel="개인정보 처리방침 동의"
      >
        {agree1 ? <Text style={styles.checkMark}>✓</Text> : null}
      </Pressable>
      <Text style={[styles.agreeLabel, { top: 601 }]}>개인정보 처리방침 동의</Text>
      <Text style={[styles.viewLink, { top: 602 }]}>보기</Text>

      {/* 동의 2 */}
      <Pressable
        onPress={() => setAgree2((v) => !v)}
        style={[styles.checkbox, { top: 645 }]}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: agree2 }}
        accessibilityLabel="서비스 이용약관 동의"
      >
        {agree2 ? <Text style={styles.checkMark}>✓</Text> : null}
      </Pressable>
      <Text style={[styles.agreeLabel, { top: 649 }]}>서비스 이용약관 동의</Text>
      <Text style={[styles.viewLink, { top: 649 }]}>보기</Text>

      {/* 인증 및 로그인 */}
      <Pressable
        onPress={onSubmit}
        disabled={loading}
        style={({ pressed }) => [
          styles.submitBtn,
          {
            transform: [{ scale: pressed && !loading ? 0.96 : 1 }],
            opacity: loading ? 0.6 : 1,
          },
        ]}
        accessibilityRole="button"
        accessibilityLabel="인증 및 로그인 (시연용)"
      >
        <Text style={styles.submitText}>인증 및 로그인</Text>
      </Pressable>

      {/* Mascot */}
      <Image
        source={MASCOT_SOURCES.standing}
        style={styles.mascot}
        contentFit="contain"
        pointerEvents="none"
      />

      {/* 로딩 오버레이 — Figma 341:4 시각 상태 */}
      {loading ? (
        <View style={styles.overlay} accessibilityLiveRegion="polite">
          <View style={styles.overlayCard}>
            <ActivityIndicator size="large" color={Palette.blue600} />
            <Text style={styles.overlayText}>인증 중...</Text>
          </View>
        </View>
      ) : null}
    </Stage>
  );
}

const styles = StyleSheet.create({
  backBtn: {
    position: 'absolute',
    top: 10,
    left: 16,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backText: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 40,
    color: Palette.black,
    lineHeight: 44,
  },

  wordmark: {
    position: 'absolute',
    top: 117,
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
    top: 309,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontFamily: Fonts.display,
    fontSize: 40,
    color: Palette.black,
  },

  label: {
    position: 'absolute',
    left: 539,
    fontFamily: Fonts.display,
    fontSize: 28,
    color: Palette.black,
  },
  input: {
    position: 'absolute',
    left: 539,
    width: 384,
    height: 53,
    borderRadius: 8,
    backgroundColor: Palette.white,
    paddingHorizontal: 16,
    fontFamily: 'Pretendard-Regular',
    fontSize: 20,
    color: Palette.black,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.15)',
    ...(Platform.OS === 'web'
      ? ({ outlineColor: 'rgba(42,153,229,0.6)' } as object)
      : null),
  },

  checkbox: {
    position: 'absolute',
    left: 571,
    width: 33,
    height: 33,
    borderRadius: 8,
    backgroundColor: Palette.white,
    borderWidth: 1.5,
    borderColor: Palette.blue500,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkMark: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 22,
    color: Palette.blue600,
    lineHeight: 24,
  },
  agreeLabel: {
    position: 'absolute',
    left: 620,
    fontFamily: Fonts.display,
    fontSize: 20,
    color: Palette.black,
  },
  viewLink: {
    position: 'absolute',
    left: 896,
    fontFamily: Fonts.display,
    fontSize: 16,
    color: '#574acb',
    textDecorationLine: 'underline',
  },

  submitBtn: {
    position: 'absolute',
    left: 590,
    top: 716,
    width: 260,
    height: 60,
    borderRadius: 30,
    backgroundColor: Palette.white,
    borderWidth: 2,
    borderColor: Palette.blue600,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.dropSoft(),
  },
  submitText: {
    fontFamily: Fonts.display,
    fontSize: 28,
    color: Palette.black,
  },

  mascot: {
    position: 'absolute',
    right: -80,
    bottom: -40,
    width: 560,
    height: 700,
  },

  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
  overlayCard: {
    backgroundColor: Palette.white,
    borderRadius: 16,
    paddingVertical: 32,
    paddingHorizontal: 48,
    alignItems: 'center',
    gap: 20,
    minWidth: 240,
    ...Shadows.dropBig(),
  },
  overlayText: {
    fontFamily: Fonts.display,
    fontSize: 24,
    color: Palette.blue600,
  },
});
