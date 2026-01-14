import { dispenserSchema } from "@/lib/types/dispensers";
import { describe, it } from "node:test";

describe('Schema Sync', () => {
  it('frontend schemas match backend API', async () => {
    // Create test data
    const testDispenser = {
      ownerId: "123",
      ownerName: "",
      ownerPhoneNumber: "",
      location: "Test Location",
      locationImgUrl: "",
      sharedPercentage: "50"
    };

    // Try to create via API
    const response = await fetch('http://localhost:3001/dispenser', {
      method: 'POST',
      body: JSON.stringify(testDispenser),
    });

    // If this fails, schemas are out of sync
    expect(response.ok).toBe(true);
    
    // Validate response matches our schema
    const data = await response.json();
    expect(() => dispenserSchema.parse(data)).not.toThrow();
  });
});