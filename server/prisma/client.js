import { PrismaClient } from "@prisma/client";
import getLogger from "../src/lib/logger.js";

function runClient() {
  const logger = getLogger();
  const client = new PrismaClient();
  logger.debug('sqlite STARTED');
  return client;
}

export const dbClient = runClient();
