import { Hero } from '@/components/hero';
import { ContactForm } from '@/components/contact-form';
import { FeaturedProjects } from '@/components/featured-projects';

export default function Home() {
  return (
    <main className="bg-black min-h-screen text-white">
      <Hero />
      
      <FeaturedProjects />

      <section id="contact" className="py-24 px-4 md:px-8 max-w-4xl mx-auto">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
            Get in Touch
          </h2>
          <p className="text-neutral-400">
            Have a project in mind or just want to say hi? Send me a message.
          </p>
        </div>
        <ContactForm />
      </section>
    </main>
  );
}
