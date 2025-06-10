/*
  Warnings:

  - Added the required column `madeBy` to the `Assumption` table without a default value. This is not possible if the table is not empty.

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
    "madeBy" TEXT NOT NULL,
    "issueId" INTEGER NOT NULL,
    "resultErrorId" INTEGER,
    CONSTRAINT "Assumption_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "Issue" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Assumption_resultErrorId_fkey" FOREIGN KEY ("resultErrorId") REFERENCES "ResultError" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Assumption" ("createdAt", "id", "isConfirmed", "issueId", "resultErrorId", "score", "updatedAt") SELECT "createdAt", "id", "isConfirmed", "issueId", "resultErrorId", "score", "updatedAt" FROM "Assumption";
DROP TABLE "Assumption";
ALTER TABLE "new_Assumption" RENAME TO "Assumption";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
