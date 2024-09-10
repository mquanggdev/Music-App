import { Request , Response } from "express";
import FavoriteSong from "../../models/favorite-song.model";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";

//GET /favorite-songs
export const index = async (req : Request , res : Response) => {
    const favoriteSongs = await FavoriteSong.find({
        deleted : false
    })
    for (const element of favoriteSongs) {
        const song = await Song.findOne({
            _id : element.songId
        }).select("avatar title slug singerId");

        const singer = await Singer.findOne({
            _id : song.singerId
        }).select("fullName");

        element["song"] = song ;
        element["singer"] = singer;
    }
    res.render("client/pages/favorite-songs/index",{
        pageTitle : "Chủ đề bài hát" ,
        favoriteSongs : favoriteSongs
    });
}