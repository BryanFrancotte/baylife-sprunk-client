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
  sharePercentage: z.number()
    .min(1, "Share percentage is required") // todo: this is creating issue 
    .refine(
      (val) => {
        return !isNaN(val) && val >= 0 && val <= 100;
      },
      { message: "Must be a number between 0 and 100" }
    ),
});

const createDispenserWithNewOwnerSchema = z.object({
  ownerId: z.literal("", "owner id must be empty for new owner"),
  ownerName: z.string().min(1, "Owner name is required for new owner"),
  ownerPhoneNumber: z.string().min(1, "Phone number is required for new owner"),
  location: z.string().min(1, "Location is required"),
  locationImgUrl: z.string().url("Must be a valid URL").or(z.literal("")),
  sharePercentage: z.number()
    .min(1, "Share percentage is required") // todo: this is creating issue 
    .refine(
      (val) => {
        return !isNaN(val) && val >= 0 && val <= 100;
      },
      { message: "Must be a number between 0 and 100" }
    ),
});

/**
 * Union for client-side validation.
 * We cannot use a discriminated union here because ownerId is not a literal.
 */
export const createDispenserPayloadSchema = z.union([
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
  sharePercentage: number;
}

/**
 * Create Owner Payload - used when creating new owner
 */
export interface CreateOwnerPayload {
  name: string;
  phoneNumber: string;
}

export interface OwnerUpdateFormData {
  name: string;
  phoneNumber: string;
}

export const ownerUpdateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phoneNumber: z.string().min(1, "Phone number is required")
})

export interface UpdateDispenserFormData {
  location: string;
  sharePercentage: number;
}

export const updateDispenserSchema = z.object({
  location: z.string().min(1, "Location is required"),
  sharePercentage: z.number()
});

export interface CollectDispenserFormData {
  collectedAmount: number;
}

export const collectDispenserSchema = z.object({
  collectedAmount: z.number().gt(0)
})

export type CollectDispenserPayload = z.infer<typeof collectDispenserSchema>;
