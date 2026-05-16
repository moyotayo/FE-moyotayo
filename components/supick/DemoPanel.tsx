import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';

import { useSupickStore } from '@/src/store/useSupickStore';

// 시연 영상 녹화 보조 패널 — 웹 전용.
// 기본은 작은 🎬 아이콘으로 노출; 클릭하면 컨트롤이 펼쳐짐.
// × 버튼으로 세션 동안 숨김 (새로고침하면 다시 보임).
// URL에 `?nodemo=1` 붙이면 영구 숨김 (영상 녹화용 깨끗한 URL).
export function DemoPanel() {
  const [hidden, setHidden] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();

  const picklistCount = useSupickStore((s) => s.picklist.length);
  const fillPickList = useSupickStore((s) => s.fillPickListWithSample);
  const clearPickList = useSupickStore((s) => s.clearPickList);
  const resetAll = useSupickStore((s) => s.resetAll);
  const hasStarted = useSupickStore((s) => s.hasStarted);

  if (Platform.OS !== 'web') return null;
  if (
    typeof window !== 'undefined' &&
    window.location.search.includes('nodemo')
  ) {
    return null;
  }
  if (hidden) return null;

  if (!expanded) {
    return (
      <Pressable
        onPress={() => setExpanded(true)}
        accessibilityRole="button"
        accessibilityLabel="시연 컨트롤 패널 열기"
        style={styles.fab}
      >
        <Text style={styles.fabIcon}>🎬</Text>
      </Pressable>
    );
  }

  return (
    <View style={styles.panel} accessibilityLabel="시연 컨트롤 패널">
      <View style={styles.header}>
        <Text style={styles.headerText}>🎬 Demo Controls</Text>
        <Pressable
          onPress={() => setExpanded(false)}
          style={styles.iconBtn}
          accessibilityRole="button"
          accessibilityLabel="패널 접기"
        >
          <Text style={styles.iconBtnText}>—</Text>
        </Pressable>
        <Pressable
          onPress={() => setHidden(true)}
          style={styles.iconBtn}
          accessibilityRole="button"
          accessibilityLabel="패널 숨기기"
        >
          <Text style={styles.iconBtnText}>×</Text>
        </Pressable>
      </View>

      <Text style={styles.section}>PickList ({picklistCount} 담김)</Text>
      <View style={styles.btnRow}>
        <Pressable
          style={styles.btn}
          onPress={fillPickList}
          accessibilityRole="button"
          accessibilityLabel="PickList에 샘플 3개 채우기"
        >
          <Text style={styles.btnText}>+3 채우기</Text>
        </Pressable>
        <Pressable
          style={styles.btn}
          onPress={clearPickList}
          accessibilityRole="button"
          accessibilityLabel="PickList 비우기"
        >
          <Text style={styles.btnText}>비우기</Text>
        </Pressable>
      </View>

      <Text style={styles.section}>온보딩 화면</Text>
      <View style={styles.btnRow}>
        <Pressable
          style={styles.btn}
          onPress={() => router.replace('/welcome' as never)}
          accessibilityRole="button"
          accessibilityLabel="Welcome 화면으로 이동"
        >
          <Text style={styles.btnText}>Welcome</Text>
        </Pressable>
        <Pressable
          style={styles.btn}
          onPress={() => router.replace('/intro' as never)}
          accessibilityRole="button"
          accessibilityLabel="기능 인트로 화면으로 이동"
        >
          <Text style={styles.btnText}>Intro</Text>
        </Pressable>
      </View>
      <View style={styles.btnRow}>
        <Pressable
          style={styles.btn}
          onPress={() => router.replace('/login' as never)}
          accessibilityRole="button"
          accessibilityLabel="로그인 화면으로 이동"
        >
          <Text style={styles.btnText}>Login</Text>
        </Pressable>
        <Pressable
          style={styles.btn}
          onPress={() => router.replace('/signup' as never)}
          accessibilityRole="button"
          accessibilityLabel="회원가입 화면으로 이동"
        >
          <Text style={styles.btnText}>Signup</Text>
        </Pressable>
      </View>

      <Text style={styles.section}>메인 탭 이동</Text>
      <View style={styles.btnRow}>
        <Pressable
          style={styles.btn}
          onPress={() => router.replace('/' as never)}
          accessibilityRole="button"
          accessibilityLabel="홈으로 이동"
        >
          <Text style={styles.btnText}>홈</Text>
        </Pressable>
        <Pressable
          style={styles.btn}
          onPress={() => router.replace('/recommend' as never)}
          accessibilityRole="button"
          accessibilityLabel="시간표 추천으로 이동"
        >
          <Text style={styles.btnText}>추천</Text>
        </Pressable>
      </View>
      <View style={styles.btnRow}>
        <Pressable
          style={styles.btn}
          onPress={() => router.replace('/reviews' as never)}
          accessibilityRole="button"
          accessibilityLabel="강의 평가로 이동"
        >
          <Text style={styles.btnText}>평가</Text>
        </Pressable>
        <Pressable
          style={styles.btn}
          onPress={() => router.replace('/mypage' as never)}
          accessibilityRole="button"
          accessibilityLabel="마이페이지로 이동"
        >
          <Text style={styles.btnText}>My</Text>
        </Pressable>
      </View>

      <Text style={styles.section}>전체</Text>
      <Pressable
        style={styles.btnPrimary}
        onPress={() => {
          resetAll();
          router.replace('/welcome' as never);
        }}
        accessibilityRole="button"
        accessibilityLabel="모두 초기화하고 Welcome으로 이동"
      >
        <Text style={styles.btnText}>🔄 모두 초기화 → Welcome</Text>
      </Pressable>

      <Text style={styles.hint}>
        💡 녹화 전 × 로 패널 숨기기{'\n'}
        🔗 URL에 ?nodemo=1 = 영구 숨김{'\n'}
        Started: {hasStarted ? '✓' : '×'}
      </Text>
    </View>
  );
}

// 웹에서는 `position: 'fixed'`로 viewport 기준 고정 (Stage 스케일과 무관).
// 네이티브에서는 그냥 `absolute` (다만 컴포넌트 자체가 웹 전용이라 도달 안 함).
const FIXED_POSITION =
  Platform.OS === 'web'
    ? ({ position: 'fixed' as const } as object)
    : ({ position: 'absolute' as const } as object);

const styles = StyleSheet.create({
  fab: {
    ...FIXED_POSITION,
    top: 16,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
  fabIcon: {
    fontSize: 20,
  },
  panel: {
    ...FIXED_POSITION,
    top: 16,
    right: 16,
    width: 280,
    backgroundColor: 'rgba(20,20,20,0.92)',
    borderRadius: 12,
    padding: 14,
    gap: 8,
    zIndex: 9999,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  headerText: {
    flex: 1,
    color: '#FFF',
    fontWeight: '600',
    fontSize: 13,
  },
  iconBtn: {
    width: 24,
    height: 24,
    borderRadius: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBtnText: {
    color: '#FFF',
    fontSize: 14,
  },
  section: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: 11,
    marginTop: 6,
  },
  btnRow: {
    flexDirection: 'row',
    gap: 6,
  },
  btn: {
    flex: 1,
    height: 32,
    backgroundColor: 'rgba(255,255,255,0.13)',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnPrimary: {
    height: 36,
    backgroundColor: '#1A5BA8',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  btnText: {
    color: '#FFF',
    fontSize: 12,
  },
  hint: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 10,
    marginTop: 4,
    lineHeight: 14,
  },
});
