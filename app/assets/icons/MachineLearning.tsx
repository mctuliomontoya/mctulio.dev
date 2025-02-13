import Image from "next/image";
import MachineLearningLogo from "./MachineLearning.svg";

export default function MachineLearning() {
    return (
        <Image src={MachineLearningLogo} alt="Machine Learning" className="size-4" />
    )
}