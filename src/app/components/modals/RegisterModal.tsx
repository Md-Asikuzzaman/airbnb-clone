"use client";

import axios from "axios";
import toast from "react-hot-toast";

import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useRegisterModal from "@/app/hooks/useRegisterModal";

import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

import Heading from "../Heading";
import Modal from "./Modal";
import Input from "../inputs/LoginInput";
import Button from "../Button";
import registerSchema from "@/schema/registerSchema";
import { signIn } from "next-auth/react";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useCallback } from "react";
import RegisterInput from "../inputs/RegisterInput";

const RegisterModal = () => {
  type FormData = z.infer<typeof registerSchema>;

  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const toogle = useCallback(() => {
    loginModal.onOpen();
    registerModal.onClose();
  }, [loginModal, registerModal]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { mutate, isPending, isSuccess, data } = useMutation({
    mutationKey: ["register"],
    mutationFn: async (formData: FormData) => {
      const { data } = await axios.post("/api/register", formData, {
        baseURL: process.env.NEXTAUTH_URL,
      });

      return data;
    },

    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
    
    onSuccess: () => {
      toast.success("User Created Successfully");
      toogle();
    },
  });

  const onSubmit = (formData: FormData) => {
    mutate(formData);
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnb" subtitle="Create an account" />
      <RegisterInput
        id="email"
        label="Email"
        disabled={isPending}
        register={register}
        errors={errors}
        required
      />
      <RegisterInput
        id="name"
        label="Name"
        disabled={isPending}
        register={register}
        errors={errors}
        required
      />
      <RegisterInput
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
          <div>Already have an account?</div>
          <div
            onClick={toogle}
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
        isOpen={registerModal.isOpen}
        title="Register"
        actionLabel="Continue"
        onClose={registerModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
      />
    </div>
  );
};

export default RegisterModal;
