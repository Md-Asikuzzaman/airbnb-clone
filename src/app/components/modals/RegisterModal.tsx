"use client";

import axios from "axios";
import toast from "react-hot-toast";

import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import signUpSchema from "@/schema/signUpSchema";
import useRegisterModal from "@/app/hooks/useRegisterModal";

import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

import Heading from "../Heading";
import Modal from "./Modal";
import Input from "../inputs/Input";
import Button from "../Button";

const RegisterModal = () => {
  type FormData = z.infer<typeof signUpSchema>;

  const registerModal = useRegisterModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { mutate, isPending, isSuccess } = useMutation({
    mutationKey: ["register"],
    mutationFn: async (formData: FormData) => {
      try {
        const { data } = await axios.post("/api/register", formData, {
          baseURL: process.env.NEXTAUTH_URL,
        });

        return data;
      } catch (error: any) {
        console.log(error);
        toast.error(error.message);
      }
    },
  });

  const onSubmit = (data: FormData) => {
    mutate(data);

    console.log(data);
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnb" subtitle="Create an account" />
      <Input
        id="email"
        label="Email"
        disabled={isPending}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="name"
        label="Name"
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
