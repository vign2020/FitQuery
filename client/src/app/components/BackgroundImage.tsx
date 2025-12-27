import React from "react";
import Image from "next/image";
import gym_image_two from "../../../public/gym-image-two.jpg";

export default function BackgroundImage() {
  return (
    <Image
      alt={"gym image"}
      src={gym_image_two}
      placeholder="blur"
      fill
      sizes="100vw"
      quality={100}
      style={{
        objectFit: "cover",
      }}
      className={"BackgroundImage"}
    />
  );
}
