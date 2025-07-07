import { useState } from 'react';
import emailjs from '@emailjs/browser';

export default function ContactForm() {

    const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        emailjs.sendForm(
            'service_your_service_id', // Replace with your service ID
            'template_your_template_id', // Replace with your template ID
            e.currentTarget,
            'user_your_user_id' // Replace with your user ID
        )
        .then((result) => {
            console.log('Email sent successfully:', result.text);
            alert('Message sent successfully!');
        }, (error) => {
            console.error('Error sending email:', error.text);
            alert('Failed to send message. Please try again later.');
        });

        e.currentTarget.reset(); // Reset the form after submission
    }

    return (
        <form className="flex flex-col gap-5 p-5 bg-violet-950/60 backdrop-blur-md rounded-xl w-full max-w-md mx-auto mt-64 fade">
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
                className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
            >
                Send Message
            </button>
        </form>
    );

}