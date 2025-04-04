
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Alex Johnson",
    role: "Software Engineer",
    image: "/placeholder.svg",
    content: "DeepWork.io has transformed my workday. I can now track exactly how much focused work I get done and continually improve my productivity."
  },
  {
    name: "Maria Chen",
    role: "Content Creator",
    image: "/placeholder.svg",
    content: "The Zen Timer is exactly what I needed. Clean, distraction-free, and helps me stay in flow state for hours. My content quality has improved dramatically."
  },
  {
    name: "James Wilson",
    role: "Product Manager",
    image: "/placeholder.svg",
    content: "As someone who manages multiple projects, the analytics feature has been invaluable. I can actually see which projects consume most of my deep work time."
  },
];

export function Testimonials() {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-futuristic-black/80">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What People <span className="bg-neon-gradient bg-clip-text text-transparent">Say</span>
          </h2>
          <p className="text-futuristic-text-secondary max-w-2xl mx-auto">
            Don't just take our word for it - here's what our community has to say
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="feature-card p-8"
            >
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-futuristic-purple text-futuristic-purple" />
                ))}
              </div>
              <p className="mb-6 text-futuristic-text-secondary">"{testimonial.content}"</p>
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-futuristic-text-secondary">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}