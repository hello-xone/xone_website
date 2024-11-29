import { UseToastOptions, createStandaloneToast } from '@chakra-ui/react';

const { ToastContainer, toast } = createStandaloneToast({
  defaultOptions: {
    position: 'bottom'
  }
});

type TData = UseToastOptions | string | null | undefined | Error | any;

const showToast = (data: TData, status?: string) => {
  if (!data) return;
  let op: UseToastOptions = data as UseToastOptions;

  const description =
    (typeof data !== 'object'
      ? data?.toString()
      : (data as any)?.shortMessage?.toString() ||
        (data as any)?.details?.toString() ||
        (data as any)?.message?.toString() ||
        (data as any)?.msg?.toString() ||
        data?.toString()) || 'Network error';

  if (!op.description) {
    op = {
      status: (status || op?.status || 'info') as any,
      description: description
    };
  }

  return toast(op);
};

const Toast = (data: TData) => {
  return showToast(data);
};

Toast.success = (data: TData) => {
  return showToast(data, 'success');
};
Toast.info = (data: TData) => {
  return showToast(data, 'info');
};
Toast.loading = (data: TData) => {
  return showToast(data, 'loading');
};
Toast.warning = (data: TData) => {
  return showToast(data, 'warning');
};
Toast.error = (data: TData) => {
  return showToast(data, 'error');
};
export { Toast, ToastContainer };
