// import { ChangeEvent, useRef } from "react";
// import dynamic from "next/dynamic";
// import Image from "next/image";

// const CameraAlt = dynamic(() => import("@mui/icons-material/CameraAlt"));
// const Close = dynamic(() => import("@mui/icons-material/Close"));

// interface Props {
//     image?: string;
//     type?: "text" | "password" | "email" | "datetime-local" | "tel" | "textarea" | "file";
//     value: string;
//     placeholder?: string;
//     onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
//     onRemove?: (e: ChangeEvent<HTMLButtonElement>) => void;
// }


// export default function ImageUpload(props: Props) {
//     // ref for passing click to input file picker
//     const inputRef = useRef<HTMLInputElement>(null);

//     // handle image upload
//     const handleClick = () => {
//         inputRef.current?.click();
//     };

//     return (
//         <div onClick={handleClick}>
//             <button type="button" onClick={handleClick}>
//                 <Close fontSize="medium" />
//             </button>

//             <Image src={} alt={"logo"}/>
//             <input
//                 type={props.type || "text"}
//                 onChange={props.onChange}
//                 value={props.value}
//                 accept="image/png, image/jpeg"
//                 ref={inputRef}>
//             </input>
//         </div>
//     );
// }

