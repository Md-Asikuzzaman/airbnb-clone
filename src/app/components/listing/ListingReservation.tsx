"use client";

import { NextPage } from "next";
import { Range } from "react-date-range";
import Calender from "../inputs/Calender";
import Button from "../Button";

interface Props {
  price: number;
  totalPrice: number | undefined;
  dateRange: Range;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates?: Date[];
  isPending: boolean;
}

const ListingReservation: NextPage<Props> = ({
  price,
  dateRange,
  disabledDates,
  onChangeDate,
  totalPrice,
  onSubmit,
  isPending,
  disabled,
}) => {
  console.log(disabled);

  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
      <div className="flex flex-row items-center gap-1 p-4">
        <div className="text-2xl font-semibold">$ {price}</div>
        <div className="font-light text-neutral-600">night</div>
      </div>
      <hr />

      <Calender
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <hr />

      <div className="p-4">
        <Button
          isPending={isPending}
          label="Reserve"
          disabled={disabled}
          onClick={onSubmit}
        />
      </div>

      <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
        <div>Total</div>
        <div>$ {totalPrice?.toFixed(2)}</div>
      </div>
    </div>
  );
};

export default ListingReservation;
