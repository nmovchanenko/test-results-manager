/*
  Warnings:

  - You are about to drop the column `resultId` on the `Assumption` table. All the data in the column will be lost.
  - You are about to drop the column `assumptionId` on the `Result` table. All the data in the column will be lost.
  - You are about to drop the column `issueId` on the `Result` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Assumption" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "isConfirmed" BOOLEAN NOT NULL,
    "score" REAL NOT NULL,
    "issueId" INTEGER NOT NULL,
    "resultErrorId" INTEGER,
    CONSTRAINT "Assumption_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "Issue" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Assumption_resultErrorId_fkey" FOREIGN KEY ("resultErrorId") REFERENCES "ResultError" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Assumption" ("createdAt", "id", "isConfirmed", "issueId", "score", "updatedAt") SELECT "createdAt", "id", "isConfirmed", "issueId", "score", "updatedAt" FROM "Assumption";
DROP TABLE "Assumption";
ALTER TABLE "new_Assumption" RENAME TO "Assumption";
CREATE TABLE "new_Result" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "allureLink" TEXT,
    "retry" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "startTime" DATETIME NOT NULL,
    "specId" INTEGER NOT NULL,
    "executionId" INTEGER NOT NULL,
    CONSTRAINT "Result_specId_fkey" FOREIGN KEY ("specId") REFERENCES "Spec" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Result_executionId_fkey" FOREIGN KEY ("executionId") REFERENCES "Execution" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Result" ("allureLink", "createdAt", "duration", "executionId", "id", "retry", "specId", "startTime", "status", "updatedAt") SELECT "allureLink", "createdAt", "duration", "executionId", "id", "retry", "specId", "startTime", "status", "updatedAt" FROM "Result";
DROP TABLE "Result";
ALTER TABLE "new_Result" RENAME TO "Result";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
