"use client";

import Modal from "./Modal";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";
import signUpSchema from "@/schema/signUpSchema";
import { zodResolver } from "@hookform/resolvers/zod";

const RegisterModal = () => {
  const registerModal = useRegisterModal();

  type FormData = z.infer<typeof signUpSchema>;

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
      } catch (error) {
        console.log(error);
      }
    },
  });

  const onSubmit = (data: FormData) => {
    mutate(data);
  };

  return (
    <div>
      <Modal
        disabled={isPending}
        isOpen={registerModal.isOpen}
        title="Register"
        actionLabel="Continue"
        onClose={registerModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
      />
    </div>
  );
};

export default RegisterModal;
