"use client";

import { NextPage } from "next";
import { TbPhotoPlus } from "react-icons/tb";

import { _64ify } from "next-file-64ify";
import { useState } from "react";
import Image from "next/image";

interface Props {
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload: NextPage<Props> = ({ value, onChange }) => {
  const [myFile, setMyFile] = useState<File | null>(null);

  const allowedTypes = ["image/jpeg", "image/png"];
  const allowedFileSize = { minSize: 0, maxSize: 1024 };

  if (myFile) {
    const base64 = async () => {
      const { data, isLoading, isError, isValidSize } = await _64ify(
        myFile,
        allowedTypes,
        allowedFileSize
      );

      data && onChange(data);
    };

    base64();
  }

  return (
    <label className="cursor-pointer" htmlFor="image">
      {value ? (
        <div className="p-20 relative h-[35vh] rounded-lg overflow-hidden">
          <Image src={value} fill alt="image" />
        </div>
      ) : (
        <>
          <div className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600">
            <TbPhotoPlus size={50} />
            <div className="font-semibold text-sm">Click to upload</div>
          </div>
        </>
      )}

      <input
        type="file"
        accept="image/jpeg, image/png"
        id="image"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          e.target.files && setMyFile(e.target.files[0])
        }
        hidden
      />
    </label>
  );
};

export default ImageUpload;
