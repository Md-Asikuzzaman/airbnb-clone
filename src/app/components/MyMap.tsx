"use client";

import { NextPage } from "next";
import { Map, Marker, Point, ZoomControl } from "pigeon-maps";
import { FaMapMarkerAlt } from "react-icons/fa";

interface Props {
  center?: number[];
}

const MyMap: NextPage<Props> = ({ center }) => {
  return (
    <Map defaultCenter={(center as Point) ?? [24, 90]} defaultZoom={6}>
      <Marker width={50} anchor={(center as Point) ?? [24, 90]}>
        <FaMapMarkerAlt size={32} className="text-rose-500" />
      </Marker>
      <ZoomControl />
    </Map>
  );
};

export default MyMap;
