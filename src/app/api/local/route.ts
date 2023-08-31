import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET() {
  const response = axios.get(
    'https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=127.108622&y=37.401219',
    {
      headers: {
        Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_API_URL}`,
      },
    }
  );

  return NextResponse.json(response);
}
