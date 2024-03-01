"use client";

import { useLoginMutation } from "#/services";
import { LoginRequestSchema, LoginRequestType } from "#/schemas";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import NextLink from "next/link";
import { EnvelopeIcon, KeyIcon } from "@heroicons/react/24/outline";

export default function LoginPage() {
  const [login, { isLoading }] = useLoginMutation();

  const { control, handleSubmit } = useForm<LoginRequestType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginRequestSchema),
  });

  return (
    <form onSubmit={handleSubmit(login)} className="flex flex-col gap-1.5">
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
        Login
      </Button>
      <Button as={NextLink} href="/register" type="button" variant="light" color="primary">
        Create a new account
      </Button>
    </form>
  );
}
