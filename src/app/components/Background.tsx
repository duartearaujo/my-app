
export default function Background() {
    return (
        <div className="absolute w-full h-full overflow-hidden">
            <div className="circle relative rounded-full w-64 h-64 bg-indigo-600 blur-xl opacity-1/2 left-2/3 top-10 animate-moveCirclesX"/>
            <div className="circle relative rounded-full w-64 h-64 bg-indigo-600 blur-xl opacity-1/2 left-1/6 top-10 animate-moveCircles"/>
            <div className="circle relative rounded-full w-64 h-64 bg-indigo-600 blur-xl opacity-1/2 left-2/3 top-30 animate-moveCircles"/>
            <div className="circle relative rounded-full w-64 h-64 bg-indigo-600 blur-xl opacity-1/2 left-1/4 top-10 animate-moveCirclesX"/>
		</div>
    );
}