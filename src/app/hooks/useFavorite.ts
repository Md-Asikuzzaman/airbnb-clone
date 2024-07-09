import { useRouter } from "next/navigation";
import useLoginModal from "./useLoginModal";
import { useCallback, useMemo } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface Props {
  listingId: string;
  currentUser: any;
}

const useFavorite = ({ listingId, currentUser }: Props) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const hasFavorited = useMemo(() => {
    const list = currentUser.favoriteIds || [];

    return list.includes(listingId);
  }, [currentUser, listingId]);
    
    
    console.log(currentUser)

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      try {
        let request;

        if (hasFavorited) {
          request = () => axios.delete(`/api/favorites/${listingId}`);
        } else {
          request = () => axios.post(`/api/favorites/${listingId}`);
        }

        await request();
        router.refresh();

        toast.success("Added to favorites.");
      } catch (err) {
        console.log(err);
      }
    },
    [currentUser, hasFavorited, loginModal, listingId, router]
  );

  return {
    hasFavorited,
    toggleFavorite,
  };
};

export default useFavorite;
