import { ActionState, FieldErrors } from "@/lib/create-safe-action";
import { useCallback, useState } from "react";

type Action<TInput, TOutput> = (
  data: TInput,
) => Promise<ActionState<TInput, TOutput>>;

interface ServerRequestActionOptions<TOutput> {
  onSuccess?: (data: TOutput) => void;
  onError?: (error: string) => void;
  onCompleted?: () => void;
}

export const useServerRequestAction = <TInput, TOutput>(
  action: Action<TInput, TOutput>,
  options: ServerRequestActionOptions<TOutput> = {},
) => {
  const [fieldErrors, setFieldErrors] =
    useState<FieldErrors<TInput | undefined>>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [data, setData] = useState<TOutput | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const execute = useCallback(
    async (input: TInput) => {
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
    [action, options],
  );

  return { fieldErrors, error, data, loading, execute };
};
