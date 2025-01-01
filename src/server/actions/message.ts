"use server"

import { db } from "../db";
import { message } from "../db/schema";

export async function addMessage({
    content,
    type,
    human_question
} : {
    content: string;
    type: 'human' | 'robot';
    human_question: string | null;
}) {
    await db.insert(message).values({
        content: content,
        type: type,
        human_question: human_question
    });
}