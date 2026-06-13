-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ResultError" (
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
    "prompt" TEXT,
    CONSTRAINT "ResultError_resultId_fkey" FOREIGN KEY ("resultId") REFERENCES "Result" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_ResultError" ("callLog", "callStack", "createdAt", "expectedPattern", "id", "location", "message", "prompt", "receivedString", "resultId", "testAssertion", "type", "updatedAt") SELECT "callLog", "callStack", "createdAt", "expectedPattern", "id", "location", "message", "prompt", "receivedString", "resultId", "testAssertion", "type", "updatedAt" FROM "ResultError";
DROP TABLE "ResultError";
ALTER TABLE "new_ResultError" RENAME TO "ResultError";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
