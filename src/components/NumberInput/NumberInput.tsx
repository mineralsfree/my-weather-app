import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";

interface FormInputProps {
  name: string;
  control: any;
  label: string;
  validate?: (num: string) => boolean | string;
  className: string;
}
export const FormInputText = ({
  name,
  control,
  label,
  validate,
  className,
}: FormInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ validate: validate ? validate : () => true }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          className={className}
          helperText={error ? error.message : " "}
          size="small"
          variant="outlined"
          error={!!error}
          onChange={onChange}
          value={value}
          label={label}
        />
      )}
    />
  );
};
