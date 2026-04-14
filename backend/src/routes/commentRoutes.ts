 import {Router} from 'express';
 import * as commentController from '../controllers/commentController';
 import { requireAuth } from '@clerk/express';



 const router = Router();

//Post /api/comments/:productId => create a comment for a product (protected)

router.post("/:productId",requireAuth(),commentController.createComment);

// delete /api/comments/:id => delete a comment (protected)

router.delete("/:id",requireAuth(),commentController.deleteComment);


export default router;