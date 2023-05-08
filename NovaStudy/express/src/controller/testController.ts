import { Request, Response } from 'express';
import express from 'express'


class testController {
    async testGet(req: Request, res: Response) {
        res.send("this is basic get method")
    }
}

const test_controller = new testController()
const router = express.Router()

router.get('/get_basic', async (req: Request, res: Response) => {
    test_controller.testGet(req, res)
})

export default router