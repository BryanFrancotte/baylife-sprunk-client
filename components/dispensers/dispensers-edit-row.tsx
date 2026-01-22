"use client"

import { CreateDispenserPayload, Dispenser, UpdateDispenserFormData, updateDispenserSchema } from "@/lib/types/dispensers";
import { useState } from "react";
import { TableCell, TableRow } from "../ui/table";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Check, Loader2, X } from "lucide-react";

interface DispenserEditRowProps {
  dispenser: Dispenser;
  isUpdating: boolean;
  onUpdate: (id: string, data: Partial<CreateDispenserPayload>) => Promise<void>;
  onCancel: () => void;
}

export function DispenserEditRow({
  dispenser,
  isUpdating = false,
  onUpdate,
  onCancel
}: DispenserEditRowProps) {
  const [formData, setFormData] = useState<UpdateDispenserFormData>({
    location: dispenser.location || "",
    sharePercentage: dispenser.sharePercentage || 40
  });
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSaveChanges = (field: keyof UpdateDispenserFormData, value: string | number) => {
    setFormData((prev) => ({...prev, [field]: value}));
    if(errors[field]) {
      setErrors((prev) => {
        const newErrors = {...prev};
        delete newErrors[field];
        return newErrors;
      })
    }
  }

  const validateForm = (): Partial<CreateDispenserPayload> | null => {  
    const payload = {
      location: formData.location,
      sharePercentage: formData.sharePercentage
    }

    const result = updateDispenserSchema.safeParse(payload)

    if (!result.success) {
      const zodErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path.join(".");
        zodErrors[path] = issue.message;
      });
      setErrors(zodErrors);
      return null;
    }

    return result.data;
  }

  const handleSave = async () => {
    const validateData = validateForm();
    
    if(!validateData) return;

    setIsSaving(true);
    try {
      await onUpdate(dispenser.id, validateData);
    } catch (error) {
      console.log("Error updating dispenser: ", error);
      setErrors((prev) =>  ({
        ...prev,
        _form: error instanceof Error ? error.message : "Failed to update dispenser"
      }));
    } finally {
      setIsSaving(false);
    }
  }

  if(!isUpdating && !dispenser) return null

  const formattedAmount = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(dispenser.collectedAmount);

  return (
    <TableRow className="bg-blue-50/50">
      {/* Location - Editable */}
      <TableCell>
        <div className="space-y-1">
          <Input
            value={formData.location}
            onChange={(e) => handleSaveChanges("location", e.target.value)}
            placeholder="Localisation *"
            disabled={isSaving}
            className={errors.location ? "border-destructive" : ""}
          />
          {errors.location && (
            <p className="text-xs text-destructive">{errors.location}</p>
          )}
        </div>
      </TableCell>

      {/* Owner Name - Read-only */}
      <TableCell>
        <div className="text-sm text-muted-foreground">
          {dispenser.owner.name}
        </div>
      </TableCell>

      {/* Owner Phone - Read-only */}
      <TableCell>
        <div className="text-sm text-muted-foreground">
          {dispenser.owner.phoneNumber}
        </div>
      </TableCell>

      {/* Share Percentage - Editable */}
      <TableCell>
        <div className="space-y-1">
          <Input
            type="number"
            value={formData.sharePercentage}
            onChange={(e) => handleSaveChanges("sharePercentage", Number.parseInt(e.target.value))}
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

      {/* Collected Amount - Read-only */}
      <TableCell>
        <div className="text-sm font-medium text-muted-foreground">
          {formattedAmount}
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
          {errors._form && (
            <p className="text-xs text-destructive">{errors._form}</p>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
}