const fetcher = (url: string) => fetch(url).then((res) => res.json());
async function sendRequest(
  url: string,
  { arg }: { arg: { [key: string]: any } }
) {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(arg),
  }).then((res) => res.json());
}

export { fetcher, sendRequest };
