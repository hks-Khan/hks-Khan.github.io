import { type KeyboardEvent, useEffect, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";

type ProjectLink = {
  label: string;
  href: string;
};

type PlanningSection = {
  label: string;
  title: string;
  image: string;
  images?: string[];
  intent: string;
  execution: string;
};

type Project = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  tags: string[];
  status: string;
  imageLabel: string;
  image: string;
  logo?: string;
  accent: string;
  links?: ProjectLink[];
  featured?: boolean;
  detailIntro?: string;
  planningSections?: PlanningSection[];
};

const PROJECTS: Project[] = [
  {
    id: "01",
    title: "Aquach",
    subtitle: "AI Swim Training App",
    description:
      "수준, 목표, 최근 기록을 바탕으로 개인화된 수영 프로그램을 생성하는 출시 앱입니다.",
    highlights: ["수영 운동 라이브러리 기반 프로그램 생성", "Apple Watch 운동 계획 연동", "App Store / Play Store 출시"],
    tags: ["TypeScript", "React Native", "Expo", "SwiftUI", "HealthKit", "Supabase"],
    status: "Launched",
    imageLabel: "Workout plan",
    image: "/images/hero-aquach-card.png",
    logo: "/images/logo-aquach.png",
    accent: "AI + Fitness",
    links: [
      { label: "App Store", href: "https://apps.apple.com/us/app/aquach-personal-swim-coach/id6745004612" },
      { label: "Google Play", href: "https://play.google.com/store/apps/details?hl=en&id=com.aquach.android" },
    ],
    featured: true,
    detailIntro:
      "Aquach는 개인 운동 환경에서 혼자 수영 훈련을 구성하기 어렵다는 문제에서 출발한 1인 개발 수영 트레이닝 앱입니다. 사용자 수준·목표·최근 기록을 바탕으로 훈련 계획을 만들고, 운동 실행과 기록 분석까지 하나의 흐름으로 연결했습니다.",
    planningSections: [
      {
        label: "01 / Home",
        title: "홈 대시보드",
        image: "/images/detail/aquach-dashboard.png",
        images: ["/images/detail/aquach-dashboard.png", "/images/detail/aquach-dashboard-collapsed.png"],
        intent: "홈 화면에서 오늘의 운동 계획을 바로 확인하고, 운동 계획을 펼치거나 접으면서 필요한 정보만 빠르게 보게 만들었습니다.",
        execution: "오늘의 운동 거리, 시간, 항목 수와 함께 운동 기록 버튼, 새 운동 계획 버튼, 총 운동시간·총 거리·연속 운동일 같은 핵심 통계를 한 화면에 배치했습니다.",
      },
      {
        label: "02 / Generator",
        title: "운동 생성 화면",
        image: "/images/detail/aquach-program.png",
        images: ["/images/detail/aquach-program.png", "/images/detail/aquach-ai-coach.png"],
        intent: "초기에는 실시간 LLM API로 운동을 생성했지만, 생성 시간과 품질 안정성 문제를 줄이기 위해 운동 생성 방식을 재설계했습니다.",
        execution: "미리 300여 개의 운동을 라이브러리화하고, 사용자 프로필·목표·선호 영법·최근 기록을 기준으로 운동을 선택하는 알고리즘으로 계획을 생성합니다. 최근 사용한 템플릿이나 반복되는 훈련 초점에는 페널티를 주어 매번 비슷한 계획만 나오지 않게 했고, 생성 이후에는 별도 AI 코치 세션에서 계획에 대해 질문할 수 있게 구성했습니다.",
      },
      {
        label: "03 / Records",
        title: "운동기록화면",
        image: "/images/detail/aquach-calendar.png",
        images: [
          "/images/detail/aquach-calendar.png",
          "/images/detail/aquach-record-summary.png",
          "/images/detail/aquach-healthkit.png",
          "/images/detail/aquach-stroke-analysis.png",
        ],
        intent: "내가 수행한 운동을 캘린더에서 날짜별로 확인하고, 운동한 날의 거리와 기록 상태를 빠르게 파악하게 만들었습니다.",
        execution: "캘린더에서 운동한 날짜를 누르면 해당 운동 기록을 열 수 있고, 기록 상세에서는 거리·시간·페이스 같은 결과와 HealthKit 데이터, 스트로크 분석을 확인할 수 있게 구성했습니다. 심박수와 칼로리 같은 민감 데이터는 서버에 직접 저장하지 않고, 운동 UUID를 기준으로 기기 안의 HealthKit에서 조회하도록 분리했습니다.",
      },
      {
        label: "04 / Watch",
        title: "Apple Watch 연동",
        image: "/images/detail/aquach-watch-plan.png",
        images: ["/images/detail/aquach-watch-plan.png", "/images/detail/aquach-watch-run.png"],
        intent: "폰에서 생성한 오늘의 운동계획이 Apple Watch에도 바로 표시되게 해, 수영장에서는 폰 없이 워치만 보고 운동을 시작할 수 있게 했습니다.",
        execution: "iPhone 앱과 Watch 앱 사이에 운동 계획 데이터를 동기화하고, 워치 홈 화면에서 거리·예상 시간·세트 수를 확인한 뒤 바로 운동을 시작할 수 있는 흐름으로 구성했습니다. 워치가 바로 연결되지 않은 상황에서는 전송 큐에 저장해 나중에 전달되도록 하고, 운동 완료 메시지도 pending queue로 보존해 기록 흐름이 끊기지 않게 했습니다.",
      },
    ],
  },
  {
    id: "02",
    title: "Nootify",
    subtitle: "Push-based Language Learning",
    description:
      "앱을 열지 않아도 푸시 알림 선택지로 스토리형 외국어 학습을 진행하는 출시 앱입니다.",
    highlights: ["알림 선택지 기반 학습 진행", "스토리 분기와 진행 기록 관리", "단어장과 난이도별 문장 구조"],
    tags: ["TypeScript", "React Native", "Expo", "Notifee", "Zustand", "MMKV"],
    status: "Launched",
    imageLabel: "Push stories",
    image: "/images/hero-nootify-card.png",
    logo: "/images/logo-nootify.png",
    accent: "Language, Story",
    links: [{ label: "App Store", href: "https://apps.apple.com/us/app/nootify-push-learn-stories/id6757182440" }],
    detailIntro:
      "앱을 매번 열어야 하는 부담을 줄이고, 푸시 알림 자체를 짧은 학습 화면처럼 쓰도록 기획한 언어 학습 앱입니다.",
    planningSections: [
      {
        label: "01 / Notification",
        title: "푸시 알림 학습 진입",
        image: "/images/detail/nootify-notification-entry.png",
        intent: "앱을 매번 열어야 하는 부담을 줄이고, 기본 학습 흐름은 푸시 알림 선택지만으로도 진행될 수 있게 설계했습니다.",
        execution: "알림 문장과 선택지를 하나의 학습 단위로 두고, 사용자가 알림에서 선택한 반응이 다음 스토리 진행으로 이어지도록 구성했습니다. 앱 안에서는 이어진 스토리와 기록을 확인하는 보조 흐름으로 정리했습니다.",
      },
      {
        label: "02 / Home",
        title: "오늘의 스토리",
        image: "/images/detail/nootify-home-dashboard.png",
        intent: "푸시 알림으로 진행되는 짧은 학습이 흩어지지 않도록, 오늘의 스토리와 누적 학습 상태를 한 화면에서 확인하게 했습니다.",
        execution: "홈 화면에는 오늘의 스토리, 연속 학습일, 저장한 단어 수, 진행 결과와 히스토리 진입점을 배치해 사용자가 현재 학습 흐름과 복습 지점을 빠르게 파악할 수 있게 구성했습니다.",
      },
      {
        label: "03 / Choice",
        title: "선택지 기반 스토리 진행",
        image: "/images/detail/nootify-story-choice.png",
        intent: "문제풀이 느낌보다 짧은 이야기 진행에 가깝게 만들어 반복 학습 부담을 줄이려 했습니다.",
        execution: "상황 문장을 읽고 선택지로 답하면 다음 장면과 반응이 이어지도록 구성했습니다. 선택지는 바텀시트로 분리해 문맥을 읽는 흐름과 답을 고르는 흐름이 끊기지 않게 했습니다.",
      },
      {
        label: "04 / History",
        title: "학습 기록 타임라인",
        image: "/images/detail/nootify-history-timeline.png",
        intent: "푸시 알림으로 짧게 진행한 학습도 지나간 선택과 이야기 흐름을 다시 볼 수 있어야 한다고 봤습니다.",
        execution: "스토리별 학습 기록을 Day와 Part 단위의 타임라인으로 정리하고, 각 장면에서 사용자가 고른 선택지를 함께 남겨 복습 맥락을 확인할 수 있게 구성했습니다.",
      },
      {
        label: "05 / Vocabulary",
        title: "유의어 기반 단어장",
        image: "/images/detail/nootify-vocabulary.png",
        intent: "모르는 단어를 바로 정답처럼 번역해 주기보다, 비슷한 의미의 단어를 먼저 보여줘 사용자가 문맥 안에서 뜻을 추론하게 만들었습니다.",
        execution: "스토리 중 선택한 단어는 단어장에 저장할 수 있고, 단어 상세에서는 직접적인 해석 대신 유의어와 사용 맥락을 보여줍니다. 더 확인이 필요할 때는 단어를 검색으로 이어갈 수 있게 해 복습이 단순 암기가 아니라 의미 추론과 확인 과정으로 이어지게 구성했습니다.",
      },
    ],
  },
  {
    id: "03",
    title: "Talkisland",
    subtitle: "AI Conversation Learning",
    description:
      "워킹홀리데이 상황 속 NPC와 대화하며 실전 영어 회화를 연습하는 팀 프로젝트입니다.",
    highlights: ["Microsoft AI School 최종 프로젝트 최우수상", "NPC 대화 스크립트와 캐릭터 설정", "맵 에셋과 회화 상황 구성"],
    tags: ["Unity", "OpenAI", "Figma"],
    status: "Award",
    imageLabel: "NPC dialogue",
    image: "",
    logo: "/images/logo-talkisland.png",
    accent: "AI Speaking",
  },
  {
    id: "04",
    title: "Soomcha",
    subtitle: "Gamified Mobile Product",
    description:
      "HealthKit 운동 데이터를 보상과 캐릭터 성장 구조로 연결하는 iOS 피트니스 앱입니다.",
    highlights: ["운동 데이터 기반 보상/재화 구조", "캐릭터 성장과 반복 사용 루프", "WidgetKit과 Dynamic Island"],
    tags: ["Swift", "SwiftUI", "SpriteKit", "HealthKit"],
    status: "In Progress",
    imageLabel: "Fitness loop",
    image: "/images/hero-soomcha-card.png",
    logo: "/images/logo-soomcha.png",
    accent: "Fitness + Gamification",
  },
  {
    id: "05",
    title: "Capstone",
    subtitle: "Context-aware Moderation LLM",
    description:
      "한국어 2인 대화에서 맥락을 고려해 부적절 발언을 탐지하는 졸업 과제입니다.",
    highlights: ["AI말평 대화 맥락 데이터 활용", "한국어 LLM 성능 비교", "프롬프트 개선과 파인튜닝 실험"],
    tags: ["Python"],
    status: "In Progress",
    imageLabel: "LLM eval",
    image: "",
    accent: "LLM Fine-tuning",
  },
];

const ABOUT_POINTS = [
  {
    title: "충남대학교",
    meta: "언어학과 / 언어정보처리",
  },
  {
    title: "수영강사",
    meta: "2019.07 ~ / 수영 강습 및 회원 관리",
  },
  {
    title: "Microsoft AI School 6기",
    meta: "2024.12 ~ 2025.06 / 최종 프로젝트 최우수상",
  },
];

const getSectionImages = (section: PlanningSection) =>
  section.images?.length ? section.images : [section.image];

const SLAB = { fontFamily: "'Roboto Slab', serif" };
const MONO = { fontFamily: "'JetBrains Mono', monospace" };
const BODY = { fontFamily: "'Inter', sans-serif" };

const TAG_BADGE_BASE = "rounded-full border px-2.5 py-1 text-[10px] font-bold transition-colors duration-300 group-hover:border-[#E60012]/20 group-hover:bg-[#FFF1F1] group-hover:text-[#B0000E]";
const TAG_BADGE_STYLES: Record<string, string> = {
  TypeScript: "border-[#2F74C0]/22 bg-[#EAF4FF] text-[#1D5D99]",
  "React Native": "border-[#0891B2]/22 bg-[#E7F8FC] text-[#08768F]",
  Expo: "border-[#111827]/14 bg-[#F4F4F5] text-[#3F3F46]",
  Swift: "border-[#F97316]/24 bg-[#FFF2E8] text-[#B94600]",
  SwiftUI: "border-[#F97316]/24 bg-[#FFF2E8] text-[#B94600]",
  SpriteKit: "border-[#F97316]/24 bg-[#FFF2E8] text-[#B94600]",
  HealthKit: "border-[#E60012]/22 bg-[#FFF1F1] text-[#B0000E]",
  Supabase: "border-[#16A34A]/22 bg-[#EAF8EF] text-[#17713A]",
  Notifee: "border-[#F97316]/24 bg-[#FFF2E8] text-[#B94600]",
  Zustand: "border-[#8B5CF6]/22 bg-[#F3EEFF] text-[#6D3CCB]",
  MMKV: "border-[#111827]/14 bg-[#F4F4F5] text-[#52525B]",
  Unity: "border-[#111827]/14 bg-[#F4F4F5] text-[#3F3F46]",
  OpenAI: "border-[#16A34A]/22 bg-[#EAF8EF] text-[#17713A]",
  Figma: "border-[#8B5CF6]/22 bg-[#F3EEFF] text-[#6D3CCB]",
  Python: "border-[#EAB308]/28 bg-[#FFF8D8] text-[#8B6500]",
  "MLX-LM": "border-[#8B5CF6]/22 bg-[#F3EEFF] text-[#6D3CCB]",
  LLM: "border-[#E60012]/22 bg-[#FFF1F1] text-[#B0000E]",
};
const tagBadgeClass = (tag: string) =>
  `${TAG_BADGE_BASE} ${TAG_BADGE_STYLES[tag] ?? "border-[#111827]/14 bg-[#F4F4F5] text-[#52525B]"}`;

const STATUS_BADGE_BASE = "rounded-full border px-4 py-2 text-[10px] uppercase tracking-[0.18em] text-white shadow-[0_12px_30px_rgba(15,23,42,0.12)] transition-colors duration-300";
const STATUS_BADGE_SMALL_BASE = "rounded-full border px-3 py-1.5 text-[9px] uppercase tracking-[0.16em] text-white shadow-[0_10px_24px_rgba(15,23,42,0.1)] transition-colors duration-300";
const STATUS_BADGE_STYLES: Record<string, string> = {
  Launched: "border-[#FF3B30]/75 bg-[#E60012]",
  Award: "border-[#FFD84D]/80 bg-[#D7A500] text-[#14100A]",
  "In Progress": "border-[#3B82F6]/70 bg-[#1E4FA3]",
};
const statusBadgeClass = (status: string, size: "large" | "small") =>
  `${size === "large" ? STATUS_BADGE_BASE : STATUS_BADGE_SMALL_BASE} ${
    STATUS_BADGE_STYLES[status] ?? "border-[#111827]/20 bg-[#52525B]"
  }`;

export default function App() {
  const [introDone, setIntroDone] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const introTimer = window.setTimeout(() => setIntroDone(true), 1050);
    return () => window.clearTimeout(introTimer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll(".reveal-on-scroll").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!selectedProject) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedProject(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProject]);

  const openProjectDetail = (project: Project) => {
    if (project.planningSections?.length) {
      setSelectedProject(project);
    }
  };

  const handleProjectKeyDown = (event: KeyboardEvent<HTMLElement>, project: Project) => {
    if (!project.planningSections?.length) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setSelectedProject(project);
    }
  };

  return (
    <div style={BODY} className="overflow-x-hidden bg-[#F5F5F7] text-[#1D1D1F]">
      {!introDone && (
        <div className="portfolio-loader">
          <div style={SLAB} className="portfolio-loader__mark">
            HKS
          </div>
          <div style={MONO} className="portfolio-loader__caption">
            Portfolio / Loading
          </div>
        </div>
      )}

      {/* ── HEADER ──────────────────────────────────────────── */}
      <header className="fixed top-0 inset-x-0 z-50 h-14 border-b border-[#D2D2D7] bg-white/86 backdrop-blur-xl">
        <div className="flex h-full items-center px-8 lg:px-16">
          <span style={MONO} className="text-[11px] tracking-[0.25em] text-[#1D1D1F] uppercase">
            HKS.DEV
          </span>
        </div>
      </header>

      {/* ── HERO ────────────────────────────────────────────── */}
      <section className="bg-[#F5F5F7]">

        {/* Hero */}
        <div className="relative w-full overflow-hidden px-6 pt-24 pb-12 md:px-8 lg:px-16 lg:pt-28 lg:pb-16">
          <div className="hero-grid" />

          <div className="relative z-10">
            <div className="flex items-start justify-between gap-3 md:gap-8 lg:gap-12">
              <div className="min-w-0 w-[calc(100%-94px)] md:w-auto">
                <h1
                  style={SLAB}
                  className="hero-title max-w-full text-[clamp(42px,10.4vw,92px)] font-black leading-[0.94] text-[#1D1D1F] tracking-[-0.02em] uppercase"
                >
                  <span>HWANG</span>
                  <span>KYEONG</span>
                  <span>SANG</span>
                </h1>
              </div>

              <aside className="z-10 hidden w-[220px] shrink-0 md:block lg:w-[320px]">
                <div className="hero-portrait w-full min-h-[190px] rounded-[28px] border border-[#D2D2D7] bg-white shadow-[0_24px_90px_rgba(15,23,42,0.14)] md:min-h-[280px] lg:min-h-[420px]">
                  <img
                    src="/images/profile-hwang-kyeongsang.jpg"
                    alt="Hwang Kyeongsang profile"
                    className="h-full min-h-[190px] w-full object-cover object-top md:min-h-[280px] lg:min-h-[420px]"
                  />
                </div>
              </aside>
            </div>

            <div className="mt-10 max-w-xl">
              <p className="hero-copy max-w-[340px] text-[18px] font-semibold leading-[1.5] text-[#1D1D1F] sm:max-w-xl sm:text-[20px] lg:text-[24px] break-keep">
                기획과 UI/UX까지 직접 다루는 앱 개발자입니다.
              </p>
              <p className="hero-copy mt-4 mb-7 max-w-[330px] text-[13px] leading-[1.75] text-[#6E6E73] sm:max-w-md sm:text-[14px] lg:text-[15px] break-keep">
                화면 설계부터 기능 구현, 배포까지 직접 경험하며 실제로 쓰이는 제품을 고민합니다.
              </p>
              <div style={MONO} className="hero-contact flex flex-col gap-2 border-l-2 border-[#E60012] pl-4 text-[12px] tracking-[0.08em] text-[#6E6E73]">
                <span className="font-sans text-[13px] font-semibold tracking-[0.02em] text-[#1D1D1F]">황경상</span>
                <a href="mailto:hks8680@gmail.com" className="w-fit hover:text-[#E60012] transition-colors duration-200">
                  hks8680@gmail.com
                </a>
                <span>010-3253-8680</span>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* ── PROJECTS ────────────────────────────────────────── */}
      <section id="work" className="reveal-on-scroll bg-[#F5F5F7] px-6 py-16 text-[#1D1D1F] lg:px-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-5 border-t border-[#D2D2D7] pt-8 md:flex-row md:items-end md:justify-between">
            <div>
              <div style={MONO} className="mb-3 text-[10px] uppercase tracking-[0.28em] text-[#E60012]">
                002 / Selected Work
              </div>
              <h2 className="text-[clamp(38px,6vw,76px)] font-black leading-[0.92] tracking-[-0.05em] text-[#1D1D1F]">
                Projects
              </h2>
            </div>
            <p className="max-w-sm break-keep text-[14px] leading-[1.75] text-[#6E6E73]">
              출시 앱과 진행 중인 AI·모바일 프로젝트를 제품 카드처럼 빠르게 훑어볼 수 있게 정리했습니다.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {PROJECTS.slice(0, 2).map((project) => {
              const hasDetail = Boolean(project.planningSections?.length);

              return (
              <article
                key={project.id}
                role={hasDetail ? "button" : undefined}
                tabIndex={hasDetail ? 0 : undefined}
                onClick={() => openProjectDetail(project)}
                onKeyDown={(event) => handleProjectKeyDown(event, project)}
                aria-label={hasDetail ? `${project.title} 상세 보기` : undefined}
                className={`project-app-card reveal-on-scroll group flex min-h-[470px] flex-col overflow-hidden rounded-[26px] border border-[#D2D2D7] bg-white p-7 shadow-[0_22px_70px_rgba(15,23,42,0.1)] transition-all duration-300 hover:-translate-y-1 hover:border-[#E60012]/40 hover:shadow-[0_30px_90px_rgba(230,0,18,0.16),0_24px_80px_rgba(15,23,42,0.08)] ${
                  hasDetail
                    ? "cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E60012]/70 focus-visible:ring-offset-4 focus-visible:ring-offset-[#F5F5F7]"
                    : ""
                }`}
              >
                <div className="mb-10 flex items-start justify-between gap-5">
                  {project.logo && (
                    <div className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-[18px] bg-[#F5F5F7] shadow-[0_14px_34px_rgba(15,23,42,0.12)] ring-1 ring-[#E5E5EA] transition-colors duration-300 group-hover:ring-[#E60012]/25">
                      <img src={project.logo} alt={`${project.title} logo`} className="h-full w-full object-cover" />
                    </div>
                  )}
                  <span style={MONO} className={`ml-auto ${statusBadgeClass(project.status, "large")}`}>
                    {project.status}
                  </span>
                </div>

                <div className="flex flex-1 flex-col">
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div>
                      <div style={MONO} className="mb-3 text-[10px] uppercase tracking-[0.18em] text-[#E60012] transition-colors duration-300">
                        {project.id} / {project.accent}
                      </div>
                      <h3 className="text-[30px] font-black leading-none tracking-[-0.05em] text-[#1D1D1F] transition-colors duration-300">
                        {project.title}
                      </h3>
                    </div>
                  </div>

                  <p style={MONO} className="mb-3 text-[10px] uppercase tracking-[0.16em] text-[#86868B] transition-colors duration-300">
                    {project.subtitle}
                  </p>
                  <p className="break-keep text-[13px] leading-[1.7] text-[#515154] transition-colors duration-300">
                    {project.description}
                  </p>

                  <ul className="mt-5 grid gap-1.5">
                    {project.highlights.slice(0, 3).map((item, itemIndex) => (
                      <li key={`${project.id}-highlight-${itemIndex}`} className="flex gap-2.5 break-keep text-[12px] leading-[1.55] text-[#515154] transition-colors duration-300">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#E60012] transition-colors duration-300" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-6">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <span key={`${project.id}-tag-${tagIndex}`} className={tagBadgeClass(tag)}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    {project.links && (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {project.links.map((link) => (
                          <a
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(event) => event.stopPropagation()}
                            className="inline-flex items-center gap-1.5 rounded-full bg-[#E60012] px-3 py-2 text-[11px] font-bold text-white transition-colors duration-200 hover:bg-[#1D1D1F]"
                          >
                            {link.label}
                            <ArrowUpRight size={12} />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </article>
              );
            })}
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-3">
            {PROJECTS.slice(2).map((project) => {
              const hasDetail = Boolean(project.planningSections?.length);

              return (
              <article
                key={project.id}
                role={hasDetail ? "button" : undefined}
                tabIndex={hasDetail ? 0 : undefined}
                onClick={() => openProjectDetail(project)}
                onKeyDown={(event) => handleProjectKeyDown(event, project)}
                aria-label={hasDetail ? `${project.title} 상세 보기` : undefined}
                className={`project-app-card reveal-on-scroll group flex min-h-[360px] flex-col overflow-hidden rounded-[24px] border border-[#D2D2D7] bg-white p-6 shadow-[0_18px_58px_rgba(15,23,42,0.09)] transition-all duration-300 hover:-translate-y-1 hover:border-[#E60012]/40 hover:shadow-[0_24px_76px_rgba(230,0,18,0.14),0_18px_58px_rgba(15,23,42,0.08)] ${
                  hasDetail
                    ? "cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E60012]/70 focus-visible:ring-offset-4 focus-visible:ring-offset-[#F5F5F7]"
                    : ""
                }`}
              >
                <div className="mb-8 flex items-start justify-between gap-4">
                  {project.logo && (
                    <div className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-[14px] bg-[#F5F5F7] shadow-[0_10px_26px_rgba(15,23,42,0.1)] ring-1 ring-[#E5E5EA] transition-colors duration-300 group-hover:ring-[#E60012]/25">
                      <img src={project.logo} alt={`${project.title} logo`} className="h-full w-full object-cover" />
                    </div>
                  )}
                  <span style={MONO} className={`ml-auto ${statusBadgeClass(project.status, "small")}`}>
                    {project.status}
                  </span>
                </div>

                <div className="flex flex-1 flex-col">
                  <div style={MONO} className="mb-3 text-[10px] uppercase tracking-[0.18em] text-[#E60012] transition-colors duration-300">
                    {project.id} / {project.accent}
                  </div>
                  <h3 className="text-[26px] font-black leading-none tracking-[-0.05em] text-[#1D1D1F] transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p style={MONO} className="mt-3 text-[10px] uppercase tracking-[0.16em] text-[#86868B] transition-colors duration-300">
                    {project.subtitle}
                  </p>
                  <p className="mt-4 break-keep text-[12px] leading-[1.65] text-[#515154] transition-colors duration-300">
                    {project.description}
                  </p>

                  <ul className="mt-4 grid gap-1.5">
                    {project.highlights.slice(0, 2).map((item, itemIndex) => (
                      <li key={`${project.id}-compact-highlight-${itemIndex}`} className="flex gap-2.5 break-keep text-[11px] leading-[1.5] text-[#515154] transition-colors duration-300">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#E60012] transition-colors duration-300" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex flex-wrap gap-2 pt-5">
                    {project.tags.map((tag, tagIndex) => (
                      <span key={`${project.id}-compact-tag-${tagIndex}`} className={tagBadgeClass(tag)}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
              );
            })}
          </div>
        </div>
      </section>

      {selectedProject && (
        <div
          className="fixed inset-0 z-[80] overflow-y-auto bg-[#1D1D1F]/58 px-4 py-6 backdrop-blur-md"
          onClick={() => setSelectedProject(null)}
          role="presentation"
        >
          <section
            className="mx-auto w-full max-w-6xl rounded-[30px] border border-[#D2D2D7] bg-white shadow-[0_36px_120px_rgba(15,23,42,0.28)]"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-detail-title"
          >
            <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-[#E5E5EA] bg-white/92 px-5 py-4 backdrop-blur-xl sm:px-7">
              <div className="flex min-w-0 items-center gap-3">
                {selectedProject.logo && (
                  <div className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-[14px] bg-[#F5F5F7] shadow-[0_10px_26px_rgba(15,23,42,0.1)] ring-1 ring-[#E5E5EA]">
                    <img src={selectedProject.logo} alt={`${selectedProject.title} logo`} className="h-full w-full object-cover" />
                  </div>
                )}
                <div className="min-w-0">
                  <div style={MONO} className="mb-1 text-[10px] uppercase tracking-[0.18em] text-[#E60012]">
                    {selectedProject.id} / {selectedProject.accent}
                  </div>
                  <h2 id="project-detail-title" className="truncate text-[24px] font-black leading-none tracking-[-0.04em] text-[#1D1D1F] sm:text-[32px]">
                    {selectedProject.title}
                  </h2>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <span style={MONO} className={statusBadgeClass(selectedProject.status, "small")}>
                  {selectedProject.status}
                </span>
                <button
                  type="button"
                  aria-label="상세 닫기"
                  onClick={() => setSelectedProject(null)}
                  className="grid h-9 w-9 place-items-center rounded-full border border-[#D2D2D7] bg-[#F5F5F7] text-[#1D1D1F] transition-colors duration-200 hover:border-[#E60012]/30 hover:bg-[#FFF1F1] hover:text-[#E60012]"
                >
                  <X size={17} />
                </button>
              </div>
            </div>

            <div className="p-5 sm:p-7">
              <div className="rounded-[24px] border border-[#E5E5EA] bg-[#FBFBFD] p-5 shadow-[0_14px_42px_rgba(15,23,42,0.06)] sm:p-6">
                <div style={MONO} className="mb-3 text-[10px] uppercase tracking-[0.24em] text-[#E60012]">
                  Product detail
                </div>
                <p className="max-w-4xl break-keep text-[16px] font-bold leading-[1.75] text-[#1D1D1F] sm:text-[18px]">
                  {selectedProject.detailIntro}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag, tagIndex) => (
                    <span key={`${selectedProject.id}-detail-tag-${tagIndex}`} className={tagBadgeClass(tag)}>
                      {tag}
                    </span>
                  ))}
                </div>

                {selectedProject.links && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {selectedProject.links.map((link) => (
                      <a
                        key={`${selectedProject.id}-detail-${link.label}`}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full bg-[#E60012] px-3 py-2 text-[11px] font-bold text-white transition-colors duration-200 hover:bg-[#1D1D1F]"
                      >
                        {link.label}
                        <ArrowUpRight size={12} />
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-6">
                <div className="mb-4 flex items-end justify-between gap-4 border-t border-[#E5E5EA] pt-6">
                  <div>
                    <div style={MONO} className="mb-2 text-[10px] uppercase tracking-[0.24em] text-[#E60012]">
                      Screens & features
                    </div>
                    <h3 className="text-[24px] font-black tracking-[-0.04em] text-[#1D1D1F] sm:text-[30px]">
                      기능별 화면 설명
                    </h3>
                  </div>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                  {selectedProject.planningSections?.map((section) => (
                    <article
                      key={`${selectedProject.id}-${section.title}`}
                      className="overflow-hidden rounded-[22px] border border-[#D2D2D7] bg-[#FBFBFD] shadow-[0_14px_42px_rgba(15,23,42,0.07)]"
                    >
                      <div className="grid min-h-full md:grid-cols-[0.92fr_1fr] lg:grid-cols-1 xl:grid-cols-[0.92fr_1fr]">
                        <div className="flex min-h-[300px] items-center justify-center overflow-hidden border-b border-[#E5E5EA] bg-[#F5F5F7] p-3 md:border-b-0 md:border-r lg:border-b lg:border-r-0 xl:border-b-0 xl:border-r">
                          {getSectionImages(section).length > 1 ? (
                            <div className="grid w-full grid-cols-2 gap-2">
                              {getSectionImages(section).map((image, imageIndex) => (
                                <img
                                  key={`${selectedProject.id}-${section.label}-image-${imageIndex}`}
                                  src={image}
                                  alt={`${selectedProject.title} ${section.title} 화면`}
                                  className="max-h-[430px] w-auto max-w-full rounded-[16px] object-contain shadow-[0_12px_36px_rgba(15,23,42,0.12)]"
                                />
                              ))}
                            </div>
                          ) : (
                            <img
                              src={section.image}
                              alt={`${selectedProject.title} ${section.title} 화면`}
                              className="max-h-[430px] w-auto max-w-full rounded-[16px] object-contain shadow-[0_12px_36px_rgba(15,23,42,0.12)]"
                            />
                          )}
                        </div>

                        <div className="p-4 sm:p-5">
                          <div style={MONO} className="mb-2 text-[10px] uppercase tracking-[0.18em] text-[#E60012]">
                            {section.label}
                          </div>
                          <h4 className="text-[18px] font-black tracking-[-0.03em] text-[#1D1D1F]">
                            {section.title}
                          </h4>
                          <dl className="mt-4 grid gap-3 text-[13px] leading-[1.7] text-[#515154]">
                            <div>
                              <dt className="mb-1 font-bold text-[#1D1D1F]">기획 의도</dt>
                              <dd className="break-keep">{section.intent}</dd>
                            </div>
                            <div>
                              <dt className="mb-1 font-bold text-[#1D1D1F]">구현/설계 포인트</dt>
                              <dd className="break-keep">{section.execution}</dd>
                            </div>
                          </dl>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ── ABOUT ───────────────────────────────────────────── */}
      <section id="about" className="reveal-on-scroll bg-white px-6 py-14 lg:px-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 border-t border-[#D2D2D7] pt-8 lg:grid-cols-[1fr_0.9fr] lg:items-start">
          <div>
            <div style={MONO} className="mb-3 text-[10px] uppercase tracking-[0.3em] text-[#E60012]">
              003 / About
            </div>
            <h2 style={SLAB} className="text-[clamp(34px,5vw,64px)] font-black leading-[0.95] text-[#1D1D1F] uppercase">
              About
            </h2>
            <div className="mt-7 max-w-2xl space-y-4 break-keep text-[15px] leading-[1.85] text-[#515154]">
              <p>
                언어학과 언어정보처리를 공부하며 언어 데이터와 AI 기술에 관심을 갖게 되었고,
                수영강사 경험을 통해 개인 운동 환경에서 훈련 계획과 지속적인 동기 유지가 어렵다는 문제를 발견했습니다.
              </p>
              <p>
                이 문제를 바탕으로 AI 수영 코칭 앱 <strong className="font-bold text-[#1D1D1F]">Aquach</strong>를 개발해 App Store와 Google Play에 출시했으며,
                이후에도 운동, 학습, AI 기능을 모바일 앱 안에서 제품화하는 작업을 이어가고 있습니다.
              </p>
              <p>
                저는 단순한 기능 구현보다 <strong className="font-bold text-[#1D1D1F]">사용자의 문제를 발견하고, 직접 만들고, 배포하고, 다시 개선하는 과정</strong>에 집중합니다.
              </p>
            </div>
          </div>

          <aside className="rounded-[24px] border border-[#D2D2D7] bg-[#F5F5F7] p-5 shadow-[0_18px_70px_rgba(15,23,42,0.08)] lg:p-6">
            <div className="divide-y divide-[#D2D2D7]">
              {ABOUT_POINTS.map((item) => (
                <div key={item.title} className="py-4 first:pt-0 last:pb-0">
                  <h3 className="text-[17px] font-black leading-tight tracking-[-0.02em] text-[#1D1D1F]">
                    {item.title}
                  </h3>
                  <div style={MONO} className="mt-2 text-[10px] uppercase tracking-[0.16em] text-[#E60012]">
                    {item.meta}
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────── */}
      <footer className="bg-white border-t border-[#D2D2D7] px-8 lg:px-16 py-5">
        <div className="flex items-center justify-between">
          <span style={MONO} className="text-[10px] tracking-[0.25em] text-[#6E6E73] uppercase">
            © 2026 Hwang Kyeongsang
          </span>
          <span style={MONO} className="text-[10px] tracking-[0.25em] text-[#86868B] uppercase">
            Daejeon, South Korea
          </span>
        </div>
      </footer>

    </div>
  );
}
