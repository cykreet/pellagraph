export const PellaView = ({ lines }: { lines?: string[] }) => {
	const displayedLines = lines?.[0] ? lines : ["pella output will be displayed here"];

	return (
		<div className="text-white z-10 fixed right-0 font-mono bottom-0 top-0 bg-zinc-900 py-4 border-zinc-600 border shadow-lg min-w-140 m-4 rounded-md overflow-y-auto">
			{displayedLines.map((line, index) => (
				<div
					className={`flex flex-row space-x-4 items-center px-4 ${index % 2 !== 0 && "bg-black/20"} align-middle`}
					key={index.toString()}
				>
					<span className="text-sm opacity-50 pointer-events-none select-none">{index + 1}</span>
					<span>{line}</span>
				</div>
			))}
		</div>
	);
};
