import * as SL from "@radix-ui/react-select";
import { ReactHTMLElement } from "react";

interface SelectProps
  extends ReactHTMLElement<HTMLSelectElement | HTMLInputElement> {
  placeholder: string;
  items: string[];
}

interface Props {
  data: SelectProps;
}

export default function Select({ data, ...rest }: Props) {
  return (
    <SL.Root {...rest}>
      <SL.SelectTrigger
        aria-label="Selecione o que deseja jogar."
        className="bg-zinc-900 flex items-center py-3 px-4 rounded text-sm text-zinc-500"
      >
        <SL.Value placeholder={data.placeholder} />
      </SL.SelectTrigger>
      <SL.Content className="fixed bg-[#2A2634] p-6 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480] shadow-lg shadow-black/25">
        <SL.ScrollUpButton></SL.ScrollUpButton>
        <SL.Viewport>
          {data.items.map((item, index) => (
            <SL.Item key={index} value={item} className=" hover:cursor-pointer">
              <SL.ItemText>{item}</SL.ItemText>
            </SL.Item>
          ))}
        </SL.Viewport>
      </SL.Content>
    </SL.Root>
  );
}
