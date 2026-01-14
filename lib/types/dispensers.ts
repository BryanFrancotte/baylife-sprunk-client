import { z } from "zod";

/**
 * ============================================================================
 * TYPE DEFINITIONS
 * ============================================================================
 * 
 * These types mirror the API structure for TypeScript autocomplete/safety.
 * They are NOT validated against API responses - the backend is the source of truth.
 * 
 * Only Zod schemas for CLIENT-SIDE form validation (UX improvement).
 * 
 * LAST SYNCED WITH API: 2024-01-14
 * ============================================================================
 */

/**
 * Owner - matches API response structure
 */
export interface Owner {
  id: string;
  name: string;
  phoneNumber: string;
  createdBy: string;
  createdAt: string;
  updatedBy: string | null;
  updatedAt: string;
}

/**
 * Dispenser - matches actual API GET response
 * Includes nested owner object
 */
export interface Dispenser {
  id: string;
  ownerId: string;
  location: string;
  locationImgUrl: string | null;
  sharePercentage: number;
  collectedAmount: number;
  lastPeriondCollectedAmount: number;
  totalMoneyGenerated: number;
  periodStart: string | null;
  periodEnd: string | null;
  createdById: string;
  createdAt: string;
  updatedById: string | null;
  updatedAt: string;
  owner: Owner; // Nested owner object
}

/**
 * ============================================================================
 * ZOD SCHEMAS - CLIENT-SIDE VALIDATION ONLY
 * ============================================================================
 * 
 * These schemas are ONLY used for validating user input in forms.
 * They provide immediate UX feedback before submitting to the API.
 * 
 * The backend MUST still validate everything - never trust client validation.
 * ============================================================================
 */

/**
 * Create Dispenser Payload Schemas
 * 
 * BUSINESS RULE (enforced by backend):
 * - Existing owner: ownerId provided, ownerName/ownerPhoneNumber empty
 * - New owner: ownerId null, ownerName/ownerPhoneNumber provided
 */
const createDispenserWithExistingOwnerSchema = z.object({
  ownerId: z.string().min(1),
  ownerName: z.literal(""),
  ownerPhoneNumber: z.literal(""),
  location: z.string().min(1, "Location is required"),
  locationImgUrl: z.string().url("Must be a valid URL").or(z.literal("")),
  sharePercentage: z.string()
    .min(1, "Share percentage is required")
    .refine(
      (val) => {
        const num = parseFloat(val);
        return !isNaN(num) && num >= 0 && num <= 100;
      },
      { message: "Must be a number between 0 and 100" }
    ),
});

const createDispenserWithNewOwnerSchema = z.object({
  ownerId: z.null(),
  ownerName: z.string().min(1, "Owner name is required for new owner"),
  ownerPhoneNumber: z.string().min(1, "Phone number is required for new owner"),
  location: z.string().min(1, "Location is required"),
  locationImgUrl: z.string().url("Must be a valid URL").or(z.literal("")),
  sharePercentage: z.string()
    .min(1, "Share percentage is required")
    .refine(
      (val) => {
        const num = parseFloat(val);
        return !isNaN(num) && num >= 0 && num <= 100;
      },
      { message: "Must be a number between 0 and 100" }
    ),
});

/**
 * Discriminated union for client-side validation
 * Enforces the business logic at the form level
 */
export const createDispenserPayloadSchema = z.discriminatedUnion("ownerId", [
  createDispenserWithExistingOwnerSchema,
  createDispenserWithNewOwnerSchema,
]);

export type CreateDispenserPayload = z.infer<typeof createDispenserPayloadSchema>;

/**
 * Form Data - UI component state (more lenient)
 */
export interface DispenserFormData {
  ownerId: string;
  ownerName: string;
  ownerPhoneNumber: string;
  location: string;
  locationImgUrl: string;
  sharePercentage: string;
}

/**
 * Create Owner Payload - used when creating new owner
 */
export interface CreateOwnerPayload {
  name: string;
  phoneNumber: string;
}