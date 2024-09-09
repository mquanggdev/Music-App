import { Request , Response } from "express";
import Topic from "../../models/topic.model";

//GET /topic
export const index = async (req : Request , res : Response) => {
    const topic = await Topic.find({
        deleted : false 
    });

    res.render("client/pages/topics/index");
}