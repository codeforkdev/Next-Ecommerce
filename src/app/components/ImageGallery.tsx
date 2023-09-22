"use client";
import Image from "next/image";
import { useState } from "react";
import { useImmer } from "use-immer";

export default function ImageGallery(props: { images: string[] }) {
  const [showcase, setShowcase] = useState(props.images[0]);
  const [others, setOthers] = useImmer(props.images.slice(1));

  const swap = (index: number, img: string) => {
    setOthers((draft) => {
      draft.splice(index, 1, showcase);
    });
    setShowcase(img);
  };
  return (
    <div>
      <div className="h-96 w-[400px] relative rounded overflow-clip mb-2">
        <Image src={showcase} alt="thing" fill />
      </div>
      <ul className="flex gap-2  w-[400px]">
        {others.map((imgSrc, index) => (
          <div
            key={imgSrc}
            onClick={() => swap(index, imgSrc)}
            className="h-32 flex-1 relative rounded overflow-clip cursor-pointer border-2 border-transparent  hover:border-indigo-500"
          >
            <Image src={imgSrc} alt="thing" fill />
          </div>
        ))}
      </ul>
    </div>
  );
}
