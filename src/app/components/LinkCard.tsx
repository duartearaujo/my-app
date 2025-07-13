import Link from "next/link";
import { JSX } from "react";

export default function LinkCard({ link, children }: { link: string, children: JSX.Element | JSX.Element[] }) {
    return (
        <Link href={link}>
            <div className="flex justify-center items-center w-auto h-auto p-2 gap-2 rounded ring-1 ring-white">
                {children}
            </div>
        </Link>
    );
}