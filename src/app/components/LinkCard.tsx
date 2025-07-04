import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";

export default function LinkCard({ link, children }: { link: string, children: any }) {
    return (
        <Link href={link}>
            <div className="flex justify-center items-center w-auto h-auto p-2 gap-2 rounded ring-1 ring-white">
                {children}
            </div>
        </Link>
    );
}