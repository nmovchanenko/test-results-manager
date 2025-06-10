/*
  Warnings:

  - You are about to drop the column `isOk` on the `Result` table. All the data in the column will be lost.
  - You are about to drop the column `specExpectedStatus` on the `Result` table. All the data in the column will be lost.
  - You are about to drop the column `specProjectId` on the `Result` table. All the data in the column will be lost.
  - You are about to drop the column `specProjectName` on the `Result` table. All the data in the column will be lost.
  - You are about to drop the column `specStatus` on the `Result` table. All the data in the column will be lost.
  - You are about to drop the column `specTimeout` on the `Result` table. All the data in the column will be lost.
  - Added the required column `startedAt` to the `Execution` table without a default value. This is not possible if the table is not empty.
  - Added the required column `version` to the `Execution` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Execution" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "environment" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "startedAt" DATETIME NOT NULL
);
INSERT INTO "new_Execution" ("createdAt", "environment", "id", "name", "type", "updatedAt") SELECT "createdAt", "environment", "id", "name", "type", "updatedAt" FROM "Execution";
DROP TABLE "Execution";
ALTER TABLE "new_Execution" RENAME TO "Execution";
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
    "issueId" INTEGER NOT NULL,
    "specId" INTEGER NOT NULL,
    "executionId" INTEGER NOT NULL,
    CONSTRAINT "Result_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "Issue" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Result_specId_fkey" FOREIGN KEY ("specId") REFERENCES "Spec" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Result_executionId_fkey" FOREIGN KEY ("executionId") REFERENCES "Execution" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Result" ("allureLink", "createdAt", "duration", "errorCallLog", "errorCallStack", "errorExpectedPattern", "errorLocation", "errorMessage", "errorReceivedString", "errorTestAssertion", "errorType", "executionId", "id", "issueId", "retry", "specId", "startTime", "status", "updatedAt") SELECT "allureLink", "createdAt", "duration", "errorCallLog", "errorCallStack", "errorExpectedPattern", "errorLocation", "errorMessage", "errorReceivedString", "errorTestAssertion", "errorType", "executionId", "id", "issueId", "retry", "specId", "startTime", "status", "updatedAt" FROM "Result";
DROP TABLE "Result";
ALTER TABLE "new_Result" RENAME TO "Result";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
