// import { MutableRefObject, useEffect, useRef, useState } from "react";
// import InlineError from "@/components/InlineError";

// type test = {
//   id?: string;
//   name?: string;
//   message: string;
// };

// type use_error = (
//   state?: Array<any>
// ) => [React.FC<{ name: string }>, React.Dispatch<React.SetStateAction<test>>];

// const useError: use_error = (paramater = []) => {
//   const [state, setState] = useState<test>({ message: "" });
//   const myRef = useRef() as MutableRefObject<HTMLDivElement>;

//   const Component: React.FC<{ name: string }> = (props) => {
//     if (state.name === props.name)
//       return (
//         <div ref={myRef}>
//           <InlineError message={state.message} />
//         </div>
//       );
//   };

//   useEffect(() => {
//     setState({ message: "" });
//   }, paramater);

//   useEffect(() => {
//     if (state.message) {
//       myRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
//     }
//   }, [state]);

//   return [Component, setState];
// };

// export default useError;
