"use client";

import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

import Profile from "./components/Profile";
import Text from "./components/Text";
import Scene from "./components/Scene";
import LinkCard from "./components/LinkCard";
import Section from "./components/Section";
import { Suspense, useEffect, useState } from "react";
import ProjectCard from "./components/ProjectCard";
import ContactForm from "./components/ContactForm";
import Header from "./components/Header";
import Loading from "./components/Loading";

export default function Home() {

	const [selected, setSelected] = useState<string | null>(null);
	const [isVisible, setIsVisible] = useState<string | null>(null);

	useEffect(() => {
		console.log("Selected:", selected);
	}, [selected]);

	return (
		<>	
			<Scene setIsVisible={setIsVisible} selection={setSelected} selected={selected} />
			{selected !== null ? <Header fun={setIsVisible} /> : null}
			<Section id={'About Me'} selection={setSelected} selected={selected} isVisible={isVisible} >
				<Text>
					<Profile image="/foto1.jpg" />
					<h1 className="text-4xl">Duarte Araújo</h1>
					<hr className="w-5/6 border-1 border-white" />
					<p>
						Lorem ipsum odor amet, consectetuer adipiscing elit. Velit vitae consequat quis posuere justo vehicula condimentum feugiat. Adipiscing lobortis elit sollicitudin per malesuada sed quis ridiculus tincidunt? Sociosqu vel curae conubia ac eu vehicula dignissim. Eleifend ut ullamcorper facilisi, augue proin mauris odio. Parturient nibh netus inceptos eros eros non malesuada.
						Ultriciesonvallis et gravida facilisi mattis nascetur congue. Sociosqu nulla fames quis habitant habitasse penatibus, ut tempor sollicitudin? Tristique posuere viverra nostra habitant condimentum placerat hac finibus. Magnis nostra commodo amet praesent ante in nam.
					</p>
					<div className="flex flex-row gap-5 items-center justify-center">
						<LinkCard link="https://www.linkedin.com/in/duarte-araújo-91a168307">
							<FaLinkedin size={36} />
							<h1>LinkedIn</h1>
						</LinkCard>
						<LinkCard link="https://github.com/duartearaujo">
							<FaGithub size={36} />
							<h1>GitHub</h1>
						</LinkCard>
					</div>
				</Text>
			</Section>
			<Section id={'Projects'} selection={setSelected} selected={selected} isVisible={isVisible} >
				<div className="project-card-wrapper flex flex-row p-5 gap-5 h-full w-full justify-center opacity-1">
					<div className="flex flex-col gap-5 w-3/4 opacity-1">
						<ProjectCard>
							<Image src="/projects/1.png" alt="Project 1" width={300} height={200} className="rounded-lg" />
							<p>A brief description of Project 1.</p>
						</ProjectCard>
					</div>
					<div className="project-card-container flex flex-col gap-5 h-full w-full opacity-1">
						<ProjectCard>
							<Image src="/projects/1.png" alt="Project 1" width={300} height={200} className="rounded-lg" />
							<p>A brief description of Project 1.</p>
						</ProjectCard>
						<ProjectCard>
							<Image src="/projects/1.png" alt="Project 1" width={300} height={200} className="rounded-lg" />
							<p>A brief description of Project 1.</p>
						</ProjectCard>
						<ProjectCard>
							<Image src="/projects/1.png" alt="Project 1" width={300} height={200} className="rounded-lg" />
							<p>A brief description of Project 1.</p>
						</ProjectCard>
					</div>
        		</div>
			</Section>
			<Section id={'Contacts'} selection={setSelected} selected={selected} isVisible={isVisible} >
				<ContactForm />
			</Section>
		</>
	);
}

