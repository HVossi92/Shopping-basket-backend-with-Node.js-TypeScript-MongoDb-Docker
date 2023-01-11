import {Request, Response} from "express";
import {createItemInDb, deleteItemByIdInDb, getItemByIdFromDb} from "../service/ItemService";

export async function createItem(req: Request, res: Response){
    try {
        const item = await createItemInDb(req.body);
        res.send(item);
    } catch (e: any) {
        console.error(e);
        res.status(e?.status).send(e?.message);
    }
}

export async function deleteItem(req: Request, res: Response){
    try {
        const item = await deleteItemByIdInDb(req.params.itemId);
        res.sendStatus(204);
    } catch (e: any) {
        console.error(e);
        res.status(e?.status).send(e?.message);
    }
}

export async function getItemById(req: Request, res: Response){
    try {
        const item = await getItemByIdFromDb(req.params.itemId);
        res.send(item);
    } catch (e: any) {
        console.error(e);
        res.status(e?.status).send(e?.message);
    }
}