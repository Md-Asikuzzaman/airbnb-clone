import { NextPage } from 'next';

interface Props {}

const Page: NextPage<Props> = async ({}) => {
  const res = await fetch('/api/users');
  const users = res.json();

  return <div>{JSON.stringify(users)}</div>;
};

export default Page;
