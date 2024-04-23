import { ActionState, FieldErrors } from "@/lib/create-safe-action";
import { useCallback, useState } from "react";

type Action<T, O> = (data: T) => Promise<ActionState<T, O>>;

interface ServerRequestActionOptions<O> {
  onSuccess?: (data: O) => void;
  onError?: (error: string) => void;
  onCompleted?: () => void;
}

export const useServerRequestAction = <T, O>(
  action: Action<T, O>,
  options: ServerRequestActionOptions<O> = {}
) => {
  const [fieldErrors, setFieldErrors] =
    useState<FieldErrors<T | undefined>>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [data, setData] = useState<O | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const execute = useCallback(
    async (input: T) => {
      setLoading(true);

      try {
        const result = await action(input);

        if (!result) return;

        if (result.fieldErrors) {
          setFieldErrors(result.fieldErrors);
        }

        if (result.error) {
          setError(result.error);
        }

        if (result.data) {
          setData(result.data);
          options.onSuccess?.(result.data);
        }
      } finally {
        setLoading(false);
        options.onCompleted?.();
      }
    },
    [action, options]
  );

  return { fieldErrors, error, data, loading, execute };
};
