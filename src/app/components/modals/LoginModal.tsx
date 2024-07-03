"use client";

import axios from "axios";
import toast from "react-hot-toast";

import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import useLoginModal from "@/app/hooks/useLoginModal";

import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

import Heading from "../Heading";
import Modal from "./Modal";
import Input from "../inputs/Input";
import Button from "../Button";
import loginSchema from "@/schema/LoginSchema";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginModal = () => {
  const [isPending, setInPending] = useState<boolean>(false);
  const router = useRouter();

  type FormData = z.infer<typeof loginSchema>;

  const loginModal = useLoginModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (formData: FormData) => {
    // mutate(formData);

    console.log(formData);

    signIn("credentials", {
      ...formData,
      redirect: false,
    })
      .then((callback) => {
        setInPending(true);
        if (callback?.ok) {
          toast.success("Logged in");
          router.refresh();
          loginModal.onClose();
        }

        if (callback?.error) {
          toast.error(callback.error);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setInPending(false);
      });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Login to your account" />
      <Input
        id="email"
        label="Email"
        disabled={isPending}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isPending}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        label="Continue with Google"
        outline
        icon={FcGoogle}
        onClick={() => {}}
      />
      <Button
        label="Continue with Github"
        outline
        icon={AiFillGithub}
        onClick={() => {}}
      />
      <div
        className="
        text-neutral-500
        text-center
        mt-4
        font-light
      "
      >
        <div className="flex flex-row items-center justify-center gap-2">
          <div>Already have an account?</div>
          <div
            onClick={() => {}}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            Log in
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <Modal
        disabled={isPending}
        isOpen={loginModal.isOpen}
        title="Register"
        actionLabel="Continue"
        onClose={loginModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
      />
    </div>
  );
};

export default LoginModal;