export type MisskeyUser = {
  id: string,
  name: string,
  username: string,
  avatarUrl: string | null,
}

export type MisskeyNote = {
  id: string,
  createdAt: string,
  user: MisskeyUser,
  text: string | null,
  cw: string | null,
  renote: MisskeyNote | null,
  reply: MisskeyNote | null,
  files: [
    {
      id: string,
      createdAt: string,
      blurhash: string | null,
      properties: {
        width: number,
        height: number
      }
      url: string,
      thumbnailUrl: string
    }
  ]
  replyId: string | null,
  renoteId: string | null,
}

export type MisskeyKeomoji = {
  id: string,
  name: string,
  url: string
}
