'use client';

import { cva, VariantProps } from 'class-variance-authority';
import { FieldInputProps, FieldMetaProps } from 'formik';
import { Eye, EyeOff } from 'lucide-react';
import { ComponentPropsWithRef, useState } from 'react';

import { cn } from '@/lib/utils';

import InputError from '@/components/gen-input/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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

type GenInputProps = React.InputHTMLAttributes<HTMLInputElement> &
  ComponentPropsWithRef<'input'> &
  VariantProps<typeof inputVariants> &
  Partial<FieldInputProps<string>> &
  Partial<FieldMetaProps<string>> & {
    error?: string;
    label?: React.ReactNode;
    labelClassName?: string;
    containerClassName?: string;
  };

const GenInput = ({
  className,
  error,
  label,
  touched,
  labelClassName,
  containerClassName,
  variant,
  size_variant,
  type,
  initialValue,
  ref,
  ...rest
}: GenInputProps) => {
  delete rest.initialError;
  delete rest.initialTouched;
  delete rest.value;

  const [hidden, setHidden] = useState<boolean>(true);

  const toggleVisibility = (): void => {
    setHidden((prevState) => !prevState);
  };

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
      <div className='w-full relative mt-2'>
        <Input
          type={type === 'password' ? (hidden ? 'password' : 'text') : type}
          className={cn(inputVariants({ variant, size_variant, className }))}
          defaultValue={initialValue}
          ref={ref}
          {...rest}
        />
        {type === 'password' && (
          <button
            type='button'
            onClick={toggleVisibility}
            className='absolute top-1/2 -translate-y-1/2 right-4 text-ring select-none text-base font-medium'
          >
            {hidden ? <Eye /> : <EyeOff />}
          </button>
        )}
      </div>

      <InputError isError={!!touched && !!error} error={error} />
    </div>
  );
};

export default GenInput;
