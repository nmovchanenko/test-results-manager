-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Assumption" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "isConfirmed" BOOLEAN NOT NULL,
    "score" REAL NOT NULL,
    "resultId" INTEGER,
    "issueId" INTEGER NOT NULL,
    CONSTRAINT "Assumption_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "Issue" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Assumption_resultId_fkey" FOREIGN KEY ("resultId") REFERENCES "Result" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Assumption" ("createdAt", "id", "isConfirmed", "issueId", "resultId", "score", "updatedAt") SELECT "createdAt", "id", "isConfirmed", "issueId", "resultId", "score", "updatedAt" FROM "Assumption";
DROP TABLE "Assumption";
ALTER TABLE "new_Assumption" RENAME TO "Assumption";
CREATE TABLE "new_Execution" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "environment" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "startedAt" DATETIME NOT NULL
);
INSERT INTO "new_Execution" ("createdAt", "environment", "id", "name", "startedAt", "type", "updatedAt", "version") SELECT "createdAt", "environment", "id", "name", "startedAt", "type", "updatedAt", "version" FROM "Execution";
DROP TABLE "Execution";
ALTER TABLE "new_Execution" RENAME TO "Execution";
CREATE TABLE "new_Issue" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT,
    "portal" TEXT,
    "service" TEXT,
    "ticket" TEXT
);
INSERT INTO "new_Issue" ("category", "createdAt", "description", "id", "name", "portal", "service", "ticket", "updatedAt") SELECT "category", "createdAt", "description", "id", "name", "portal", "service", "ticket", "updatedAt" FROM "Issue";
DROP TABLE "Issue";
ALTER TABLE "new_Issue" RENAME TO "Issue";
CREATE TABLE "new_Result" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
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
    "assumptionId" INTEGER,
    "issueId" INTEGER,
    "specId" INTEGER NOT NULL,
    "executionId" INTEGER NOT NULL,
    CONSTRAINT "Result_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "Issue" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Result_specId_fkey" FOREIGN KEY ("specId") REFERENCES "Spec" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Result_executionId_fkey" FOREIGN KEY ("executionId") REFERENCES "Execution" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Result" ("allureLink", "assumptionId", "createdAt", "duration", "errorCallLog", "errorCallStack", "errorExpectedPattern", "errorLocation", "errorMessage", "errorReceivedString", "errorTestAssertion", "errorType", "executionId", "id", "issueId", "retry", "specId", "startTime", "status", "updatedAt") SELECT "allureLink", "assumptionId", "createdAt", "duration", "errorCallLog", "errorCallStack", "errorExpectedPattern", "errorLocation", "errorMessage", "errorReceivedString", "errorTestAssertion", "errorType", "executionId", "id", "issueId", "retry", "specId", "startTime", "status", "updatedAt" FROM "Result";
DROP TABLE "Result";
ALTER TABLE "new_Result" RENAME TO "Result";
CREATE TABLE "new_Spec" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
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
