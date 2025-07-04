import { motion, AnimatePresence } from "motion/react";
import Header from "./Header";

export default function Section({ children, selected, selection, id }: { children: any; selected?: string | null; selection: (id: string | null) => void; id?: string }) {
    return (
        <>
            <AnimatePresence>
                {selected === id ? (
                    <motion.section className="flex flex-col min-h-screen items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0}}>
                        <Header selection={selection}/>
                        <div className="w-full">
                            {children}
                        </div>
                    </motion.section>
                ) : ('')}
            </AnimatePresence>
        </>
    );
}