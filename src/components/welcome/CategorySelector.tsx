import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import type { TriviaCategory } from '@/types/trivia';

interface CategorySelectorProps {
  categories: TriviaCategory[];
  value: string;
  onChange: (value: string) => void;
}

export function CategorySelector({ categories, value, onChange }: CategorySelectorProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="category" className="text-base font-semibold">
        Select Category
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id="category" className="w-full">
          <SelectValue placeholder="Choose a category" />
        </SelectTrigger>
        <SelectContent className="max-h-[300px]">
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.id.toString()}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

