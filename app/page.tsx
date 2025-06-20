'use client';

import { Button } from '@radix-ui/themes';
import MisskeyIcon from '../public/Icons/Simpleicons-Team-Simple-Misskey.svg';
import { authClient } from './utils/auth-client';

export default function Home() {
  const handleClick = async () => {
    authClient.signIn.oauth2({
      providerId: 'misskey',
      callbackURL: `/dashboard`,
    });
  };

  return (
    <main className="w-screen h-screen flex flex-col justify-center items-center">
      <h1 className="font-black text-5xl">세라복.모에 커모지 신청 페이지</h1>
      <h2 className="mt-2 text-xl">
        여러분이 세라복.모에에 넣고 싶은 커모지를 신청해보세요!
      </h2>
      <Button size="4" className="!mt-6" onClick={handleClick}>
        <MisskeyIcon height={24} fill="white" />
        세라복.모에 계정으로 로그인
      </Button>
    </main>
  );
}
