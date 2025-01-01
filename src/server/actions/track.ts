"use server"

import { eq } from "drizzle-orm";
import { db } from "../db"
import { view } from "../db/schema"

export async function trackView(): Promise<number> {
    const viewObj = await db.query.view.findFirst();
    
    const prevViews = viewObj?.views ?? 0;
    
    const newNumViews = await db.update(view)
        .set({
            views: prevViews + 1
        })
        .where(eq(view.id, viewObj!.id))
        .returning();

    return newNumViews[0]?.views ?? 0;
}