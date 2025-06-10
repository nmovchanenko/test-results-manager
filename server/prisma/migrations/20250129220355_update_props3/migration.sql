/*
  Warnings:

  - Made the column `tags` on table `Spec` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Result" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "allureLink" TEXT,
    "retry" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "startTime" DATETIME NOT NULL,
    "errorType" TEXT,
    "errorMessage" TEXT,
    "errorCallLog" TEXT,
    "errorCallStack" TEXT,
    "errorTestAssertion" TEXT,
    "errorExpectedPattern" TEXT,
    "errorReceivedString" TEXT,
    "errorLocation" TEXT,
    "issueId" INTEGER,
    "specId" INTEGER NOT NULL,
    "executionId" INTEGER NOT NULL,
    CONSTRAINT "Result_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "Issue" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Result_specId_fkey" FOREIGN KEY ("specId") REFERENCES "Spec" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Result_executionId_fkey" FOREIGN KEY ("executionId") REFERENCES "Execution" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Result" ("allureLink", "createdAt", "duration", "errorCallLog", "errorCallStack", "errorExpectedPattern", "errorLocation", "errorMessage", "errorReceivedString", "errorTestAssertion", "errorType", "executionId", "id", "issueId", "retry", "specId", "startTime", "status", "updatedAt") SELECT "allureLink", "createdAt", "duration", "errorCallLog", "errorCallStack", "errorExpectedPattern", "errorLocation", "errorMessage", "errorReceivedString", "errorTestAssertion", "errorType", "executionId", "id", "issueId", "retry", "specId", "startTime", "status", "updatedAt" FROM "Result";
DROP TABLE "Result";
ALTER TABLE "new_Result" RENAME TO "Result";
CREATE TABLE "new_Spec" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "key" TEXT NOT NULL,
    "file" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "tags" TEXT NOT NULL,
    "annotations" TEXT
);
INSERT INTO "new_Spec" ("annotations", "createdAt", "file", "id", "key", "tags", "title", "updatedAt") SELECT "annotations", "createdAt", "file", "id", "key", "tags", "title", "updatedAt" FROM "Spec";
DROP TABLE "Spec";
ALTER TABLE "new_Spec" RENAME TO "Spec";
CREATE UNIQUE INDEX "Spec_key_key" ON "Spec"("key");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
