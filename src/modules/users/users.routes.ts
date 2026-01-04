import { Router } from "express";
import role from "../../middlewares/role";
import { usersController } from "./users.controller";
import auth from "../../middlewares/auth";
import { canUpdateUser } from "../../middlewares/canUpdate";
import canViewUser from "../../middlewares/canView";

const router = Router()

router.get('/', role("admin",), usersController.getUsers )
router.get('/:userId', auth, canViewUser, usersController.getSingleUser)
router.put('/:userId', auth, canUpdateUser, usersController.updateUser)
router.delete('/:userId', role("admin"), usersController.deleteUser)

export const userRoutes = router