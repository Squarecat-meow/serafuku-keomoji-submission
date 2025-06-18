'use client';

import { authClient } from '@/app/utils/auth-client';
import { fetchUsernameKeomoji } from '@/components/misskey/username/fetchUsername';
import MisskeyName from '@/components/misskey/username/MisskeyName';
import { Skeleton } from '@radix-ui/themes';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Layout() {
  const { data } = authClient.useSession();
  const [name, setName] = useState<string | string[]>('');
  const [handle, setHandle] = useState<string | null>(null);

  useEffect(() => {
    if (!data) return;
    setHandle(data.user.handle);
    fetchUsernameKeomoji(data.user.name).then((res) => setName(res));
  }, [data]);
  return (
    <header className="w-full flex justify-center p-6">
      <div className="w-full md:w-[80%] box-border p-2 backdrop-blur-lg border border-slate-300 shadow rounded-xl">
        <button className="p-2 border-none bg-transparent flex items-center gap-2 hover:bg-slate-200/60 transition-colors rounded-xl">
          {data && data.user.image ? (
            <Image
              src={data.user.image}
              alt="프로필사진"
              className="rounded-full"
              width={48}
              height={48}
              quality={50}
            />
          ) : (
            <Skeleton className="!w-12 !h-12 !rounded-full" />
          )}
          <div>
            <MisskeyName usernameWithKeomoji={name} />
            <span className="text-xs text-slate-500">{handle}</span>
          </div>
        </button>
      </div>
    </header>
  );
}
