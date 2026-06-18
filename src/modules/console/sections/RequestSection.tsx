// import { FieldGroup, FieldSet, Field, FieldLabel, FieldError } from "@/shared/components/ui/field";
// import { useForm } from "react-hook-form";
// import { Input } from "@/shared/components/ui/input";
// import { Button } from "@/shared/components/ui/button";

// type FormValues = {
//   transactionType: string;
//   phone: string;
//   amount: number;
// };

// const RequestSection = () => {
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm<FormValues>();

//   const handleRequest = async (data: FormValues) => {
//     try {
//       const token = await auth.currentUser?.getIdToken();

//       if (!token) {
//         throw new Error("Please login first");
//       }

//       const response = await fetch("/api/transactions", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           transactionType: "stkPush",
//           phone: data.phone,
//           amount: Number(data.amount),
//         }),
//       });

//       const result = await response.json();

//       console.log("STK Response:", result);

//       reset();
//     } catch (err) {
//       console.error("STK Request Error:", err);
//     }
//   };
//   return (
//     <div>
//       <h2>Request</h2>
//       <form onSubmit={handleSubmit(handleRequest)} className="w-full max-w-82 mx-auto">
//         <FieldSet className="gap-6">
//           {/* <FieldLegend className="mx-auto mb-8">
//             <PageHeading>Login</PageHeading>
//           </FieldLegend>
//           <Activity mode={error ? "visible" : "hidden"}>
//             <FormError>{getErrorMessage(error)}</FormError>
//           </Activity> */}
//           <FieldGroup className="gap-3">
//             <Field>
//               <FieldLabel htmlFor="transactionType">Endpoint</FieldLabel>
//               <Input
//                 id="transactionType"
//                 type="transactionType"
//                 placeholder="STK Push"
//                 {...register("transactionType", { required: true })}
//               />
//               {errors.transactionType && <FieldError>{errors.transactionType.message}</FieldError>}
//             </Field>
//             <Field>
//               <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
//               <Input id="phone" type="phone" placeholder="0700000000" {...register("phone", { required: true })} />
//               {errors.phone && <FieldError>{errors.phone.message}</FieldError>}
//             </Field>

//             <Field>
//               <FieldLabel htmlFor="amount">Amount (in Kshs)</FieldLabel>
//               <Input id="amount" type="amount" placeholder="Enter amount" {...register("amount", { required: true })} />
//               {errors.amount && <FieldError>{errors.amount.message}</FieldError>}
//             </Field>
//           </FieldGroup>

//           <Button type="submit">
//             Send Request
//             {/* {isPending ? "Sending Request..." : "Send Request"} */}
//           </Button>
//         </FieldSet>
//       </form>
//     </div>
//   );
// };
// export default RequestSection;
