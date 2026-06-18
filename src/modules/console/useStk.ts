"use client";
import { useMutation } from "@tanstack/react-query";
import { stk } from "./stk.api";
import { toast } from "sonner";
import { getErrorMessage } from "@/shared/utils/get-error-message";
import { authBreadcrumbs } from "@/shared/lib/sentry/sentry-breadcrumbs";
import type { StkInput } from "./stk.schema";

export const useStk = () => {
  return useMutation({
    mutationFn: (data: StkInput) => stk(data),
    onMutate: () => {
      authBreadcrumbs("Login attempt started");
    },
    onSuccess: (data) => {
      authBreadcrumbs("Login successful", {
        endpoint: data.endpoint,
        phone: data.phone,
        amount: data.amount,
        reference: data.reference,
      });
      //   setSession(data.user, data.accessToken);
      //   toast.success("Login successfull");
    },
    onError: (error) => {
      authBreadcrumbs("Login failed", {
        error: String(error),
      });
      toast.error(getErrorMessage(error));
    },
  });
};
