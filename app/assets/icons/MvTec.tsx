import MvTecLogo from "./MVTec logo.svg";
import Image from "next/image";

export default function MvTec() {
    return (
        <div >
            <Image className="h-4 p-0 w-6" src={MvTecLogo} alt="MvTec Logo" />
        </div>
    )
}