import mongoose from "mongoose";
import { Blogs } from "../model/blogModel.js";


export const createBlog = async (req, res) => {
    try {
        const { name } = req.body;

        if(!name) {
            return res.status(400).json({ message: "Blog name is missing" });
        }

        const newBlog = new Blogs(req.body)

        const createdBlog = await newBlog.save();
        return res.status(201).json({ data: createdBlog, message: "Successfully inserted blog into db" });
    } catch (error) {
        return res.status(404).json({ message: error.message || 'error' });
    }
}


export const searchBlog = async (req, res) => {

    let filter = {};

    if (req?.query?.name) {
        // If there's a name query parameter, construct the filter with an exact match
        filter = { name: { $regex: req.query.name, $options: 'i' } }; // Case insensitive regex pattern
    } else if (req?.query?.pattern) {
        // If there's a pattern query parameter, construct the filter with a pattern that includes "mobile"
        filter = { name: { $regex: `.*${req.query.pattern}.*mobile.*`, $options: 'i' } }; // Case insensitive regex pattern
    }
    
    const Blog = await Blogs.find(filter);

        return res.status(200).json({ blogs: Blog });
    
}


export const getBlogs = async (req, res) => {

    const Blog = await Blogs.aggregate([
        {
            $match: { isDraft: false } // Filter to only include published blogs
        },
        {
            $lookup:{
                from:"categories",
                localField:"dropdown",
                foreignField:"_id",
                as:"categoriesInfo"
            }
        },
        {
            $unwind: "$categoriesInfo"
        },

        {
            $lookup:{
                from:"users",
                localField:"userId",
                foreignField:"_id",
                as:"userInfo"
            }
        },
        {
            $unwind: "$userInfo"
        }
    ])
  
        return res.status(200).json({ blogs: Blog });
    
}


export const getBlogsByCategory = async (req, res) => {
    
    const Blog = await Blogs.find({dropdown:new mongoose.Types.ObjectId(req.params.id)})

    if(Blog.length === 0) {
        return res.status(404).json("no entries yet");
    } else {
        return res.status(200).json({ blogs: Blog });
    }
}


export const getBlogById = async (req, res) => {
    const response = await mongoose.connection.collection("blog").findOne({ _id: new mongoose.Types.ObjectId(req.params.id) });

    if(response) {
        return res.status(200).json({ Blog: response });
    }else {
        return res.status(404).json("no entries yet");
    }
}


export const deleteBlogById = async (req, res) => {
    try {
        if(!req.params.id) {
            return res.status(400).json({ message: "error while deleting!!!" });
        }
        await Blogs.findByIdAndDelete(req.params.id)
        return res.status(200).json({ message: "deleted" });
    } catch(error) {
        return res.status(200).json({ message: error.message || 'error' });
    }
}


export const updateBlogById = async (req, res) => {
    console.log(req.params.id);

    try {
        if(!req.params.id) {
            return res.status(400).json({ message: 'error while deleting!' });
        }

        await Blogs.findByIdAndUpdate(req.params.id,{$set:req.body});
        return res.status(200).json({ message: "updated" });
    } catch (error) {
        return res.status(400).json({ message: error.message || "updation error" })
    }
}


export const createAdminBlog = async (req, res) => {
    try {
        console.log(req.user,'body');
        const adminId = req.user.adminId;

        if(!adminId) {
            return res.status(400).json({ message: "Admin ID is required" });
        }

        const newBlog = new Blogs({adminId:req.user.adminId,...req.body})

        const createdBlog = await newBlog.save();
        return res.status(201).json({ data: createdBlog, message: "Successfully inserted blog into db" });
    } catch (error) {
        return res.status(404).json({ message: error.message || 'error' });
    }
}

export const getBlogsByAdmin = async (req, res) => {
    try {
        const blogs = await Blogs.find();

        if (blogs.length === 0) {
            return res.status(404).json({ message: "No blogs found for this admin" });
        }

        return res.status(200).json({ blogs });
    } catch (error) {
        return res.status(500).json({ message: error.message || "Error fetching blogs by admin" });
    }
}

export const createUserBlog = async (req, res) => {
    try {
        console.log(req.user,'body');
        const userId = req.user.userId;

        if(!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const newBlog = new Blogs({userId:req.user.userId,...req.body})

        const createdBlog = await newBlog.save();
        return res.status(201).json({ data: createdBlog, message: "Successfully inserted blog into db" });
    } catch (error) {
        return res.status(404).json({ message: error.message || 'error' });
    }
}


// blogs of their own (drafts and published)
export const getBlogsOfUser = async (req, res) => {
    try {
        const userId = req.user.userId;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const blogs = await Blogs.aggregate([
            {
                $match: { userId: new mongoose.Types.ObjectId(userId) }
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "dropdown",
                    foreignField: "_id",
                    as: "categoriesInfo"
                }
            },
            {
                $unwind: "$categoriesInfo"
            }
        ]);

        if (blogs.length === 0) {
            return res.status(404).json({ message: "No draft blogs found for this user" });
        }

        return res.status(200).json({ blogs });
    } catch (error) {
        return res.status(500).json({ message: error.message || "Error fetching draft blogs by user" });
    }
};

// for drafts
export const getDrafts = async (req, res) => {
    try {
      const userId = req.user.userId;
  
      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }
  
      const drafts = await Blogs.aggregate([
            {
                $match: { userId: new mongoose.Types.ObjectId(userId), isDraft: true }
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "dropdown",
                    foreignField: "_id",
                    as: "categoriesInfo"
                }
            },
            {
                $unwind: "$categoriesInfo"
            }
        ]);

      
      if (drafts.length === 0) {
        return res.status(404).json({ message: "No draft blogs found for this user" });
      }
  
      return res.status(200).json({ drafts });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
};

// for published blogs
export const getPublishedBlogsOfUser = async (req, res) => {
    try {
        const userId = req.user.userId;
        
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }
    
        // const blogs = await Blogs.find({ userId: new mongoose.Types.ObjectId(userId), isDraft: false });
    
        const blogs = await Blogs.aggregate([
            {
                $match: { userId: new mongoose.Types.ObjectId(userId), isDraft: false }
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "dropdown",
                    foreignField: "_id",
                    as: "categoriesInfo"
                }
            },
            {
                $unwind: "$categoriesInfo"
            }
        ]);


        if (blogs.length === 0) {
            return res.status(404).json({ message: "No draft blogs found for this user" });
        }
    
        return res.status(200).json({ blogs });
      } catch (error) {
        return res.status(500).json({ message: error.message || "Error fetching draft blogs by user" });
      }
}


// blogs of all users by id
export const getBlogByUserId = async (req, res) => {

    const blogs= await Blogs.aggregate([
        {
            $match:{userId:new mongoose.Types.ObjectId(req.params.id) }
        },
        {
            $lookup:{
                from:"blog",
                localField:"blogId",
                foreignField:"_id",
                as:"blogInformation"
            }
        },
        {
            $unwind:"$blogInformation"
        }
    ])

    const count= await Blogs.countDocuments();

if (blogs.length === 0) {
    return res.status(200).json({ data:blogs });
} else {
    return res.status(200).json({ data: blogs });
}
}

// all blogs and drafts of all users
export const getBlogsandDraftsOfAllUser = async (req, res) => {

    const Blog = await Blogs.aggregate([
        {
            $lookup:{
                from:"categories",
                localField:"dropdown",
                foreignField:"_id",
                as:"categoriesInfo"
            }
        },
        {
            $unwind: "$categoriesInfo"
        },

        {
            $lookup:{
                from:"users",
                localField:"userId",
                foreignField:"_id",
                as:"userInfo"
            }
        },
        {
            $unwind: "$userInfo"
        }
    ])
  
        return res.status(200).json({ blogs: Blog });   
}


export const getDraftsOfAllUser = async (req, res) => {

    const Blog = await Blogs.aggregate([
        {
            $match: { isDraft: true }
        },
        {
            $lookup:{
                from:"categories",
                localField:"dropdown",
                foreignField:"_id",
                as:"categoriesInfo"
            }
        },
        {
            $unwind: "$categoriesInfo"
        },

       
    ])
  
        return res.status(200).json({ blogs: Blog }); 
}