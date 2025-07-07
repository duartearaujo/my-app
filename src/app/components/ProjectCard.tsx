export default function ProjectCard({ children }: { children?: any }) {
    return (
        <div className="project-card group relative flex flex-col rounded-lg justify-center items-center font-sans font-semibold bg-violet-950/60 backdrop-blur-md w-full h-full p-5 gap-5 fade">
            {children}
        </div>
    );
}