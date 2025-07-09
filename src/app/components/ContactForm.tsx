"use client";
import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { env } from 'process';

export default function ContactForm() {

    const sendEmail = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string;
        const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string;
        const userID = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string;

        emailjs.sendForm(
            serviceID,
            templateID,
            event.currentTarget,
            userID
        )
        .then((result) => {
            console.log('Email sent successfully:', result.text);
            alert('Message sent successfully!');
        }, (error) => {
            console.error('Error sending email:', error.text);
            alert('Failed to send message. Please try again later.');
        });

        event.currentTarget.reset();
    }

    return (
        <form className="flex flex-col gap-5 p-5 font-sans bg-violet-950/60 backdrop-blur-md rounded-xl w-full max-w-md mx-auto mt-64 fade" onSubmit={sendEmail}>
            <h2 className="text-2xl font-bold text-white">Contact Me</h2>
            <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                className="p-2 rounded bg-white text-black"
            />
            <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                className="p-2 rounded bg-white text-black"
            />
            <textarea
                name="message"
                placeholder="Your Message"
                required
                className="p-2 rounded bg-white text-black h-32"
            ></textarea>
            <button
                type="submit"
                className="p-2 bg-blue-500 text-white font-sans font-semibold rounded hover:bg-blue-600 transition-colors duration-200"
            >
                Send Message
            </button>
        </form>
    );

}