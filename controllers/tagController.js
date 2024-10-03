import mongoose from "mongoose";
import { Tag } from "../model/tagModel.js";


export const createTag = async (req, res) => {
    try {
        const { name } = req.body;

        if(!name) {
            return res.status(400).json({ message: "tag name is missing" });
        }
       
        const isTagExist = await Tag.findOne({ name:req.body.name});

        if(!!isTagExist) {
            return res.status(400).json({ message: "tag name is existing...Please enter another one" });
        }

        const newTag = new Tag(req.body)

        const createdTag = await newTag.save();
        return res.status(201).json({ data: createdTag, message: "Successfully inserted tag into db" });

    } catch (error) {
        return res.status(404).json({ message: error.message || 'error' });
    }
}


export const getTag = async (req, res) => {
    const Tags = await Tag.find()

    if(Tags.length === 0) {
        return res.status(404).json("no entries yet");
    } else {
        return res.status(200).json({ Tag: Tags });
    }
}


export const getTagById = async (req, res) => {
    const response = await mongoose.connection.collection("tag").findOne({ _id: new mongoose.Types.ObjectId(req.params.id) });

    if(response) {
        return res.status(200).json({ Tag: response });
    }else {
        return res.status(404).json("no entries yet");
    }
}


export const deleteTagById = async (req, res) => {
    try {
        if(!req.params.id) {
            return res.status(400).json({ message: "error while deleting!!!" });
        }
        await Tag.findByIdAndDelete(req.params.id)
        return res.status(200).json({ message: "deleted" });
    } catch(error) {
        return res.status(200).json({ message: error.message || 'error' });
    }
}


export const updateTagById = async (req, res) => {
    try {
        if(!req.params.id) {
            return res.status(400).json({ message: 'error while deleting!' });
        }
        await Tag.findByIdAndUpdate(req.params.id,{$set:req.body});
        return res.status(200).json({ message: "updated" });
    } catch (error) {
        return res.status(400).json({ message: error.message || "updation error" })
    }
}