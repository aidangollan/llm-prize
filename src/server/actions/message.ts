"use server"

import { db } from "../db";
import { message } from "../db/schema";

export async function addMessage({
    content
} : {
    content: string;
}) {
    await db.insert(message).values({
        content: content
    });
}