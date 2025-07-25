import Link from "next/link";
import { JSX } from "react";

export default function LinkCard({ link, download, children }: { link: string, download: boolean, children: JSX.Element | JSX.Element[] }) {
    return (
        <Link href={link} target="_blank" {...(download ? {download} : {})}>
            <div className="flex justify-center items-center p-2 gap-2 rounded ring-1 ring-white h-full">
                {children}
            </div>
        </Link>
    );
}