"use client";
import SectionWrapper from "@/shared/components/shared/SectionWrapper";
import { Button } from "@/shared/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { getErrorMessage } from "@/shared/utils/get-error-message";
import FormError from "@/shared/components/shared/FormError";
import { Activity, useState, type ReactEventHandler } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { stkPushSchema } from "../stkPush.schema";
import { RequestStatus } from "../components/RequestStatus";
import { StkFormData } from "../stkPush.schema";
import { toast } from "sonner";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";
import type { StatusType } from "../StatusTypes";

type TransactionType = "stkPush" | "paybill" | "till";

const StkPushSection = () => {
  const [transactionType, setTransactionType] = useState<TransactionType>("stkPush");
  const [status, setStatus] = useState<StatusType>("idle");
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StkFormData>({
    resolver: zodResolver(stkPushSchema),
  });

  const handleStkPush = async (data: StkFormData) => {
    setStatus("pending");
    setMessage("Sending stk push request");

    const payload: any = {
      transactionType,
      phone: data.phone,
      amount: data.amount,
      paybillNumber: data.paybillNumber ? Number(data.paybillNumber) : undefined,
      tillNumber: data.tillNumber ? Number(data.tillNumber) : undefined,
      accountNumber: data.accountNumber,
    };

    if (transactionType === "paybill") {
      payload.shortcode = data.paybillNumber;
      payload.accountReference = data.accountNumber;
    }

    if (transactionType === "till") {
      payload.shortcode = data.tillNumber;
    }

    try {
      const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
      console.log({
        BASE_URL,
        url: `${BASE_URL}/api/transactions`,
      });
      const res = await fetch(`${BASE_URL}/api/transactions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
      }
      const data = await res.json();
      const checkoutRequestID = data.checkoutRequestId;

      if (!checkoutRequestID) {
        throw new Error("Missing checkoutRequestId");
      }

      setMessage("Awaiting confirmation...");
      const waitingTimeout = setTimeout(() => {
        setMessage("Still waiting...Please complete payment n your phone.");
      }, 10000);

      const unsub = onSnapshot(doc(db, "transactions", checkoutRequestID), (snap) => {
        const tx = snap.data();
        console.log("🔥 SNAPSHOT FIRED");
        console.log("exists:", snap.exists());
        console.log("data:", snap.data());
        if (!tx) return;

        if (tx.status === "success") {
          clearTimeout(waitingTimeout);
          setStatus("success");
          setMessage(" Payment successful!");
          unsub();
        } else if (tx.status === "failed") {
          clearTimeout(waitingTimeout);
          setStatus("failed");
          setMessage(` ${tx.resultDesc || "Transaction failed"}`);
          unsub();
        } else {
          setStatus("pending");
        }
      });
    } catch (error: any) {
      console.error("Fetch error:", error);

      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage("Unknown error");
      }

      setStatus("pending");
    }
    // finally {
    //   setLoading(false);
    // }
  };

  return (
    <SectionWrapper className="flex flex-col md:flex-row justify-between  ">
      <div className="flex flex-col justify-start rounded-xl border bg-card p-6 shadow-sm">
        <h1>Initiate STK Push</h1>
        <p>Send an STK Push request to collect payment from a customer</p>

        <div className="flex gap-2 my-4">
          {["stkPush", "paybill", "till"].map((type) => (
            <Button
              key={type}
              type="button"
              onClick={() => setTransactionType(type as TransactionType)}
              className={` ${transactionType === type ? "bg-white border text-primary" : "bg-primary"}`}
            >
              {type}
            </Button>
          ))}
        </div>

        <form onSubmit={handleSubmit(handleStkPush)} className="max-w-full">
          <FieldSet>
            {/* <Activity mode={error ? "visible" : "hidden"}>
              <FormError>{getErrorMessage(error)}</FormError>
            </Activity> */}
            <FieldGroup className="gap-3">
              <Field>
                <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
                <Input id="phone" type="tel" placeholder="0700000000" {...register("phone", { required: true })} />
                {errors.phone && <FieldError>{errors.phone.message}</FieldError>}
              </Field>
              <Field>
                <FieldLabel htmlFor="amount">Amount</FieldLabel>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  {...register("amount", { required: true })}
                />
                {errors.amount && <FieldError>{errors.amount.message}</FieldError>}
              </Field>
              {/* <Field>
                <FieldLabel htmlFor="reference">Reference ID</FieldLabel>
                <Input
                  id="reference"
                  type="reference"
                  placeholder="Reference Id"
                  {...register("reference", { required: true })}
                />
                {errors.reference && <FieldError>{errors.reference.message}</FieldError>}
              </Field> */}

              {transactionType === "paybill" && (
                <>
                  <Field>
                    <FieldLabel htmlFor="paybill">Paybill Number</FieldLabel>
                    <Input
                      id="paybill"
                      type="number"
                      placeholder="Enter paybill number"
                      {...register("paybillNumber", { required: true })}
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="accountNumber">Account Number</FieldLabel>
                    <Input
                      id="accountNumber"
                      type="text"
                      placeholder="Enter account number"
                      {...register("accountNumber", { required: true })}
                    />
                  </Field>
                </>
              )}

              {transactionType === "till" && (
                <Field>
                  <FieldLabel htmlFor="till">Till Number</FieldLabel>
                  <Input
                    id="till"
                    type="number"
                    placeholder="Enter till number"
                    {...register("tillNumber", { required: true })}
                  />
                </Field>
              )}
            </FieldGroup>

            <Button type="submit">Send Prompt</Button>
          </FieldSet>
          {message && <div className="text-sm p-3 rounded bg-gray-100">{message}</div>}
        </form>
      </div>
      <RequestStatus status={status} />
    </SectionWrapper>
  );
};
export default StkPushSection;
