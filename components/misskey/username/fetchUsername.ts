import { MisskeyKeomoji } from '@/types/misskey';

export async function fetchUsernameKeomoji(
  username: string,
): Promise<string | string[]> {
  const nameRegExp = new RegExp(/(:.*?:)|([^:]+)/g);
  const nameSplitArray = username.match(nameRegExp);
  const keomojiArray: Array<string | null> = [];

  if (!nameSplitArray) return username;

  nameSplitArray.map((el) => {
    const unwrapKeomoji = new RegExp(/(?<=\:)[\w]+(?=\:)/);
    const unwrappedKeomoji = unwrapKeomoji.exec(el)?.[0];

    if (unwrappedKeomoji) {
      keomojiArray.push(unwrappedKeomoji);
    } else {
      keomojiArray.push(null);
    }
  });

  const promises = keomojiArray.map((el, i) => {
    if (el === null) return nameSplitArray[i];
    else
      return fetch(`https://serafuku.moe/api/emoji?name=${el}`)
        .then((res) => res.json() as unknown as MisskeyKeomoji)
        .then((res) => res.url);
  });

  const res = await Promise.all(promises);

  return res;
}
