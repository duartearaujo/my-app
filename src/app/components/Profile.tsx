import Image from "next/image";

export default function Profile({ image }: { image: string }) {
    return (
        <div className="flex h-auto justify-center">
            <Image
                src={image}
                alt=""
                width={300}
                height={300}
                className="profile relative rounded-full ring-2 ring-purple-500 shadow-[0_0_10px_rgba(255,143,255)]"
            />
        </div>
    );
  }