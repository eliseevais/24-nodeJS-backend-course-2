"use strict";
const videoQueryRepo = {
    getVideos() {
        const dbVideos = [];
        const authors = [];
        return dbVideos.map(dbVideo => {
            const author = authors.find(a => a._id === dbVideo.authorId);
            return this._mapDBVideoOutputModel(dbVideo, author);
        });
    },
    getVideoById(id) {
        const dbVideo = {
            _id: '123',
            authorId: '321',
            title: 'video title',
            banObj: null
        };
        const author = {
            _id: '321',
            lastName: 'Ivanov',
            firstName: 'Ivan',
        };
        return this._mapDBVideoOutputModel(dbVideo, author);
    },
    getBannedVideos(id) {
        const dbVideos = [];
        const authors = [];
        return dbVideos.map(dbVideo => {
            const dbAuthor = authors.find(a => a._id === dbVideo.authorId);
            return {
                id: dbVideo._id,
                title: dbVideo.title,
                author: {
                    id: dbAuthor._id,
                    name: dbAuthor.firstName + ' ' + dbAuthor.lastName
                },
                banReason: dbVideo.banObj.banReason
            };
        });
    },
    _mapDBVideoOutputModel(dbVideo, abAuthor) {
        return {
            id: dbVideo._id,
            title: dbVideo.title,
            author: {
                id: abAuthor._id,
                name: abAuthor.firstName + ' ' + abAuthor.lastName
            }
        };
    }
};
