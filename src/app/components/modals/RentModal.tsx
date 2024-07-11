"use client";

import { useMemo, useState } from "react";
import Modal from "./Modal";
import useRentModal from "@/app/hooks/useRentModal";
import Heading from "../Heading";
import { categories } from "@/lib/categories";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CountrySelect from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import RentInput from "../inputs/RentInput";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Listing } from "@prisma/client";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const rentModal = useRentModal();
  const [step, setStep] = useState<number>(STEPS.CATEGORY);
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      description: "",
      category: "",
      price: "1",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
    },
  });

  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");

  const MyMap = useMemo(
    () =>
      dynamic(() => import("../MyMap"), {
        ssr: false,
      }),
    [location]
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }
    mutate(data);
  };

  const { mutate, isPending } = useMutation({
    mutationKey: ["create_listing"],
    mutationFn: async (formData: FieldValues) => {
      await axios.post("/api/listing", formData, {
        baseURL: process.env.NEXTAUTH_URL,
      });
    },

    onError: (error: any) => {
      toast.error(error.response.data.message);
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["fetch_listings"],
        type: "active",
        exact: true,
      });
      toast.success("Listing Created");
      rentModal.onClose();
    },

    // Optimistically update
    // onMutate: async (newProject: FieldValues) => {
    //   // Cancel any outgoing refetches
    //   await queryClient.cancelQueries({ queryKey: ["fetch_listings"] });

    //   // Snapshot the previous value
    //   const previousMessages = queryClient.getQueryData(["fetch_listings"]);

    //   const {
    //     title,
    //     description,
    //     category,
    //     location,
    //     guestCount,
    //     roomCount,
    //     bathroomCount,
    //     imageSrc,
    //     price,
    //   } = newProject;

    //   // Optimistically update to the new value
    //   queryClient.setQueryData(["fetch_listings"], (old: Listing[]) => [
    //     ...old,
    //     {
    //       title,
    //       description,
    //       category,
    //       locationValue: location?.value,
    //       guestCount,
    //       roomCount,
    //       bathroomCount,
    //       imageSrc,
    //       price: parseInt(price, 10),
    //       userId: Math.random(),
    //     },
    //   ]);

    //   // Return a context object with the snapshotted value
    //   return { previousMessages };
    // },

    onSettled: () => {
      reset();
      setStep(STEPS.CATEGORY);
    },
  });

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }

    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of those best describes your place?"
        subtitle="Pick a category"
      />

      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-2
        gap-3
        max-h-[50vh]
        overflow-y-auto
      "
      >
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => setCustomValue("category", category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  // ALL STEPS
  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where your place located?"
          subtitle="Help guest find you!"
        />
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue("location", value)}
        />
        <div className="h-[35vh] rounded-lg bg-slate-300 overflow-hidden">
          <MyMap latlng={location?.latlng} />
        </div>
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some basics about your place"
          subtitle="What amenities do you have?"
        />

        <Counter
          title="Guests"
          subtitle="How many guests do you allow?"
          value={guestCount}
          onChange={(value) => setCustomValue("guestCount", value)}
        />
        <hr />
        <Counter
          title="Rooms"
          subtitle="How many rooms do you have?"
          value={roomCount}
          onChange={(value) => setCustomValue("roomCount", value)}
        />
        <hr />
        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms do you have?"
          value={bathroomCount}
          onChange={(value) => setCustomValue("bathroomCount", value)}
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add a photo of your place"
          subtitle="Show guests what your place looks like!"
        />

        <ImageUpload
          value={imageSrc}
          onChange={(value) => setCustomValue("imageSrc", value)}
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="How would you describe your place?"
          subtitle="Short and sweet works best!"
        />

        <RentInput
          id="title"
          label="Title"
          disabled={isPending}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <RentInput
          id="description"
          label="Description"
          disabled={isPending}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Now, set your price"
          subtitle="How much do you charge per night?"
        />
        <RentInput
          type="number"
          id="price"
          label="Price"
          disabled={isPending}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  return (
    <Modal
      disabled={isPending}
      isPending={isPending}
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      title="Airbnb your home!"
      body={bodyContent}
    />
  );
};

export default RentModal;
