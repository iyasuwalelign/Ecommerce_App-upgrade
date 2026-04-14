import type { Request, Response } from "express";
import * as queries from "../db/queries";
import { getAuth } from "@clerk/express";


export const createComment = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const { productId } = req.params;
    const { content } = req.body;

    const id2 = Array.isArray(productId) ? productId[0] : productId;

    if (!content) {
      res.status(400).json({ error: "Content is required" });
      return;
    }
   // verify product exists

    const product = await queries.getProductById(id2);
    if(!product)
    {
        res.status(404).json({ error: "Product not found" });
    }

    const comment = await queries.createComment({
        content,    
        productId: id2,
        userId,

    });
   
}
catch(error){
    console.error("Error creating comment:", error);
    res.status(500).json({ error: "Failed to create comment" });
}
};

export const deleteComment = async (req: Request, res: Response) => {
try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ error: "Unauthorized" });
    const { id } = req.params;
    const commentId = Array.isArray(id) ? id[0] : id;   
    // verify comment exists and belongs to user
    const existingComment = await queries.getCommentById(commentId);
    if (!existingComment) {
      res.status(404).json({ error: "Comment not found" });
      return;
    }
    if (existingComment.userId !== userId) {
      res.status(403).json({ error: "Forbidden" });
        return;
    }
    await queries.deleteComment(commentId); 
    res.status(200).json({ message: "Comment deleted successfully" });

} catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ error: "Failed to delete comment" });
}
};

 
