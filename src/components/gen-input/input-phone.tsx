import { FieldHelperProps, FieldMetaProps } from 'formik';
import { CheckIcon, ChevronsUpDown } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import * as React from 'react';
import * as RPNInput from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags';

import { cn } from '@/lib/utils';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';

type InputPhoneProps = Omit<
  React.ComponentProps<'input'>,
  'onChange' | 'value' | 'ref'
> &
  Omit<RPNInput.Props<typeof RPNInput.default>, 'onChange'> &
  FieldMetaProps<string> &
  FieldHelperProps<unknown> & {
    onChange?: (value: RPNInput.Value) => void;
    label?: string;
    labelClassName?: string;
    containerClassName?: string;
  };

const InputPhone: React.ForwardRefExoticComponent<InputPhoneProps> =
  React.forwardRef<React.ElementRef<typeof RPNInput.default>, InputPhoneProps>(
    (
      {
        className,
        onChange,
        setValue,
        setError: _setError,
        setTouched,
        touched,
        error,
        label,
        labelClassName,
        id,
        containerClassName,
        initialTouched: _initialTouched,

        ...props
      },
      ref,
    ) => {
      delete props.initialError;

      delete props.initialValue;

      function handleBlur() {
        setTouched(true);
      }
      return (
        <div
          className={cn(
            'flex flex-col gap-2 items-start w-full',
            containerClassName,
          )}
        >
          {label && id && (
            <Label
              htmlFor={id}
              className={cn('font-normal text-sm', labelClassName)}
            >
              {label}
            </Label>
          )}
          <RPNInput.default
            ref={ref}
            defaultCountry='NG'
            // countries={['NG', 'GH', 'ZA']}
            className={cn(
              'flex w-full',
              'focus-within:ring focus-within:ring-offset-2 focus-within:ring-brand-primary rounded-xl',
              'border border-input-border/70',
              'bg-white',
              // [touched && !error && props.value && 'border-primary'],
              className,
            )}
            flagComponent={FlagComponent}
            countrySelectComponent={CountrySelect}
            inputComponent={InputComponent}
            smartCaret={false}
            withCountryCallingCode
            international={true}
            countryCallingCodeEditable={false}
            /**
             * Handles the onChange event.
             *
             * react-phone-number-input might trigger the onChange event as undefined
             * when a valid phone number is not entered. To prevent this,
             * the value is coerced to an empty string.
             *
             * @param {E164Number | undefined} value - The entered value
             */
            onChange={(value) => {
              onChange?.(value || ('' as RPNInput.Value));

              setValue?.(value || ('' as RPNInput.Value), true);
            }}
            onBlur={handleBlur}
            onFocus={handleBlur}
            {...props}
          />

          {touched && error && (
            <AnimatePresence>
              {touched && error && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                  transition={{ ease: 'easeOut', duration: 0.5 }}
                  className='text-xs font-semibold text-red-500'
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      );
    },
  );
InputPhone.displayName = 'InputPhone';

const InputComponent = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<'input'>
>(({ className, ...props }, ref) => (
  <input
    className={cn(
      'w-full',
      'border-0 focus:outline-none focus:shadow-none focus-visible:outline-none focus:ring-0',
      'rounded-e-[16px] rounded-s-none py-3 pr-4',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'bg-transparent text-sm',
      className,
    )}
    {...props}
    ref={ref}
  />
));
InputComponent.displayName = 'InputComponent';

type CountryEntry = { label: string; value: RPNInput.Country | undefined };

type CountrySelectProps = {
  disabled?: boolean;
  value: RPNInput.Country;
  options: CountryEntry[];
  onChange: (country: RPNInput.Country) => void;
};

const CountrySelect = ({
  disabled,
  value: selectedCountry,
  options: countryList,
  onChange,
}: CountrySelectProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type='button'
          // variant='outline'
          className={cn(
            'flex gap-1 rounded-e-none rounded-s-[16px] items-center px-3 py-4 focus:z-10',
            'border-0 focus:outline-none focus:shadow-none focus-visible:outline-none focus:ring-0',
            'focus:bg-primary/5',
            'pl-4',
          )}
          disabled={disabled}
        >
          <FlagComponent
            country={selectedCountry}
            countryName={selectedCountry}
          />
          <ChevronsUpDown
            className={cn(
              '-mr-2 size-4 opacity-50',
              disabled ? 'hidden' : 'opacity-100',
            )}
          />
        </button>
      </PopoverTrigger>
      <PopoverContent align='start' className='w-[300px] p-0 bg-white'>
        <Command>
          <CommandList>
            <ScrollArea className='h-max max-h-72 overflow-y-auto'>
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup>
                {countryList.map(({ value, label }) =>
                  value ? (
                    <CountrySelectOption
                      key={value}
                      country={value}
                      countryName={label}
                      selectedCountry={selectedCountry}
                      onChange={onChange}
                    />
                  ) : null,
                )}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

interface CountrySelectOptionProps extends RPNInput.FlagProps {
  selectedCountry: RPNInput.Country;
  onChange: (country: RPNInput.Country) => void;
}

const CountrySelectOption = ({
  country,
  countryName,
  selectedCountry,
  onChange,
}: CountrySelectOptionProps) => {
  return (
    <CommandItem className='gap-2' onSelect={() => onChange(country)}>
      <FlagComponent country={country} countryName={countryName} />
      <span className='flex-1 text-sm'>{countryName}</span>
      <span className='text-sm text-foreground/50'>{`+${RPNInput.getCountryCallingCode(
        country,
      )}`}</span>
      <CheckIcon
        className={`ml-auto size-4 ${
          country === selectedCountry ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </CommandItem>
  );
};

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
  const Flag = flags[country];

  return (
    <span className='flex h-4 w-6 overflow-hidden rounded-sm bg-foreground/20'>
      {Flag && <Flag title={countryName} />}
    </span>
  );
};

export { InputPhone };
