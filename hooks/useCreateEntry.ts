import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEntry, type CreateEntryPayload, type CreateEntryResponse } from '@/lib/api';

export function useCreateEntry() {
  const queryClient = useQueryClient();
  return useMutation<CreateEntryResponse, Error, CreateEntryPayload>({
    mutationFn: async (payload: CreateEntryPayload) => {
      return createEntry(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['entries'] });
    },
  });
}


