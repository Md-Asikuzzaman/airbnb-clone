"use client";

import { NextPage } from "next";
import Container from "../Container";
import { categories } from "@/lib/categories";
import CategoryBox from "../CategoryBox";

interface Props {}

const Categories: NextPage<Props> = ({}) => {
  return (
    <Container>
      <div className="pt-4 flex items-center justify-between overflow-x-auto">
        {categories.map((item) => (
          <div key={item.label}>
            <CategoryBox
              key={item.label}
              label={item.label}
              description={item.description}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Categories;
