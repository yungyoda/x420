"use client";

import { useCallback, useState } from 'react';
import { healthCheck } from '@/lib/api';

export type HealthCheckState = {
  isChecking: boolean;
  status: number | null;
  ok: boolean | null;
  errorMessage: string | null;
};

export function useHealthCheck() {
  const [state, setState] = useState<HealthCheckState>({
    isChecking: false,
    status: null,
    ok: null,
    errorMessage: null,
  });

  const check = useCallback(async (endpoint: string) => {
    setState({ isChecking: true, status: null, ok: null, errorMessage: null });
    try {
      const res = await healthCheck(endpoint);
      setState({ isChecking: false, status: res.status, ok: res.ok, errorMessage: null });
      return res;
    } catch (err) {
      setState({ isChecking: false, status: null, ok: false, errorMessage: (err as Error).message });
      throw err;
    }
  }, []);

  return { ...state, check };
}


