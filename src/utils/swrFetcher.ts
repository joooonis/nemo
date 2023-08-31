import axios from 'axios';

const fetcherKakao = (url: string) =>
  axios
    .get(url, {
      headers: {
        Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_API_URL}`,
      },
    })
    .then((res) => res.data);

async function sendRequest(
  url: string,
  { arg }: { arg: { [key: string]: any } }
) {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(arg),
  }).then((res) => res.json());
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export { fetcher, fetcherKakao, sendRequest };
