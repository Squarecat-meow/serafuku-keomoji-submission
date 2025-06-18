import Image from 'next/image';

export default function MisskeyName({
  usernameWithKeomoji,
}: {
  usernameWithKeomoji: string | string[];
}) {
  return (
    <div className="flex items-center">
      {typeof usernameWithKeomoji === 'object' ? (
        usernameWithKeomoji.map((el, i) =>
          el.startsWith('https://') ? (
            <Image
              key={i}
              src={el}
              alt="미스키 닉네임 커모지"
              width={48}
              height={48}
              className="w-auto h-6"
              quality={50}
            />
          ) : (
            <span key={i}>{el.trim()}</span>
          ),
        )
      ) : (
        <span>{usernameWithKeomoji}</span>
      )}
    </div>
  );
}
