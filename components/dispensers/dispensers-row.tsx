"use client"

import { CreateDispenserPayload, createDispenserPayloadSchema, Dispenser, DispenserFormData, Owner } from "@/lib/types/dispensers"
import { useState } from "react";
import { TableCell, TableRow } from "../ui/table";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Check, ImageUp, Loader2, X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface DispenserRowProps {
  dispenser?: Dispenser;
  owners: Owner[];
  isCreating?: boolean;
  onSave: (data: CreateDispenserPayload) => Promise<void>;
  onCancel: () => void;
}

/**
 * Dispenser row component with Zod validation
 * 
 * Uses discriminated union schema to validate:
 * - Existing owner: ownerId required, name/phone must be empty
 * - New owner: ownerId null, name/phone required
 */
export function DispenserRow({
  dispenser,
  owners,
  isCreating = false,
  onSave,
  onCancel,
}: DispenserRowProps) {
  const [formData, setFormData] = useState<DispenserFormData>({
    ownerId: "",
    ownerName: "",
    ownerPhoneNumber: "",
    location: "",
    locationImgUrl: "",
    sharePercentage: 40,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({})

  const isCreatingNewOwner = formData.ownerId === "new";

  const handleChange = (field: keyof DispenserFormData, value: string) => {
    setFormData((prev) => ({...prev, [field]: value}));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };
  
  const handleOwnerChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      ownerId: value,
      // clear owner name/phone when switching to existing owner
      ownerName: value === "new" ? prev.ownerName : "",
      ownerPhoneNumber: value === "new" ? prev.ownerPhoneNumber : "",
    }));
    if (errors.ownerId || errors.ownerName || errors.ownerPhoneNumber) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.ownerId;
        delete newErrors.ownerName;
        delete newErrors.ownerPhoneNumber;
        return newErrors;
      });
    }
  };

  const validateForm = (): CreateDispenserPayload | null => {
    let payload: unknown;

    if(isCreatingNewOwner) {
      payload = {
        ownerId: "",
        ownerName: formData.ownerName,
        ownerPhoneNumber: formData.ownerPhoneNumber,
        location: formData.location,
        locationImgUrl: formData.locationImgUrl,
        sharePercentage: formData.sharePercentage,
      };
    } else {
      payload = {
        ownerId: formData.ownerId,
        ownerName: "",
        ownerPhoneNumber: "",
        location: formData.location,
        locationImgUrl: formData.locationImgUrl,
        sharePercentage: formData.sharePercentage,
      };
    }

    const result = createDispenserPayloadSchema.safeParse(payload);

    if (!result.success) {
      const zodErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path.join(".");
        console.log("validation output: " + issue.input + "|" + issue.code + "|" + issue.message)
        zodErrors[path] = issue.message;
      });
      setErrors(zodErrors);
      return null;
    }

    return result.data;
  };

  const handleSave = async () => {
    const validateData = validateForm();
    console.log("test validation: " + validateData)
    if (!validateData) return;

    setIsSaving(true);
    try {
      await onSave(validateData);
    } catch(error) {
      console.log("Error saving dispenser: ", error);
      setErrors((prev) => ({
        ...prev,
        _form: error instanceof Error ? error.message : "Failed to save dispenser!"
      }));
    } finally {
      setIsSaving(false);
    }
  };

  if (dispenser && !isCreating) {
    return null;
  }

  return (
    <TableRow className="bg-muted/50">
      {/* Location */}
      <TableCell>
        <div className="space-y-1">
          <Input
            value={formData.location}
            onChange={(e) => handleChange("location", e.target.value)}
            placeholder="Localisation *"
            disabled={isSaving}
            className={errors.location ? "border-destructive" : ""}
          />
          {errors.location && (
            <p className="text-xs text-destructive">{errors.location}</p>
          )}
        </div>
      </TableCell>

      {/* Owner Name Column */}
      <TableCell>
        <div className="space-y-2">
          <Select
            value={formData.ownerId}
            onValueChange={handleOwnerChange}
            disabled={isSaving}
          >
            <SelectTrigger className={errors.ownerId ? "border-destructive" : ""}>
              <SelectValue placeholder="Sélectionner propriétaire" />
            </SelectTrigger>
            <SelectContent>
              {owners.map((owner) => (
                <SelectItem key={owner.id} value={owner.id}>
                  {owner.name}
                </SelectItem>
              ))}
              <SelectItem value="new" className="text-primary font-medium">
                + Créer nouveau propriétaire
              </SelectItem>
            </SelectContent>
          </Select>
          
          {/* Show name input when creating new owner */}
          {isCreatingNewOwner && (
            <div className="space-y-1">
              <Input
                value={formData.ownerName}
                onChange={(e) => handleChange("ownerName", e.target.value)}
                placeholder="Nom du propriétaire *"
                disabled={isSaving}
                className={errors.ownerName ? "border-destructive" : ""}
              />
              {errors.ownerName && (
                <p className="text-xs text-destructive">{errors.ownerName}</p>
              )}
            </div>
          )}
          
          {errors.ownerId && (
            <p className="text-xs text-destructive">{errors.ownerId}</p>
          )}
        </div>
      </TableCell>

      {/* Owner Phone Column */}
      <TableCell>
        {isCreatingNewOwner ? (
          <div className="space-y-1">
            <Input
              value={formData.ownerPhoneNumber}
              onChange={(e) => handleChange("ownerPhoneNumber", e.target.value)}
              placeholder="Numéro de téléphone *"
              disabled={isSaving}
              className={errors.ownerPhoneNumber ? "border-destructive" : ""}
            />
            {errors.ownerPhoneNumber && (
              <p className="text-xs text-destructive">{errors.ownerPhoneNumber}</p>
            )}
          </div>
        ) : (
          <div className="text-sm text-muted-foreground">
            {formData.ownerId && formData.ownerId !== "new"
              ? owners.find((o) => o.id === formData.ownerId)?.phoneNumber || "—"
              : "—"}
          </div>
        )}
      </TableCell>

      {/* Share Percentage */}
      <TableCell>
        <div className="space-y-1">
          <Input
            type="number"
            value={formData.sharePercentage}
            onChange={(e) => handleChange("sharePercentage", e.target.value)}
            placeholder="0-100 *"
            min="0"
            max="100"
            step="0.01"
            disabled={isSaving}
            className={errors.sharePercentage ? "border-destructive" : ""}
          />
          {errors.sharePercentage && (
            <p className="text-xs text-destructive">{errors.sharePercentage}</p>
          )}
        </div>
      </TableCell>

      {/* Collected Amount - N/A for new dispensers */}
      <TableCell>
        <span className="text-sm text-muted-foreground">0 €</span>
      </TableCell>

      {/* Upload Location Image: Should open a modal for upload */}
      <TableCell>
        <div className="space-y-1">
          <Button variant="outline" size="sm">
            <ImageUp />
            Upload Location
          </Button>
        </div>
      </TableCell>

      {/* Actions */}
      <TableCell>
        <div className="space-y-2">
          <div className="flex gap-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={handleSave}
              disabled={isSaving}
              className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50"
              title="Sauvegarder"
            >
              {isSaving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Check className="h-4 w-4" />
              )}
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={onCancel}
              disabled={isSaving}
              className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
              title="Annuler"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
}
