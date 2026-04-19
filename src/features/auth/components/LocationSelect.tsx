import { useState } from "react";
import { Check, ChevronsUpDown, X, AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

import { useLocations } from "../queries/useLocations";
import type { Location } from "../types/auth.types";
import { cn } from "@/lib/utils";

interface Props {
  value: string[]; // selected location IDs
  onChange: (value: string[]) => void;
  disabled?: boolean;
}

export const LocationSelect = ({ value, onChange, disabled }: Props) => {
  const [open, setOpen] = useState(false);
  const { data: locations, isPending, isError } = useLocations();

  const toggleLocation = (id: string) => {
    onChange(value.includes(id) ? value.filter((v) => v !== id) : [...value, id]);
  };

  const selectedLocations: Location[] = locations?.filter((loc) => value.includes(loc.id)) ?? [];

  const emptyMessage = () => {
    if (isPending) return "Loading locations...";
    if (isError) return "Failed to load locations.";
    return "No location found.";
  };

  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            disabled={disabled || isPending}
            className="h-11 w-full justify-between"
          >
            <span className="truncate">
              {selectedLocations.length > 0
                ? `${selectedLocations.length} location${selectedLocations.length > 1 ? "s" : ""} selected`
                : "Select preferred locations"}
            </span>
            <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
          <Command>
            <CommandInput placeholder="Search locations..." />
            <CommandList>
              {/* Error state */}
              {isError && (
                <div className="text-destructive flex items-center gap-2 px-3 py-4 text-sm">
                  <AlertCircle className="size-4 shrink-0" />
                  <span>Failed to load locations. Please try again.</span>
                </div>
              )}

              {/* Empty / loading state — only shown when list is empty */}
              {!isError && <CommandEmpty>{emptyMessage()}</CommandEmpty>}

              {/* Location list */}
              {!isError && (
                <CommandGroup>
                  {locations?.map((location) => {
                    const isSelected = value.includes(location.id);

                    return (
                      <CommandItem
                        key={location.id}
                        value={location.name} // used by Command's internal search filter
                        onSelect={() => toggleLocation(location.id)}
                      >
                        <Check
                          className={cn("mr-2 size-4", isSelected ? "opacity-100" : "opacity-0")}
                        />
                        {location.name}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Selected badges */}
      {selectedLocations.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedLocations.map((location) => (
            <Badge key={location.id} variant="secondary" className="gap-1 pr-1">
              {location.name}
              <button
                type="button"
                onClick={() => toggleLocation(location.id)}
                disabled={disabled}
                aria-label={`Remove ${location.name}`}
                className="ring-offset-background focus:ring-ring ml-1 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none"
              >
                <X className="size-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};
