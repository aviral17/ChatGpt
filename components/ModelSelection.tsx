// "use client";

// // using react select for drop down ------->  https://react-select.com/home,  ---->  npm i --save react-select

// // SWR is a strategy to first return the data from cache (stale), then send the fetch request (revalidate), and finally come with the up-to-date data.
// // https://swr.vercel.app/   ---->  npm i swr    ----- Even if we request the data from somewhere else
// // For more,  check Notes.txt
// import useSWR from "swr";
// import Select from "react-select";

// const fetchModels = () => fetch("/api/getEngines").then((res) => res.json());

// function ModelSelection() {
//   const { data: models, isLoading } = useSWR("models", fetchModels); // models key we named, can be any key name
//   const { data: model, mutate: setModel } = useSWR("model", {
//     fallbackData: "text-davinci-003",
//   });
//   return (
//     <div className="mt-2">
//       <Select
//         className="mt-2"
//         options={models?.modelOptions}
//         defaultValue={model}
//         placeholder={model}
//         isSearchable
//         isLoading={isLoading}
//         menuPosition="fixed"
//         classNames={{
//           control: (state) => "bg-[#434654] border-[#434654]",
//         }}
//         onChange={(e) => setModel(e.value)}
//       />
//     </div>
//   );
// }

// export default ModelSelection;
