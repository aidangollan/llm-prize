// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  integer,
  pgTableCreator,
  timestamp,
  uuid,
  text
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `llm-prize_${name}`);

export const tracking = createTable(
  "tracking",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    number: integer("number").default(0),
    name: text("name"),
    created_at: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  }
);

export const message = createTable(
  "message",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    content: text("content"),
    type: text("type"),
    human_question: text("human_question"),
    created_at: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  }
);
