# 📁 폴더 구조

```
├── ...
├── public
├── src
│ ├── app
│ │ ├── (form)
│ │ │ ├── arrival               # 도착지 선택 라우트
│ │ │ ├── departure             # 출발지 선택 라우트
│ │ │ ├── form                  # 일정 등록 라우트
│ │ │ └── layout.tsx            # (form) 공통 레이아웃
│ │ ├── (service)
│ │ │ ├── home                  # 홈 라우트
│ │ │ ├── ui                    # home 라우트에서 사용하는 컴포넌트 모음
│ │ │ └── layout.tsx
│ │ └── layout.tsx              # 루트 레이아웃
│ ├── components                # 기본 컴포넌트
│ ├── styles
│ ├── types                     # 공통 타입
│ └── utils
│ │ ├── date.ts                 # 날짜, 시간 관련 유틸 함수
│ │ └── swrFetcher.ts           # SWR, data fetchers
├── tailwind.config.js
├── next.config.js
├── README.md
└── ...
```

<br/>

# 🚀 개발 서버 실행

빌드 및 실행

```
// 종속성 설치
yarn install 또는 yarn

// 개발 서버 실행
yarn dev
```

<br/>

# 주요 사용 기술

## Next.js 13, [App Router](https://nextjs.org/docs/app)

- Layouts(Root, Nesting) : 루트 레이아웃 및 중첩 레이아웃을 사용하여 공통 헤더, 하단 고정 버튼 등을 배치
- Route Groups : 라우트 그룹을 통해 공통 레이아웃 적용
- RSC : 서버 컴포넌트, 서버단에서 데이터 패칭 로직 구현

### Data Fetching On the server, with fetch

```tsx
...

export default async function Page() {
  const record = await getSchedulesMap();
  const recentSchedule = await getRecentSchedule();
  return (
    <Suspense
      fallback={
        <div className='w-full flex justify-center items-center'>
          <Spinner />
        </div>
      }>
      {...랜더링}
    </Suspense>
  );
}

async function getSchedulesMap(): Promise<Record<string, Schedule[]>> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/schedules`);
  const schedules: Schedule[] = await res.json();
  const record: Record<string, Schedule[]> = {};
  schedules?.slice(1)?.forEach((schedule) => {
    const date = format(new Date(schedule.departureTime), 'yyyy-MM-dd');
    if (record[date]) {
      record[date].push(schedule);
    } else {
      record[date] = [schedule];
    }
  });

  return record;
}

async function getRecentSchedule(): Promise<Schedule> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/schedules`);
  const schedules: Schedule[] = await res.json();
  return schedules[0];
}
```

- Next.js 13 버전에서 제공하는 서버 컴포넌트와 React 18의 서스펜스 조합으로 데이터 요청 작업을 진행해보았습니다.
- 잘 동작하였으나 이후 revalidate, 재요청 이슈로 다시 클라이언트 사이드에서 요청하는 것으로 변경하였습니다. (fetch 함수에 옵션을 전달하여 주기적으로 revalidate을 요청할 수 있으나 랜더링 사이에는 기본으로 캐시된 값을 사용하여 데이터가 stale한 값을 유지하기에 적합한 방법을 찾지 못했습니다.)

[관련 commit 내역 1](https://github.com/kamonemothon/lastpang-frontend/commit/a652e35d9a8f709cd9ed43cd567d8af5e7b3849d)
[관련 commit 내역 2](https://github.com/kamonemothon/lastpang-frontend/commit/63783e9be9fcdf0e29072e792d32a6451b0e0c1b)

<br/>

## [TailwindCss](https://tailwindcss.com/)

- 스타일링에는 tailwindcss를 사용하였습니다.

## [SWR](https://swr.vercel.app/)

### 데이터 요청

```tsx
// GET 요청
const { data: schedules } = useSWR<Schedule[]>(
  `${process.env.NEXT_PUBLIC_API_URL}/api/v1/schedules`,
  fetcher
);

// POST 요청
const { trigger, isMutating } = useSWRMutation(
  `${process.env.NEXT_PUBLIC_API_URL}/api/v1/schedules`,
  sendRequest,
  {
    onSuccess: (data) => {
      router.push(`/form/common/?id=${data.commonScheduleId}`);
    },
  }
);

// 카카오 API 요청
const { data, isLoading } = useSWR(
  () =>
    latitude &&
    longitude &&
    `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${longitude}&y=${latitude}`,
  fetcherKakao
);
```

- 서버 상태 관리 라이브러리로 SWR을 사용했습니다.
- 선언적으로 data 관리가 가능하고 onSuccess API를 통해 데이터 패칭 이후 로직의 구성이 용이합니다.
- GET 요청시 `useSWR`, POST 요청시 `useSWRMutation` API를 사용했습니다.
- 카카오 API, 백엔드로 GET, POST요청에 따라 다른 fetcher 함수를 미리 작성하여 사용했습니다.

  <br/>

### 로딩 UI 구현

```tsx
if (isLoading || isMutating)
  return (
    <div className='w-full flex justify-center items-center mt-16'>
      <Spinner />
    </div>
  );

return ...
```

- SWR을 사용하여 데이터 요청 사이 로딩 UI를 통해 사용자에게 로딩 중임을 알려줍니다.

<br/>

### 조건부 요청 및 디바운스

```tsx
const [latitude, setLatitude] = useState<number>();
const [longitude, setLongitude] = useState<number>();

const originName = searchParams.get('originName');
const origin = searchParams.get('origin');

const [query, setQuery] = useState('');
const debouceQuery = useDebounce(query, 1000);

const { data, isLoading } = useSWR(
  () =>
    debouceQuery &&
    longitude &&
    latitude &&
    `https://dapi.kakao.com/v2/local/search/keyword.json?x=${longitude}&y=${latitude}&query=${debouceQuery}`,
  fetcherKakao
);
```

- API 요청에 인자가 동기적으로 필요한 경우 위와 같이 작성하여 쿼리가 유효한 시점에 데이터 요청을 할 수 있습니다.
- 검색 쿼리 요청의 경우 너무 잦은 요청을 방지하기 위해 디바운스 로직을 따로 적용했습니다.
