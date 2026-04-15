import { useState } from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";

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
import { cn } from "@/lib/utils";

interface Props {
  value: string[]; // selected location IDs
  onChange: (value: string[]) => void;
  disabled?: boolean;
}

export const LocationSelect = ({ value, onChange, disabled }: Props) => {
  const [open, setOpen] = useState(false);
  const { data: locations, isLoading } = useLocations();

  const toggleLocation = (id: string) => {
    if (value.includes(id)) {
      onChange(value.filter((v) => v !== id));
    } else {
      onChange([...value, id]);
    }
  };

  const selectedLocations = locations?.filter((loc) => value.includes(loc.id)) || [];

  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            disabled={disabled}
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
              <CommandEmpty>{isLoading ? "Loading..." : "No location found."}</CommandEmpty>
              <CommandGroup>
                {locations?.map((location) => {
                  const isSelected = value.includes(location.id);

                  return (
                    <CommandItem
                      key={location.id}
                      value={location.name}
                      onSelect={() => toggleLocation(location.id)}
                    >
                      <Check
                        className={cn(
                          "mr-2 size-4",
                          isSelected ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {location.name}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Selected badges */}
      {selectedLocations.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedLocations.map((location) => (
            <Badge
              key={location.id}
              variant="secondary"
              className="gap-1 pr-1"
            >
              {location.name}
              <button
                type="button"
                onClick={() => toggleLocation(location.id)}
                disabled={disabled}
                className="ml-1 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
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