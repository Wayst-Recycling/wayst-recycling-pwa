import { cva, VariantProps } from 'class-variance-authority';
import { FieldHelperProps, FieldMetaProps } from 'formik';
import { forwardRef } from 'react';
import CurrencyInput from 'react-currency-input-field';

import { cn } from '@/lib/utils';

import InputError from '@/components/gen-input/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type InputNumberProps = React.InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof inputVariants> &
  Partial<FieldHelperProps<unknown>> &
  Partial<FieldMetaProps<string>> & {
    error?: string;
    label?: React.ReactNode;
    labelClassName?: string;
    containerClassName?: string;
  };

const inputVariants = cva(
  cn(
    'flex w-full rounded- border',
    'focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 focus:shadow-none',
    'focus-visible:ring-brand-primary focus-visible:ring-offset-brand-primary focus:outline-none focus-visible:ring',
  ),
  {
    variants: {
      variant: {
        primary: cn(
          'border bg-input-bg border-input-border/70 placeholder:text-sm placeholder:font-normal placeholder:text-ring rounded-xl',
        ),
      },

      size_variant: {
        sm: 'px-2 py-1 text-base',
        base: 'px-4 py-6 text-base',
      },
    },

    defaultVariants: {
      variant: 'primary',
      size_variant: 'base',
    },
  },
);

const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(
  (
    {
      className,
      error,
      label,
      touched,
      labelClassName,
      containerClassName,
      variant,
      size_variant,
      initialValue,
      ...rest
    },
    ref,
  ) => {
    delete rest.initialError;
    delete rest.initialTouched;
    delete rest.value;
    return (
      <div
        className={cn(
          'flex flex-col gap-1 items-start w-full',
          containerClassName,
        )}
      >
        {rest.id && label && (
          <Label
            htmlFor={rest.id}
            className={cn('font-normal text-sm', labelClassName)}
          >
            {label}
          </Label>
        )}

        <CurrencyInput
          id={rest.id}
          name={rest.name}
          placeholder={rest.placeholder}
          decimalsLimit={2}
          onValueChange={(value) => {
            if (rest.setValue) rest.setValue(value, true);
          }}
          onBlur={() => {
            if (rest.setTouched) {
              rest.setTouched(true, true);
            }
          }}
          onFocus={() => {
            if (rest.setTouched) {
              rest.setTouched(true, true);
            }
          }}
          allowNegativeValue={false}
          inputMode='numeric'
          customInput={Input}
          ref={ref}
          defaultValue={initialValue}
          className={cn(inputVariants({ variant, size_variant, className }))}
        />

        <InputError isError={!!touched && !!error} error={error} />
      </div>
    );
  },
);

export default InputNumber;
