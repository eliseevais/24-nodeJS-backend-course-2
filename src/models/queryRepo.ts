const videoQueryRepo = {
  getVideos(): VideoOutputModel[] {
    const dbVideos: DBVideo[] = []
    const authors: DBAuthor[] = []

    return dbVideos.map(dbVideo => {
      const author = authors.find(a => a._id === dbVideo.authorId)
      return this._mapDBVideoOutputModel(dbVideo, author!)
    })
  },
  getVideoById(id: string): VideoOutputModel {
    const dbVideo: DBVideo = {
      _id: '123',
      authorId: '321',
      title: 'video title',
      banObj: null
    }
    const author: DBAuthor = {
      _id: '321',
      lastName: 'Ivanov',
      firstName: 'Ivan',
    }
    return this._mapDBVideoOutputModel(dbVideo, author)
  },
  getBannedVideos(id: string): BannedVideoOutputModel[] {
    const dbVideos: DBVideo[] = []
    const authors: DBAuthor[] = []

    return dbVideos.map(dbVideo => {
      const dbAuthor = authors.find(a => a._id === dbVideo.authorId)
      return {
        id: dbVideo._id,
        title: dbVideo.title,
        author: {
          id: dbAuthor!._id,
          name: dbAuthor!.firstName + ' ' + dbAuthor!.lastName
        },
        banReason: dbVideo.banObj!.banReason
      }
    })
  },
  _mapDBVideoOutputModel(dbVideo: DBVideo, abAuthor: DBAuthor) {
    return {
      id: dbVideo._id,
      title: dbVideo.title,
      author: {
        id: abAuthor!._id,
        name: abAuthor!.firstName + ' ' + abAuthor!.lastName
      }
    }
  }
}

type DBVideo = {
  _id: string,
  title: string,
  authorId: string,
  banObj: null | {
    isBanned: boolean,
    banReason: string
  }

}
type DBAuthor = {
  _id: string,
  firstName: string,
  lastName: string
}
type VideoOutputModel = {
  id: string,
  title: string,
  author: {
    id: string,
    name: string
  }
}
type BannedVideoOutputModel = VideoOutputModel & {
  banReason: string
}
