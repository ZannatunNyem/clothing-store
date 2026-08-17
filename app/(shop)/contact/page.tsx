"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import Swal from "sweetalert2";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    setLoading(false);

    form.reset();

    await Swal.fire({
      icon: "success",
      title: "Message Sent",
      text: "Thank you for reaching out. We'll get back to you soon.",
      confirmButtonColor: "#B89B5E",
    });
  };

  return (
    <main className="min-h-screen bg-[var(--color-body)] px-5 py-16 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-14 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-[var(--color-accent)]">
            Contact Us
          </p>

          <h1 className="text-4xl font-semibold text-[var(--color-primary)] sm:text-5xl">
            We’d love to hear from you
          </h1>

          <div className="mx-auto mt-4 h-px w-12 bg-[var(--color-accent)]" />

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[var(--color-text-light)]">
            Have a question about an order, a product, or anything else? Send us
            a message and our team will be happy to help.
          </p>
        </div>

        {/* Contact Content */}
        <div className="grid overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] shadow-[0_15px_45px_rgba(6,60,49,0.08)] lg:grid-cols-[0.85fr_1.15fr]">
          {/* Contact Information */}
          <div className="bg-[var(--color-primary)] p-8 text-white sm:p-10 lg:p-12">
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.3em] text-[var(--color-accent)]">
              Get in touch
            </p>

            <h2 className="mt-4 text-2xl font-medium sm:text-3xl">
              Let’s talk.
            </h2>

            <p className="mt-4 max-w-sm text-sm leading-7 text-white/70">
              Whether you need help with your order or simply want to know more
              about LUMÉ, we’re here for you.
            </p>

            <div className="mt-10 space-y-7">
              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15">
                  <Mail size={17} />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wider text-white/50">
                    Email
                  </p>

                  <a
                    href="mailto:hello@lume.com"
                    className="mt-1 block text-sm transition hover:text-[var(--color-accent)]"
                  >
                    hello@lume.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15">
                  <Phone size={17} />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wider text-white/50">
                    Phone
                  </p>

                  <a
                    href="tel:+8801000000000"
                    className="mt-1 block text-sm transition hover:text-[var(--color-accent)]"
                  >
                    +880 1000 000 000
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15">
                  <MapPin size={17} />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wider text-white/50">
                    Location
                  </p>

                  <p className="mt-1 text-sm">Dhaka, Bangladesh</p>
                </div>
              </div>
            </div>

            <div className="mt-12 border-t border-white/10 pt-6">
              <p className="text-xs leading-6 text-white/50">
                Our support team is available Saturday–Thursday, 10:00 AM–6:00
                PM.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-8 sm:p-10 lg:p-12">
            <div className="mb-8">
              <h2 className="text-2xl font-medium text-[var(--color-text)]">
                Send us a message
              </h2>

              <p className="mt-2 text-sm text-[var(--color-text-light)]">
                Fill in the form below and we’ll get back to you shortly.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-[var(--color-text)]"
                >
                  Full name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your full name"
                  required
                  className="h-12 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-body)] px-4 text-sm text-[var(--color-text)] outline-none transition placeholder:text-[var(--color-text-light)] focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-[var(--color-text)]"
                >
                  Email address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="h-12 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-body)] px-4 text-sm text-[var(--color-text)] outline-none transition placeholder:text-[var(--color-text-light)] focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20"
                />
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-medium text-[var(--color-text)]"
                >
                  Subject
                </label>

                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="How can we help?"
                  required
                  className="h-12 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-body)] px-4 text-sm text-[var(--color-text)] outline-none transition placeholder:text-[var(--color-text-light)] focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20"
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-[var(--color-text)]"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Write your message..."
                  required
                  className="w-full resize-none rounded-xl border border-[var(--color-border)] bg-[var(--color-body)] px-4 py-3 text-sm text-[var(--color-text)] outline-none transition placeholder:text-[var(--color-text-light)] focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="h-12 w-full rounded-xl bg-[var(--color-primary)] text-sm font-medium tracking-wide text-white transition hover:bg-[var(--color-accent)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
