import { Router } from "express";
import role from "../../middlewares/role";
import { usersController } from "./users.controller";
import auth from "../../middlewares/auth";
import { canUpdateUser } from "../../middlewares/canUpdate";
import canViewUser from "../../middlewares/canView";

const router = Router()

router.get('/', role("admin",), usersController.getUsers )
router.get('/:id', auth, canViewUser, usersController.getSingleUser)
router.put('/:id', auth, canUpdateUser, usersController.updateUser)
router.delete('/:id', role("admin"), usersController.deleteUser)

export const userRoutes = router