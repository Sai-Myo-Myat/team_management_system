import { ChangeEvent, useCallback } from "react";
import { Input } from "./ui/input";

interface Props extends Omit<React.ComponentProps<"input">, "onChange"> {
  onChange: (value: number) => void;
}

const NumberInput = ({ className, type, value, onChange, ...props }: Props) => {
  const onChangeX = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange(Number(event.target.value));
    },
    [onChange]
  );
  return (
    <Input
      type={type}
      value={value || ""}
      onChange={onChangeX}
      className={className}
      {...props}
    />
  );
};

export default NumberInput;
