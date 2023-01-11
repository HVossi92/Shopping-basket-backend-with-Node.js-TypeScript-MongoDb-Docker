import {DocumentDefinition} from 'mongoose';
import InventoryItemModel from "../db/model/InventoryItemModel";
import ItemNotFoundException from '../exceptions/ItemNotFoundException';
import Item from "../interfaces/Item";

export async function createItemInDb(itemDto: DocumentDefinition<Item>) {
    itemDto.createDate = Date.now();
    itemDto.modifyDate = Date.now();
    try {
        return await InventoryItemModel.create(itemDto);
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function deleteItemByIdInDb(itemId: string) {
    const deleted = await InventoryItemModel.deleteOne({_id: itemId});
    if (deleted.deletedCount === 0) {
        throw new ItemNotFoundException(itemId);
    }
    return deleted;
}

export async function getItemByIdFromDb(itemId: string) {
    const itemDbo = await InventoryItemModel.findById(itemId);
    if (!itemDbo) {
        throw new ItemNotFoundException(itemId);
    }
    return itemDbo;
}