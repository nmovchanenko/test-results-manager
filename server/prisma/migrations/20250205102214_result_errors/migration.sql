/*
  Warnings:

  - You are about to drop the column `errorCallLog` on the `Result` table. All the data in the column will be lost.
  - You are about to drop the column `errorCallStack` on the `Result` table. All the data in the column will be lost.
  - You are about to drop the column `errorExpectedPattern` on the `Result` table. All the data in the column will be lost.
  - You are about to drop the column `errorLocation` on the `Result` table. All the data in the column will be lost.
  - You are about to drop the column `errorMessage` on the `Result` table. All the data in the column will be lost.
  - You are about to drop the column `errorReceivedString` on the `Result` table. All the data in the column will be lost.
  - You are about to drop the column `errorTestAssertion` on the `Result` table. All the data in the column will be lost.
  - You are about to drop the column `errorType` on the `Result` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "ResultError" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "type" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "callLog" TEXT,
    "callStack" TEXT NOT NULL,
    "testAssertion" TEXT,
    "expectedPattern" TEXT,
    "receivedString" TEXT,
    "location" TEXT NOT NULL,
    "resultId" INTEGER,
    CONSTRAINT "ResultError_resultId_fkey" FOREIGN KEY ("resultId") REFERENCES "Result" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Result" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "allureLink" TEXT,
    "retry" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "startTime" DATETIME NOT NULL,
    "assumptionId" INTEGER,
    "issueId" INTEGER,
    "specId" INTEGER NOT NULL,
    "executionId" INTEGER NOT NULL,
    CONSTRAINT "Result_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "Issue" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Result_specId_fkey" FOREIGN KEY ("specId") REFERENCES "Spec" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Result_executionId_fkey" FOREIGN KEY ("executionId") REFERENCES "Execution" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Result" ("allureLink", "assumptionId", "createdAt", "duration", "executionId", "id", "issueId", "retry", "specId", "startTime", "status", "updatedAt") SELECT "allureLink", "assumptionId", "createdAt", "duration", "executionId", "id", "issueId", "retry", "specId", "startTime", "status", "updatedAt" FROM "Result";
DROP TABLE "Result";
ALTER TABLE "new_Result" RENAME TO "Result";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
