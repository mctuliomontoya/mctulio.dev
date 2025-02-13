import Image from "next/image";
import ExpoGoLogo from "./ExpoGo.svg";

export default function ExpoGo() {
    return (
      <Image src={ExpoGoLogo} alt="Machine Learning" className="size-4" />
    )
}