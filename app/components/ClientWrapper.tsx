'use client'

import { SchematicProvider } from "@schematichq/schematic-react";
import SchematicWrapped from "./SchematicWrapped";
import { ConvexClientProvider } from "./ConvexClientProvider";

export default function ClientWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const schematicKey = process.env.NEXT_PUBLIC_SCHEMATIC_PUBLISHABLE_KEY;
  if(!schematicKey) {
    throw new Error("Missing Schematic Publishable Key. Please add it to your .env.local file");
  }

  return (

    <ConvexClientProvider>
      <SchematicProvider publishableKey={schematicKey}>
        <SchematicWrapped>
           {children}
        </SchematicWrapped>
      </SchematicProvider>
    </ConvexClientProvider>
  );
}
