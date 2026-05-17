import type { CategoryKey } from '@/constants/supick';

export type Course = {
  id: string;
  title: string;
  professor: string;
  location: string;
  day: '월' | '화' | '수' | '목' | '금';
  start: string;
  end: string;
  category: CategoryKey;
  credits: number;
  area: string;
  // 강의 세부 정보 모달용 (optional — 없으면 모달에서 기본값 사용)
  section?: string;        // 분반 e.g. "001"
  department?: string;     // 학과 e.g. "지능형SW융합대학·정보보호"
  grading?: 'ABCDF' | 'P/F';
  progressPercent?: number; // 0-100, "평가하기" 버튼 활성화 기준 (>= 50 이면 가능)
};

export type Review = {
  id: string;
  title: string;
  professor: string;
  stars: number;
  total: number;
  ratings: number;
  tags: string[];
  likes: number;
  category: CategoryKey;
};

export type User = {
  name: string;
  dept: string;
  cohort: string;
  status: string;
  badge: string;
  credits: number;
  freePeriods: number;
};

export type SemesterKey = '26년 1학기' | '25년 2학기' | '25년 1학기';

export const SEMESTERS: SemesterKey[] = ['26년 1학기', '25년 2학기', '25년 1학기'];

// 현재 수강 중인 강의 (26년 1학기) — Home/MyPage 메인 시간표
export const sampleCourses: Course[] = [
  { id: 'mw',  title: '악성코드분석',           professor: '김대엽', location: '수원역4번출구',  day: '월', start: '9:30',  end: '12:20', category: 'jeonseon', credits: 3, area: '전선' },
  { id: 'ca',  title: '중앙아시아의이해(이러닝)',  professor: '박승찬', location: '온라인',         day: '월', start: '9:30',  end: '11:20', category: 'gyoyang',  credits: 2, area: '교양' },
  { id: 'net', title: '컴퓨터네트워크',           professor: '김아람', location: 'IT대학 306호',  day: '화', start: '12:30', end: '14:20', category: 'jeonhaek', credits: 3, area: '전핵' },
  { id: 'sem', title: '전공진로세미나1',          professor: '주호연', location: 'IT대학 502호',  day: '수', start: '12:30', end: '13:20', category: 'jeonchwi', credits: 1, area: '전취' },
  { id: 'esl', title: 'AI활용ESL1',             professor: '자스민',  location: '인문101호',     day: '목', start: '12:30', end: '14:20', category: 'gigyo',    credits: 2, area: '기교' },
  { id: 'thn', title: '학문과 사고',              professor: '최재령', location: '인문205호',     day: '월', start: '13:30', end: '15:20', category: 'junghaek', credits: 2, area: '중핵' },
  { id: 'lif', title: '인성과 삶의 가치',          professor: '이소민', location: '온라인',         day: '금', start: '15:30', end: '17:20', category: 'sogyo',    credits: 2, area: '소교' },
  { id: 'web', title: '웹프로그래밍',             professor: '전상훈', location: 'IT대학 306호',  day: '금', start: '11:30', end: '15:20', category: 'jeonhaek', credits: 3, area: '전핵' },
];

// 25년 2학기 시간표
export const courses25_2: Course[] = [
  { id: 'sys', title: '시스템프로그래밍', professor: '박상호',  location: 'IT대학 401호', day: '화', start: '9:30',  end: '11:20', category: 'jeonhaek', credits: 3, area: '전핵' },
  { id: 'arch',title: '컴퓨터구조',       professor: '이지원',  location: 'IT대학 306호', day: '수', start: '12:30', end: '14:20', category: 'jeonhaek', credits: 3, area: '전핵' },
  { id: 'osy', title: '운영체제',         professor: '이종환',  location: 'IT대학 502호', day: '목', start: '14:30', end: '16:20', category: 'jeonhaek', credits: 3, area: '전핵' },
  { id: 'dig', title: '디지털논리회로',    professor: '김지훈',  location: 'IT대학 510호', day: '월', start: '14:30', end: '16:20', category: 'jeonchwi', credits: 2, area: '전취' },
  { id: 'cal2',title: '미적분학2',        professor: '박서연',  location: '자연관 201호', day: '화', start: '12:30', end: '14:20', category: 'gigyo',    credits: 3, area: '기교' },
  { id: 'his', title: '한국사',           professor: '최예린',  location: '인문102호',    day: '목', start: '16:30', end: '18:20', category: 'gyoyang',  credits: 2, area: '교양' },
  { id: 'lead',title: '글로벌리더십',     professor: '김현우',  location: '온라인',       day: '금', start: '13:30', end: '15:20', category: 'sogyo',    credits: 2, area: '소교' },
  { id: 'wri2',title: '영어작문',         professor: 'Sarah Lee', location: '인문205호',  day: '수', start: '16:30', end: '18:20', category: 'gigyo',    credits: 2, area: '기교' },
];

// 25년 1학기 시간표
export const courses25_1: Course[] = [
  { id: 'pro1',title: '프로그래밍기초',     professor: '정수민', location: 'IT대학 102호', day: '화', start: '9:30',  end: '12:20', category: 'jeonhaek', credits: 3, area: '전핵' },
  { id: 'dm',  title: '이산수학',          professor: '한도진', location: 'IT대학 401호', day: '목', start: '12:30', end: '14:20', category: 'jeonhaek', credits: 3, area: '전핵' },
  { id: 'cal1',title: '미적분학1',         professor: '박서연', location: '자연관 201호', day: '월', start: '9:30',  end: '11:20', category: 'gigyo',    credits: 3, area: '기교' },
  { id: 'phy', title: '일반물리학',        professor: '이지환', location: '자연관 301호', day: '수', start: '14:30', end: '16:20', category: 'gigyo',    credits: 3, area: '기교' },
  { id: 'eng', title: '대학영어',          professor: 'John Smith', location: '인문102호', day: '화', start: '14:30', end: '16:20', category: 'gigyo',  credits: 2, area: '기교' },
  { id: 'life',title: '인생설계',          professor: '김도윤', location: '온라인',       day: '금', start: '11:30', end: '13:20', category: 'sogyo',    credits: 2, area: '소교' },
  { id: 'phi', title: '동양철학의이해',     professor: '박서영', location: '인문308호',    day: '월', start: '13:30', end: '15:20', category: 'junghaek', credits: 2, area: '중핵' },
  { id: 'mus0',title: '음악감상',          professor: '김하영', location: '음악관 301호', day: '목', start: '16:30', end: '17:20', category: 'gyoyang',  credits: 1, area: '교양' },
];

// 시간표 추천 화면 카탈로그 (현재 수강중 + 추가 16개 = 24개)
// — 모든 7개 카테고리를 골고루 보여줌
const additionalCatalog: Course[] = [
  { id: 'db',    title: '데이터베이스',        professor: '박지원', location: 'IT대학 401호', day: '수', start: '9:30',  end: '12:20', category: 'jeonhaek', credits: 3, area: '전핵' },
  { id: 'ml',    title: '머신러닝개론',        professor: '정승호', location: 'IT대학 510호', day: '화', start: '16:30', end: '18:20', category: 'jeonseon', credits: 3, area: '전선' },
  { id: 'algo',  title: '알고리즘설계',        professor: '조민재', location: 'IT대학 401호', day: '목', start: '9:30',  end: '11:20', category: 'jeonhaek', credits: 3, area: '전핵' },
  { id: 'sec',   title: '정보보안수학',        professor: '이채영', location: 'IT대학 502호', day: '월', start: '10:30', end: '12:20', category: 'jeonseon', credits: 3, area: '전선' },
  { id: 'ds',    title: '자료구조',            professor: '강현우', location: 'IT대학 306호', day: '화', start: '9:30',  end: '11:20', category: 'jeonhaek', credits: 3, area: '전핵' },
  { id: 'se',    title: '소프트웨어공학',      professor: '윤서연', location: 'IT대학 401호', day: '수', start: '14:30', end: '16:20', category: 'jeonseon', credits: 3, area: '전선' },
  { id: 'crypto',title: '암호학기초',          professor: '박지수', location: 'IT대학 502호', day: '금', start: '9:30',  end: '11:20', category: 'jeonseon', credits: 3, area: '전선' },
  { id: 'os',    title: '운영체제',            professor: '이종환', location: 'IT대학 306호', day: '목', start: '14:30', end: '16:20', category: 'jeonhaek', credits: 3, area: '전핵' },
  { id: 'art',   title: '현대미술의이해',      professor: '정도윤', location: '예술관 102호', day: '목', start: '11:30', end: '13:20', category: 'gyoyang',  credits: 2, area: '교양' },
  { id: 'mus',   title: '음악과 인생',         professor: '김하영', location: '음악관 301호', day: '화', start: '9:30',  end: '11:20', category: 'gyoyang',  credits: 2, area: '교양' },
  { id: 'ecn',   title: '경제학의이해',        professor: '한도진', location: '사회관 205호', day: '금', start: '13:30', end: '15:20', category: 'gyoyang',  credits: 2, area: '교양' },
  { id: 'spk',   title: '영어회화',            professor: 'David Kim', location: '인문102호', day: '화', start: '11:30', end: '13:20', category: 'gigyo',    credits: 2, area: '기교' },
  { id: 'wri',   title: '글쓰기와 표현',        professor: '최선예', location: '인문203호',    day: '목', start: '9:30',  end: '11:20', category: 'gigyo',    credits: 2, area: '기교' },
  { id: 'eth',   title: '윤리학의기초',         professor: '김도윤', location: '인문308호',    day: '월', start: '9:30',  end: '11:20', category: 'junghaek', credits: 2, area: '중핵' },
  { id: 'ldr',   title: '셀프 리더십',          professor: '이은수', location: '인문102호',    day: '월', start: '16:30', end: '17:20', category: 'sogyo',    credits: 1, area: '소교' },
  { id: 'vol',   title: '봉사와 나눔',          professor: '한지유', location: '인문101호',    day: '금', start: '11:30', end: '12:20', category: 'sogyo',    credits: 1, area: '소교' },
];

export const availableCourses: Course[] = [...sampleCourses, ...additionalCatalog];

export const semesterTimetables: Record<SemesterKey, Course[]> = {
  '26년 1학기': sampleCourses,
  '25년 2학기': courses25_2,
  '25년 1학기': courses25_1,
};

export const sampleReviews: Review[] = [
  {
    id: 'r1',
    title: '인성과 삶의 가치',
    professor: '이소민',
    stars: 4, total: 5, ratings: 10,
    tags: ['#과제_적음', '#문제풀이_과제', '#전자출결', '#온라인시험', '#조모임_없음', '#P/F'],
    likes: 1,
    category: 'sogyo',
  },
  {
    id: 'r2',
    title: '식문화의 형성과 세계화',
    professor: '오사다 사치코',
    stars: 5, total: 5, ratings: 13,
    tags: ['#과제_보통', '#보고서_및_조사_과제', '#자필서명', '#지필고사', '#조모임_없음', '#ABCDF'],
    likes: 2,
    category: 'gyoyang',
  },
  {
    id: 'r3',
    title: '컴퓨터네트워크',
    professor: '김아람',
    stars: 3, total: 5, ratings: 27,
    tags: ['#과제_많음', '#실습_과제', '#출석_체크엄격', '#지필고사', '#조모임_있음', '#ABCDF'],
    likes: 14,
    category: 'jeonhaek',
  },
  {
    id: 'r4',
    title: '알고리즘설계',
    professor: '조민재',
    stars: 4, total: 5, ratings: 32,
    tags: ['#과제_많음', '#문제풀이_과제', '#실습시험', '#출튀_가능', '#조모임_없음', '#ABCDF'],
    likes: 21,
    category: 'jeonhaek',
  },
  {
    id: 'r5',
    title: '학문과 사고',
    professor: '최재령',
    stars: 5, total: 5, ratings: 18,
    tags: ['#과제_적음', '#발표_과제', '#전자출결', '#리포트', '#조모임_있음', '#ABCDF'],
    likes: 11,
    category: 'junghaek',
  },
  {
    id: 'r6',
    title: '영어회화',
    professor: 'David Kim',
    stars: 4, total: 5, ratings: 22,
    tags: ['#과제_보통', '#발표_과제', '#자필서명', '#실기시험', '#조모임_있음', '#ABCDF'],
    likes: 9,
    category: 'gigyo',
  },
  {
    id: 'r7',
    title: '봉사와 나눔',
    professor: '한지유',
    stars: 5, total: 5, ratings: 8,
    tags: ['#과제_없음', '#봉사활동', '#출석무관', '#P/F', '#조모임_없음', '#꿀강'],
    likes: 7,
    category: 'sogyo',
  },
  {
    id: 'r8',
    title: '현대미술의이해',
    professor: '정도윤',
    stars: 4, total: 5, ratings: 15,
    tags: ['#과제_보통', '#작품감상_리포트', '#자필서명', '#온라인시험', '#조모임_없음', '#ABCDF'],
    likes: 5,
    category: 'gyoyang',
  },
];

export const sampleUser: User = {
  name: '이하은',
  dept: '정보보호학과',
  cohort: '17학번',
  status: '재학생',
  badge: '적폐',
  credits: 21,
  freePeriods: 4,
};

// 시연용: PickList에 미리 담아둘 만한 강의 ID (서로 다른 3개 카테고리)
export const DEMO_PICKLIST_IDS = ['ml', 'art', 'eth'];
