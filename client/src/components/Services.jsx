import React from "react";

import { BsShieldFillCheck } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { RiHeart2Fill } from "react-icons/ri";

const ServiceCard = ({ color, title, subtitle, icon }) => (
  <div className="flex flex-row w-11/12 justify-start items-start white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl">
    <div
      className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}
    >
      {icon}
    </div>
    <div className="ml-5 flex flex-col flex-1">
      <h1 className="mt-2 text-white text-lg">{title}</h1>
      <p className="mt-2 text-white text-sm md:w-9/12">{subtitle}</p>
    </div>
  </div>
);

const dataCard = [
  {
    color: "bg-[#2952E3]",
    title: "Security Guaranted",
    subtitle:
      "Security is guaranted. We always maintain privacy and maintain the quality of our products.",
    icon: <BsShieldFillCheck fontSize={21} className="text-white" />,
  },
  {
    color: "bg-[#8945F8]",
    title: "Best exchange rates",
    subtitle:
      "Exchange is guaranted. We always maintain privacy and maintain the quality of our products.",
    icon: <BiSearchAlt fontSize={21} className="text-white" />,
  },
  {
    color: "bg-[#F84550]",
    title: "Fastest transactions",
    subtitle:
      "Transactions is guaranted. We always maintain privacy and maintain the quality of our products.",
    icon: <RiHeart2Fill fontSize={21} className="text-white" />,
  },
];

const Services = () => {
  return (
    <div className="flex flex-col md:flex-row w-full justify-center items-center">
      <div className="flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4">
        <div className="flex-1 flex flex-col justify-start items-start">
          <h1 className="text-white text-3xl sm:text-5xl py-2">
            Services that we
            <br />
            continue to improve
          </h1>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-start items-center">
        {dataCard.map((item, index) => (
          <ServiceCard
            key={item + index}
            color={item.color}
            title={item.title}
            icon={item.icon}
            subtitle={item.subtitle}
          />
        ))}
      </div>
    </div>
  );
};

export default Services;
