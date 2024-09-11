import { Request , Response } from "express";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import unidecode from "unidecode";

//GET /:type
export const result = async (req : Request , res : Response) => {
    const type = req.params.type ;
    const keyword: string = `${req.query.keyword}`;

    const unidecodeText: string = unidecode(keyword.trim());
    const keywordSlug = unidecodeText.replace(/\s+/g, "-");
    const keyWordSlugRegex = new RegExp(keywordSlug, "i");

    const keyWordRegex = new RegExp(keyword, "i");
    let songs = [];
    const songDetail = [] ;
    if(keyword){
       songs = await Song.find({
        $or : [
          { slug: keyWordSlugRegex },
          { title: keyWordRegex }
        ],
        deleted: false,
        status: "active"
      }).select("avatar title singerId like slug");
    
      for (const item of songs) {
        const singer = await Singer.findOne({
          _id: item.singerId,
          deleted: false
        }).select("fullName");
    
        songDetail.push({
          id: item.id,
          avatar: item.avatar,
          title: item.title,
          like: item.like,
          slug: item.slug,
          singer: {
          fullName: singer.fullName
        },
        });
      }
    }
    

  switch (type) {
    case "result":
      res.render("client/pages/search/result", {
        pageTitle: `Kết quả: ${keyword}`,
        keyword: keyword,
        songs: songDetail
      });
      break;
  
    case "suggest":
      res.json({
        code : 200,
        message : "Thành công",
        songs : songDetail
      })
      break;
  }
  
}