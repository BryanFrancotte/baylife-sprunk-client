"use client"

import { CreateOwnerPayload, Owner, OwnerUpdateFormData, ownerUpdateSchema } from "@/lib/types/dispensers";
import { useState } from "react";
import { TableCell, TableRow } from "../ui/table";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Check, Loader2, X } from "lucide-react";

interface OwnerEditRowProps{
  owner: Owner;
  isUpdating: boolean;
  onUpdate: (id: string, data: CreateOwnerPayload) => Promise<void>;
  onCancel: () => void;
}

export function OwnerEditRow({
  owner,
  isUpdating,
  onUpdate,
  onCancel
}: OwnerEditRowProps) {
  const [formData, setFormData] = useState<OwnerUpdateFormData>({
    name: owner.name || "",
    phoneNumber: owner.phoneNumber || ""
  });
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSaveChanges = (field: keyof OwnerUpdateFormData, value: string) => {
    setFormData((prev) => ({...prev, [field]: value}));
    if(errors[field]) {
      setErrors((prev) => {
        const newErrors = {...prev};
        delete newErrors[field];
        return newErrors;
      })
    }
  }

  const validateForm = (): CreateOwnerPayload | null => {
    const payload = {
      name: formData.name,
      phoneNumber: formData.phoneNumber
    }

    const result = ownerUpdateSchema.safeParse(payload);

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
    const validatedForm = validateForm();

    if (!validatedForm) return;
    
    setIsSaving(true);
    try {
      await onUpdate(owner.id, validatedForm);
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

  if(!isUpdating && !owner) return null

  return (
    <TableRow className="bg-blue-50/50">
      {/* name - Editable */}
      <TableCell>
        <div className="space-y-1">
          <Input
            value={formData.name}
            onChange={(e) => handleSaveChanges("name", e.target.value)}
            placeholder="Localisation *"
            disabled={isSaving}
            className={errors.location ? "border-destructive" : ""}
          />
          {errors.location && (
            <p className="text-xs text-destructive">{errors.location}</p>
          )}
        </div>
      </TableCell>

      {/* phoneNumber - Editable */}
      <TableCell>
        <div className="space-y-1">
          <Input
            value={formData.phoneNumber}
            onChange={(e) => handleSaveChanges("phoneNumber", e.target.value)}
            placeholder="Localisation *"
            disabled={isSaving}
            className={errors.location ? "border-destructive" : ""}
          />
          {errors.location && (
            <p className="text-xs text-destructive">{errors.location}</p>
          )}
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