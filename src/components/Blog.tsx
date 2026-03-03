import { ArrowRight, Calendar, User } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const blogPosts = [
    {
        id: 1,
        title: "The Essential Cure: Product Results & Transformation",
        excerpt: "See the incredible transformation and real-world results of our Essential Cure hair oil through these documented journeys.",
        image: "/src/assets/blog.jpg",
        date: "Oct 24, 2023",
        author: "Admin",
        category: "Product Results"
    },
    {
        id: 2,
        title: "Weekly Growth Journal: Ahmed's 3-Month Journey",
        excerpt: "A detailed look at the week-by-week progress and the remarkable hair density improvement after consistent application.",
        image: "/src/assets/blog-1.jpg",
        date: "Oct 20, 2023",
        author: "Growth Expert",
        category: "Success Story"
    },
    {
        id: 3,
        title: "Scientific Breakthrough: The Power of Natural Extracts",
        excerpt: "Exploring the potent synergy of our handpicked ingredients and how they work together for optimal scalp health.",
        image: "/src/assets/blog-2.jpg",
        date: "Oct 15, 2023",
        author: "Science Team",
        category: "Tech & Science"
    }
];

const Blog = () => {
    return (
        <section id="blog" className="py-24 bg-gradient-cream">
            <div className="container mx-auto px-6">
                <AnimatedSection className="text-center mb-16">
                    <p className="font-body text-sm uppercase tracking-[0.3em] text-primary mb-4">Journal</p>
                    <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                        Hair Growth Blog
                    </h2>
                    <p className="font-body text-muted-foreground mt-4 max-w-2xl mx-auto">
                        Latest tips, real results, and expert advice for your hair journey.
                    </p>
                </AnimatedSection>

                <div className="grid md:grid-cols-3 gap-8">
                    {blogPosts.map((post, i) => (
                        <AnimatedSection key={post.id} delay={i * 0.1}>
                            <div className="glass-card rounded-3xl overflow-hidden group hover:shadow-luxury-lg transition-all duration-500 h-full flex flex-col">
                                <div className="relative h-64 overflow-hidden bg-white/50">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-primary/90 text-card text-[10px] uppercase tracking-widest px-3 py-1 rounded-full font-bold shadow-sm">
                                            {post.category}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-8 flex-1 flex flex-col">
                                    <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            <Calendar size={12} />
                                            {post.date}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <User size={12} />
                                            {post.author}
                                        </div>
                                    </div>

                                    <h3 className="font-heading text-xl font-bold text-foreground mb-3 leading-tight group-hover:text-primary transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="font-body text-sm text-muted-foreground mb-6 line-clamp-2">
                                        {post.excerpt}
                                    </p>

                                    <button className="mt-auto flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider group/btn">
                                        Read More
                                        <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
                                    </button>
                                </div>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <button className="glass-card px-8 py-3 rounded-full font-bold text-primary hover:bg-primary hover:text-card transition-all duration-300">
                        View All Articles
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Blog;
