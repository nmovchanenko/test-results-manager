import { dbClient as client } from "./client.js";

export async function _clearDatabase() {
  try {
    await client.assumption.deleteMany();
    await client.result.deleteMany();
    await client.issue.deleteMany();
    await client.spec.deleteMany();
    await client.execution.deleteMany();
    await client.resultError.deleteMany();

    console.log('All records deleted successfully.');
  } catch (error) {
    console.error('Error deleting records:', error);
  }
}

await _clearDatabase()
