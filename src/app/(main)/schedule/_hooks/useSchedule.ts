import { useFormik } from 'formik';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';

import { useScheduleMutation } from '@/actions/schedule/schedule-action.server';
import {
  SCHEDULE_CONTAINER_AMOUNT_KEY,
  SCHEDULE_MATERIAL_AMOUNT_KEY,
  scheduleInitialValues,
  scheduleValidationSchema,
} from '@/app/(main)/schedule/_utils/constants';
import { removeNonDigit } from '@/utils/format';
import { appRoutes } from '@/utils/routes';

export const useSchedule = () => {
  const [schedule, { isLoading }] = useScheduleMutation();

  const formik = useFormik({
    initialValues: scheduleInitialValues,
    validationSchema: scheduleValidationSchema,
    onSubmit: (values) => {
      const newValues = {
        ...values,
        [SCHEDULE_MATERIAL_AMOUNT_KEY]: Number(
          removeNonDigit(values[SCHEDULE_MATERIAL_AMOUNT_KEY]),
        ),
        [SCHEDULE_CONTAINER_AMOUNT_KEY]: Number(
          removeNonDigit(values[SCHEDULE_CONTAINER_AMOUNT_KEY]),
        ),
      };
      try {
        schedule(newValues).unwrap();
        formik.resetForm();
        toast.success('Schedule successful');
        redirect(appRoutes.home);
      } catch {
        toast.error('Something went wrong');
      }
    },
  });

  function getInputProps(id: keyof typeof formik.values) {
    return {
      ...formik.getFieldProps(id),
      ...formik.getFieldMeta(id),
    };
  }

  return { isLoading, getInputProps, formik };
};
