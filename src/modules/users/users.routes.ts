import { Router } from "express";
import role from "../../middlewares/role";
import { usersController } from "./users.controller";

const router = Router()

router.get('/', role("admin",), usersController.getUsers )
router.get('/:id', role("admin", "customer", "user"), usersController.getSingleUser)
router.put('/:id', role("admin", "customer", "user"), usersController.updateUser)
router.delete('/:id', role("admin"), usersController.deleteUser)

export const userRoutes = router