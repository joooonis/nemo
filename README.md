# Riiid 프론트엔드 과제전형 박태준

# 📁 폴더 구조

```
├── ...
├── public
├── src
│ ├── app
│ │ ├── (quiz)
│ │ │ ├── quiz
│ │ │ │ └── page.tsx            # '/quiz' 페이지 라우트
│ │ │ └── ui                    # quiz 페이지에서 사용되는 ui 컴포넌트
│ │ ├── (service)
│ │ │ ├── home                  # '/home' 페이지 라우트
│ │ │ └── ...
│ │ └── api
│ │ │ ├── quiz                  # A세트 문제 생성 api
│ │ │ ├── next                  # B세트 문제 생성 api
│ │ │ └── result                # 시험 결과 분석 api
│ ├── components                # 기본 컴포넌트
│ ├── styles
│ ├── types                     # 공통 타입
│ └── utils
│ │ ├── QuizGenerator.ts        # 문제 생성 class
│ │ ├── QuizGenerator.test.ts   # 문제 생성 class test
│ │ └── QuizGenerator.test.ts   # 시험 결과 분석 class
├── tailwind.config.js
├── next.config.js
├── jest.config.js
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

로컬 환경

```
node : v18.12.1
yarn : v1.22.19
```

<br/>

# 주요 사용 기술

## Next.js 13, [App Router](https://nextjs.org/docs/app)

- Layouts(Root, Nesting)
- Route Groups
- Route Handlers

## [tailwindCss](https://tailwindcss.com/)

```js
// qpp/(quiz)/ui/Result.tsx
const cardWrapper =
 'rounded-sm mt-4 bg-primary-white text-left p-6 sm:p-8' as const;
```

- clsx 함수 활용하여 중복 라인 변수화
- tailwind.config.ts에 미리 디자인 theme 작성

```tsx
// app/(quiz)/page.tsx
export default function Page() {
...
}

function QuizHeader({ timerValue, valueMax, valueNow }: QuizHeaderProps) {
  return (
    <div className='w-full relative'>
      <ProgressBar valueMax={valueMax} valueNow={valueNow + 1} />
      <span className='absolute top-0 right-0'>
        <Timer timeValue={timerValue} />
      </span>
    </div>
  );
}

```

- 중복 컴포넌트 사용시 파일 내부에서 적절히 분리하여 사용

## [SWR](https://swr.vercel.app/)

```ts
// app/(quiz)/page.tsx
/* CSR data fetch using SWR */

const { data: quizQuestions, isLoading } = useSWR<QuestionType[]>(
  '/api/quiz',
  fetcher,
  {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  }
);

const {
  data: nextQuizQuestions,
  trigger: triggerNextQuizQuestions,
  isMutating: isNextQuizQuestionsMutating,
} = useSWRMutation('/api/next', sendRequest, {
  onSuccess: () => {
    setSteps('setB');
    setCurrentQuestionIndex(0);
  },
});

const {
  data: result,
  trigger: triggerResult,
  isMutating: isResultMutating,
} = useSWRMutation('/api/result', sendRequest, {
  onSuccess: () => {
    setSteps('result');
  },
});
```

- 내부적으로 구현한 api를 클라이언트 단에서 호출하기 위해 사용하였습니다.
- 선언적으로 data 관리가 가능하고 onSuccess API를 통해 데이터 패칭 이후 로직의 구성이 용이합니다.
- GET 요청시 `useSWR`, POST 요청시 `useSWRMutation` API를 사용했습니다.

<br/>
<br/>

# 구현 기능

<img src="image.png" height="300px">
<img src="image-2.png" height="300px">
<img src="image-3.png" height="300px">
<img src="image-4.png" height="300px">
<img src="image-5.png" height="300px">

<br/>

- 홈에서 시험시작 버튼을 누르면 구구단 연습문제를 풀 수 있습니다.
- 앞 10문제 풀이 결과에 따라서 뒤 10문제가 생성됩니다.
- 총 20문제 풀이 후 결과 분석 내용을 보여줍니다.

<br/>

<img src="image-1.png" height="500px">

- 크롬 브라우저 개발자도구 기준으로 모바일, 데스크탑 반응형 구현하였습니다.

<br/>
<br/>

# 과정

## 문제 생성 클래스 구현

문제를 생성하는 api를 위해 해당 로직을 따로 class로 구현 했습니다. 아래와 같이 서버단에서는 단순 클래스 호출로 데이터를 구성하여 클라이언트로 전송합니다.

```tsx
// /app/api/quiz/route.ts
import { QuizGenerator } from '@/utils/QuizGenerator';
import { NextResponse } from 'next/server';

export async function GET() {
  const quizGenerator = new QuizGenerator();
  const questions = quizGenerator.generateQuestions(10); // ex) 10개의 문제 생성

  return NextResponse.json(questions);
}
```

`QuizGenerate.test.ts`에 클래스의 매서드에 대한 테스트 코드를 작성했습니다. 아래와 같이 테스트를 실행합니다.

```shell
// 테스트 실행
yarn test
```

<img src="image-6.png" width="400px">

## 상태 관리

- 유저가 문제를 푸는 과정 동안 풀이 시간 저장
- 유저가 푼 문제의 결과값 저장
- 세트별로 문제를 넘기는 과정
- 세트 A -> 세트 B -> 시험 분석 의 과정

등을 위해 상태관리를 어떻게 효율적으로 할지 고민했습니다. 전역 상태 라이브러리 사용도 고려해봤으나 이미 서버로 문제 데이터와 관련된 api를 요청하고 SWR로 이 데이터들을 관리함으로서 어느정도 상태 분리가 이루여졌으므로 번잡스럽게 로컬 상태에 전역 상태 까지 추가할 필요는 없다고 생각했습니다.

```tsx
// app/(quiz)/quiz/page.tsx
const [timerValue] = useTimer(0, { startOnMount: true });
const [steps, setSteps] = useState<'setA' | 'setB' | 'result'>('setA');
const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
const [userAnswers, setUserAnswers] = useState<Answer[]>([]);
```

- 유저가 문제를 푸는 과정 동안 풀이 시간 저장 -> `timeValue`
- 세트 A -> 세트 B -> 시험 분석 의 과정 -> `steps`
- 세트별로 문제를 넘기는 과정 -> `currentQuestionIndex`
- 유저가 푼 문제의 결과값 저장 -> `userAnswer`

로 생각가능한 선에서 가장 최소한의 상태관리를 통해 본 기능들을 구현했습니다.

`SWR`을 이용 서버로 데이터 요청하는 과정에서 로딩 상태의 UI를 따로 보여주도록 하였습니다.

```tsx
if (isLoading || isNextQuizQuestionsMutating || isResultMutating)
  return (
    <div className='w-full flex justify-center items-center h-[calc(100vh-48px)]'>
      <Spinner />
    </div>
  );
```

`page.tsx`에서 반환하는 화면도 `steps` 상태에 따라 알맞은 화면을 랜더링 하도록 하여 컴포넌트 크기가 비대해지지 않도록 하였습니다.

```tsx
// app/(quiz)/quiz.tsx

return (
  <div className='relative flex w-full flex-col justify-start items-center'>
    <div className='w-full mt-2'>
      {steps === 'setA' && (
        <QuizHeader
          timerValue={timerValue}
          valueMax={20}
          valueNow={currentQuestionIndex}
        />
      )}
      {steps === 'setB' && (
        <QuizHeader
          timerValue={timerValue}
          valueMax={20}
          valueNow={currentQuestionIndex + 10}
        />
      )}
    </div>

    <div className='w-full mt-4'>
      {steps === 'setA' && (
        <Question
          key={quizQuestions[currentQuestionIndex].id}
          question={quizQuestions[currentQuestionIndex]}
          onAnswer={handleAnswer}
        />
      )}
      {steps === 'setB' && (
        <Question
          key={nextQuizQuestions[currentQuestionIndex].id}
          question={nextQuizQuestions[currentQuestionIndex]}
          onAnswer={handleAnswer}
        />
      )}
      {steps === 'result' && <Result result={result} />}
    </div>
    <Spacing size={8} />
  </div>
);
```

해당 페이지에서만 사용되는 UI 컴포넌트의 경우 Next.js 13버전의 App Router의 기능을 활용 기본 컴포넌트 그룹과는 따로 분리하여 관리하였습니다.

<img src="image-7.png" width="200px">
