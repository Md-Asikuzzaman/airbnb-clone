import useCountries from "@/app/hooks/useCountries";
import { Listing, Reservation } from "@prisma/client";
import { NextPage } from "next";
import { useRouter } from "next/navigation";

interface Props {
  data: Listing;
  reservation?: Reservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser: any;
}

const ListingCard: NextPage<Props> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId,
  currentUser,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();
  const location = getByValue(data.locationValue);

  console.log(location);

  return <div>card</div>;
};

export default ListingCard;
