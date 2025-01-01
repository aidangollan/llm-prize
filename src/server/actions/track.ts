"use server"

import { eq } from "drizzle-orm";
import { db } from "../db"
import { tracking } from "../db/schema"

export async function track({
    name
} : {
    name: string
}): Promise<number> {
    const trackingObj = await db.query.tracking.findFirst({
        where: (model, { eq }) => eq(model.name, name)
    });
    
    const prevNum = trackingObj?.number ?? 0;
    
    const newNumViews = await db.update(tracking)
        .set({
            number: prevNum + 1
        })
        .where(eq(tracking.name, name))
        .returning();

    return newNumViews[0]?.number ?? 0;
}