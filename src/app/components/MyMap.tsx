"use client";

import { NextPage } from "next";
import { Map, Marker, Point } from "pigeon-maps";

interface Props {
  center?: number[];
}

const MyMap: NextPage<Props> = ({ center }) => {
  return (
    <Map defaultCenter={(center as Point) ?? [24, 90]} defaultZoom={6}>
      <Marker width={50} anchor={(center as Point) ?? [24, 90]} />
    </Map>
  );
};

export default MyMap;
