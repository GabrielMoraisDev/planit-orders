"use client";
import Select from 'react-select';
import { categorias } from '@/app/data/mock';

type CategorySelectProps = {
  value?: string;
  onChange: (v?: string) => void;
};

export default function CategorySelect({ value, onChange }: CategorySelectProps) {
  return (
    <div className="min-w-[220px]">
      <Select
        instanceId="category-select"
        placeholder="Filtrar por categoria"
        isClearable
        options={categorias}
        value={value ? categorias.find(c => c.value === value) : null}
        onChange={(opt) => onChange(opt?.value)}
        styles={{
          control: (base) => ({ ...base, borderColor: '#D4D4D8', boxShadow: 'none' }),
        }}
      />
    </div>
  );
}
