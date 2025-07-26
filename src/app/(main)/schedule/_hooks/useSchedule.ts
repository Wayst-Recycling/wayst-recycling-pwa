import { useFormik } from 'formik';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { useScheduleMutation } from '@/actions/schedule/schedule-api.actions';
import {
  SCHEDULE_CATEGORY_KEY,
  SCHEDULE_CONTAINER_AMOUNT_KEY,
  SCHEDULE_MATERIAL_AMOUNT_KEY,
  scheduleInitialValues,
  scheduleValidationSchema,
} from '@/app/(main)/schedule/_utils/constants';
import { removeNonDigit } from '@/utils/format';
import { appRoutes } from '@/utils/routes';

export const useSchedule = () => {
  const [schedule, { isLoading }] = useScheduleMutation();

  const pathname = usePathname();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      ...scheduleInitialValues,
      [SCHEDULE_CATEGORY_KEY]:
        pathname === appRoutes.schedule.dropoff ? 'dropoff' : 'pickup',
    },
    validationSchema: scheduleValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
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
        await schedule(newValues).unwrap();
        formik.resetForm();
        toast.success('Schedule successful');
        router.push(appRoutes.home);
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

  function getSelectProps(id: keyof typeof formik.values) {
    return {
      ...formik.getFieldProps(id),
      ...formik.getFieldMeta(id),
      ...formik.getFieldHelpers(id),
    };
  }

  return { isLoading, getInputProps, getSelectProps, formik };
};
