"use client"

import { CollectDispenserFormData, CollectDispenserPayload, collectDispenserSchema, Dispenser } from "@/lib/types/dispensers";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { number } from "motion/react";
import { Button } from "../ui/button";
import { Save } from "lucide-react";

interface DispenserCollectDialogProps {
  children: React.ReactNode;
  dispenser: Dispenser;
  onSaveCollected: (id: string, data: CollectDispenserPayload) => Promise<void>;
}

export function DispenserCollectDialog({
  children,
  dispenser,
  onSaveCollected
}: DispenserCollectDialogProps) {
  const [formData, setFormData] = useState<CollectDispenserFormData>({
    collectedAmount: 0
  });
  const [isSaving, setIsSaving] = useState(false);
  const [open, setOpen] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSaveChanges = (field: keyof CollectDispenserFormData, value: number) => {
    setFormData((prev) => ({...prev, [field]: value}));
    if(errors[field]) {
      setErrors((prev) => {
        const newErrors = {...prev};
        delete newErrors[field];
        return newErrors;
      })
    }
  }

  const validateForm = (): CollectDispenserPayload | null => {
    const payload = {
      collectedAmount: formData.collectedAmount
    }

    const result = collectDispenserSchema.safeParse(payload);

    if(!result.success) {
      const zodErrors: Record<string,string> = {}
      result.error.issues.map((issue) => {
        const path = issue.path.join(".");
        zodErrors[path] = issue.message;
      })
      setErrors(zodErrors);
      return null;
    }

    return result.data
  }

  const handleSave = async () => {
    const validateData = validateForm();

    if (!validateData) return;
    
    setIsSaving(true)
    try {
      await onSaveCollected(dispenser.id, validateData);
      setOpen(false);
    } catch (error) {
      console.log("Error saving money collected for the dispenser");
      setErrors((prev) => ({
        ...prev,
        _form: error instanceof Error? error.message : "Failed to collect money from the dispenser"
      }));
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger 
        className="focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:text-destructive! [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 data-inset:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
      >
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Entré l&apos;argent récolté</DialogTitle>
          <DialogDescription>
            Récuperation de l&apos;argent pour le distributeur: {dispenser.location}
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <div className="grid flex-1 gap-2">
            <Input
              type="number"
              placeholder="5000"
              onChange={(e) => handleSaveChanges("collectedAmount", number.parse(e.target.value))}
              min="0"
              disabled={isSaving}
              className={errors.collectedAmount ? "border-destructive" : ""}
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <Button onClick={handleSave}>
            <Save />
            Enregistrer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}