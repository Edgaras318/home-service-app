import { FaScrewdriverWrench, FaTruck, FaBrush, FaBucket, FaLightbulb } from "react-icons/fa6";
import { PiPipeFill } from "react-icons/pi";

export const categories = [
    {
        id: 1,
        icon: () => <FaBucket fontSize={40} />, // Changed to a function
        title: "Cleaning",
        color: "#b12fde",
    },
    {
        id: 2,
        icon: () => <FaScrewdriverWrench fontSize={40} />,
        title: "Repair",
        color: "#ecbb3a",
    },
    {
        id: 3,
        icon: () => <FaBrush fontSize={40} />,
        title: "Painting",
        color: "#ea9319",
    },
    {
        id: 4,
        icon: () => <FaTruck fontSize={40} />,
        title: "Shifting",
        color: "#059e96",
    },
    {
        id: 5,
        icon: () => <PiPipeFill fontSize={40} />,
        title: "Plumbing",
        color: "#e23e40",
    },
    {
        id: 6,
        icon: () => <FaLightbulb fontSize={40} />,
        title: "Electric",
        color: "#1f71c5",
    },
];
