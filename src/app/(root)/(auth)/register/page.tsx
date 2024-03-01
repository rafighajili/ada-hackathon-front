"use client";

import { Button, Input } from "@nextui-org/react";
import NextLink from "next/link";
import { RegisterRequestSchema, RegisterRequestType } from "#/schemas";
import { useRegisterMutation } from "#/services";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DevicePhoneMobileIcon, EnvelopeIcon, KeyIcon } from "@heroicons/react/24/outline";

export default function RegisterPage() {
  const [registerOrganizer, { isLoading }] = useRegisterMutation();

  const { control, handleSubmit } = useForm<RegisterRequestType>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
    },
    resolver: zodResolver(RegisterRequestSchema),
  });

  return (
    <form onSubmit={handleSubmit(registerOrganizer)} className="flex flex-col gap-1.5">
      <Controller
        control={control}
        name="firstName"
        render={({ field, fieldState: { invalid, error } }) => (
          <Input label="Your name" {...field} isInvalid={invalid} errorMessage={error?.message} />
        )}
      />
      <Controller
        control={control}
        name="lastName"
        render={({ field, fieldState: { invalid, error } }) => (
          <Input label="Your surname" {...field} isInvalid={invalid} errorMessage={error?.message} />
        )}
      />
      <Controller
        control={control}
        name="email"
        render={({ field, fieldState: { invalid, error } }) => (
          <Input
            label="Your email"
            endContent={<EnvelopeIcon className="h-6 w-6 text-default-500" />}
            {...field}
            isInvalid={invalid}
            errorMessage={error?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="phoneNumber"
        render={({ field, fieldState: { invalid, error } }) => (
          <Input
            label="Your phone number"
            startContent={<span className="text-sm text-default-500">+944</span>}
            endContent={<DevicePhoneMobileIcon className="h-6 w-6 text-default-500" />}
            {...field}
            isInvalid={invalid}
            errorMessage={error?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field, fieldState: { invalid, error } }) => (
          <Input
            label="Your password"
            type="password"
            endContent={<KeyIcon className="h-6 w-6 text-default-500" />}
            {...field}
            isInvalid={invalid}
            errorMessage={error?.message}
          />
        )}
      />

      <Button color="primary" type="submit" isLoading={isLoading}>
        Register
      </Button>
      <Button as={NextLink} href="/login" type="button" variant="light" color="primary">
        Login to your account
      </Button>
    </form>
  );
}
