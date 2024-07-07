"use client";

import toast from "react-hot-toast";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import useLoginModal from "@/app/hooks/useLoginModal";

import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

import Heading from "../Heading";
import Modal from "./Modal";
import Button from "../Button";
import loginSchema from "@/schema/loginSchema";
import { useCallback, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import LoginInput from "../inputs/LoginInput";

const LoginModal = () => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const router = useRouter();

  type FormData = z.infer<typeof loginSchema>;

  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (formData: FormData) => {
    setIsPending(true);
    await signIn("credentials", {
      ...formData,
      redirect: false,
    }).then(({ ok, error }: any) => {
      if (ok) {
        toast.success("Logged in");
        router.refresh();
        loginModal.onClose();
        setIsPending(false);
        reset();
      } else {
        toast.error(error);
        setIsPending(false);
      }
    });
  };

  console.log(isPending);

  const toogle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Login to your account" />
      <LoginInput
        id="email"
        label="Email"
        disabled={isPending}
        register={register}
        errors={errors}
        required
      />
      <LoginInput
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
        onClick={() => signIn("google")}
      />
      <Button
        label="Continue with Github"
        outline
        icon={AiFillGithub}
        onClick={() => signIn("github")}
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
          <div>First time using Airbnb?</div>
          <div
            onClick={toogle}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            Create an Account
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <Modal
        isPending={isPending}
        disabled={isPending}
        isOpen={loginModal.isOpen}
        title="Login"
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
