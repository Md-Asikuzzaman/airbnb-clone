"use client";

import { NextPage } from "next";
import Container from "../Container";
import { categories } from "@/lib/categories";
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";

interface Props {}

const Categories: NextPage<Props> = ({}) => {
  const params = useSearchParams();
  const category = params.get("category");
  const pathname = usePathname();

  const isMainPage = pathname === "/";

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div className="pt-4 flex items-center justify-between overflow-x-auto">
        {categories.map((item) => (
          <div key={item.label}>
            <CategoryBox
              key={item.label}
              label={item.label}
              selected={category === item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Categories;
