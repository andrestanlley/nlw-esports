import { Check } from 'phosphor-react';
import * as CB from '@radix-ui/react-checkbox';

interface setChecked {
  setState: Function;
}

export default function Checkbox({ setState }: setChecked) {
  return (
    <CB.Root
      className="w-6 h-6 p-1 rounded bg-zinc-900"
      onCheckedChange={(checked) => {
        if (checked) return setState(true);
        if (!checked) return setState(false);
      }}
    >
      <CB.CheckboxIndicator>
        <Check className="w-4 h-4 text-emerald-400" />
      </CB.CheckboxIndicator>
    </CB.Root>
  );
}
