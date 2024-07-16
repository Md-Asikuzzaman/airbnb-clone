import getCurrentUser from "@/actions/getCurrentUser";
import EmptyState from "@/app/components/EmptyState";
import TripsClient from "./TripsClient";

const Page = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  return <TripsClient userId={currentUser.id} />;
};

export default Page;
