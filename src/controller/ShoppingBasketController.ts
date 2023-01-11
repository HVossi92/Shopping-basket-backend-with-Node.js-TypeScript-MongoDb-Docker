import {Request, Response} from "express";
import {
    addItemsToShoppingBasketByIdInDb,
    createShoppingBasketInDb,
    deleteShoppingBasketByIdInDb,
    getShoppingBasketByIdFromDb,
    removeItemsFromShoppingBasketByIdInDb
} from "../service/ShoppingBasketService";

export async function createShoppingBasket(req: Request, res: Response){
    try {
        const shoppingBasket = await createShoppingBasketInDb(req.body);
        res.send(shoppingBasket);
    } catch (e: any) {
        console.error(e);
        res.status(e?.status).send(e?.message);
    }
}

export async function getShoppingBasketById(req: Request, res: Response){
    try {
        const shoppingBasket = await getShoppingBasketByIdFromDb(req.params.shoppingBasketId);
        res.send(shoppingBasket);
    } catch (e: any) {
        console.error(e);
        res.status(e?.status).send(e?.message);
    }
}

export async function addItemsToShoppingBasket(req: Request, res: Response){
    try {
        const shoppingBasket = await addItemsToShoppingBasketByIdInDb(req.params.shoppingBasketId, req.body);
        res.send(shoppingBasket);
    } catch (e: any) {
        console.error(e);
        res.status(e?.status).send(e?.message);
    }
}

export async function removeItemsFromShoppingBasket(req: Request, res: Response){
    try {
        const shoppingBasket = await removeItemsFromShoppingBasketByIdInDb(req.params.shoppingBasketId, req.body);
        res.send(shoppingBasket);
    } catch (e: any) {
        console.error(e);
        res.status(e?.status).send(e?.message);
    }
}

export async function deleteShoppingBasketById(req: Request, res: Response){
    try {
        await deleteShoppingBasketByIdInDb(req.params.shoppingBasketId);
        res.sendStatus(204);
    } catch (e: any) {
        console.error(e);
        res.status(e?.status).send(e?.message);
    }
}