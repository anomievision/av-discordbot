import { AnomieDatabase } from "av-database";

let databaseClient: AnomieDatabase;
let isDatabaseClientInitialized = false;
let databaseServiceClient: AnomieDatabase;
let isDatabaseServiceClientInitialized = false;

export function useDatabaseClient(): AnomieDatabase {
    if (!isDatabaseClientInitialized) {
        databaseClient = new AnomieDatabase(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

        isDatabaseClientInitialized = true;
    }

    return databaseClient;
}

export function useDatabaseServiceClient(): AnomieDatabase {
    if (!isDatabaseServiceClientInitialized) {
        databaseServiceClient = new AnomieDatabase(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

        isDatabaseServiceClientInitialized = true;
    }

    return databaseServiceClient;
}
