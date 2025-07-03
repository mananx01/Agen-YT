import { SchematicClient } from "@schematichq/schematic-typescript-node";

if(!process.env.SCHEMATIC_SECRET_API_KEY) {
    throw new Error("Schematic secret key is not set in env file!");
}

export const client = new SchematicClient({
    apiKey: process.env.SCHEMATIC_SECRET_API_KEY,
    cacheProviders: {
        flagChecks: [],
    },
});