/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { toast } from 'sonner';
import { useDebouncedCallback } from 'use-debounce';
import { object, string } from 'yup';

import GenInput from '@/components/gen-input/gen-input';
import InputNumber from '@/components/gen-input/input-number';
import GenSelect from '@/components/gen-select/gen-select';
import NavigationHeader from '@/components/navigation-header';
import { Button } from '@/components/ui/button';

import {
  useGetBanksQuery,
  useVerifyBankAccountMutation,
  useWithdrawMutation,
} from '@/actions/bank/bank-api.action';
import { handleErrors } from '@/utils/error';
import { removeNonDigit } from '@/utils/format';

const WithdrawBankPage = () => {
  const router = useRouter();
  const { data: banks, isLoading: isLoadingBanks } = useGetBanksQuery();

  const [verifyAccount, { isLoading: isLoadingVerifyAccount }] =
    useVerifyBankAccountMutation();
  const [withdraw, { isLoading: isLoadingWithdraw }] = useWithdrawMutation();

  const bankOptions =
    banks?.data.map((bank) => ({
      label: bank.name,
      value: bank.code,
    })) || [];

  const formik = useFormik({
    initialValues: {
      accountNumber: '',
      bankCode: '',
      amount: '',
      accountName: '',
    },
    enableReinitialize: true,
    validationSchema: object().shape({
      accountNumber: string()
        .min(10, 'Enter a valid account number')
        .max(10, 'Enter a valid account number')
        .required('Account number is required'),
      bankCode: string().required('Kindly select a bank'),
      amount: string().required('Amount is required'),
      accountName: string().required('Account not verified'),
    }),
    onSubmit: async (values) => {
      try {
        const formattedAmount = parseFloat(removeNonDigit(values.amount));
        await withdraw({
          accountNumber: values.accountNumber,
          bankCode: values.bankCode,
          amount: formattedAmount,
        }).unwrap();
        router.push('/');
        toast.success('Withdrawal Initiated');
      } catch (err) {
        handleErrors(err);
      }
    },
  });

  function getInputProps(name: keyof typeof formik.values) {
    return {
      ...formik.getFieldProps(name),
      ...formik.getFieldMeta(name),
    };
  }

  function getSelectProps(name: keyof typeof formik.values) {
    return {
      ...formik.getFieldProps(name),
      ...formik.getFieldMeta(name),
      ...formik.getFieldHelpers(name),
    };
  }

  const handleVerifyAccount = useDebouncedCallback(async () => {
    try {
      const res = await verifyAccount({
        accountNumber: formik.values.accountNumber,
        bankCode: formik.values.bankCode,
      }).unwrap();
      formik.setFieldValue('accountName', res.data.accountName);
    } catch (err) {
      handleErrors(err);
    }
  }, 300);

  useEffect(() => {
    if (formik.values.accountNumber.length === 10 && formik.values.bankCode) {
      handleVerifyAccount();
    } else {
      formik.setFieldValue('accountName', '');
    }
  }, [formik.values.accountNumber, formik.values.bankCode]);

  return (
    <div>
      <NavigationHeader
        handleBack={() => router.back()}
        header='Withdraw to Bank'
      />

      <div className='p-5'>
        <p className='text-black/70'>Withdraw to your local bank account</p>

        <form className='mt-4 space-y-2'>
          <GenInput
            label='Account Number'
            id='accountNumber'
            {...getInputProps('accountNumber')}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const value = removeNonDigit(e.target.value);
              formik.setFieldValue('accountNumber', value);
            }}
            value={removeNonDigit(formik.values.accountNumber)}
          />

          <GenSelect
            id='bankCode'
            options={bankOptions}
            label='Bank'
            isLoading={isLoadingBanks}
            {...getSelectProps('bankCode')}
          />

          <GenInput
            id='accountName'
            disabled
            label='Account Name'
            {...getInputProps('accountName')}
          />

          <InputNumber
            id='amount'
            label='Amount (₦)'
            {...getSelectProps('amount')}
          />

          <Button
            type='submit'
            disabled={isLoadingVerifyAccount}
            isLoading={isLoadingWithdraw}
          >
            Withdraw
          </Button>
        </form>
      </div>
    </div>
  );
};

export default WithdrawBankPage;
