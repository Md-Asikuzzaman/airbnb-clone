"use client";

import { NextPage } from "next";
import { Map, Marker, Point, ZoomControl } from "pigeon-maps";
import { FaMapMarkerAlt } from "react-icons/fa";

interface Props {
  latlng?: number[];
}

const MyMap: NextPage<Props> = ({ latlng }) => {
  return (
    <Map defaultCenter={(latlng as Point) ?? [24, 90]} defaultZoom={6}>
      <Marker width={50} anchor={(latlng as Point) ?? [24, 90]}>
        <FaMapMarkerAlt size={32} className="text-rose-500" />
      </Marker>
      <ZoomControl />
    </Map>
  );
};

export default MyMap;
