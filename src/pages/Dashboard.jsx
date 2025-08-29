import ProfilePic from "../assets/pics/profile.jpg"
import Card from "../components/ui/Card";

const Dashboard = () => {
    return(
        <div>
            <header className="relative">
                <h2 className="text-xl lg:text-4xl w-[85vw] font-mono font-bold text-black p-6">
                    Engage with ideas <span className="text-gray-300">that spark change an creativity. Stay informed on </span> what's shaping the world around you. <span className="text-gray-300">Discover the stories that </span> fuel inspiration and connection.
                </h2>
                <div className="absolute bottom-6 right-0 flex items-center gap-2 p-4">
                    <img src={ProfilePic} alt="" className="w-12 h-12 rounded-full object-cover" />
                    <p className="font-semibold">Petyr</p>
                </div>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-3  p-4 ">
                <div className="md:col-span-2 h-full">
                    <Card
                    image="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
                    title="Exploring the Future of AI: Trends and Predictions for 2024"
                    date="Jan 1, 2024"
                    className="h-full"
                    />
                </div>

                <div className="flex flex-col gap-3">
                    <Card
                        image="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
                        title="Small Bento Post"
                        date="Jan 1, 2024"
                        imgStyle="h-[35vh]"
                    />
                    <Card
                        image="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
                        title="Another Post"
                        date="Jan 1, 2024"
                        className="h-[24vh]"
                        imgStyle="h-[35vh]"
                    />
                </div>
            </section>

            <section className="p-4">
                <div className="flex mx-auto justify-center items-center p-2 ">
                    <h1 className="text-2xl lg:text-3xl font-bold">Latest Posts</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card
                        image="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
                        title="Latest Post 1"
                        date="Jan 1, 2024"
                        imgStyle="h-60"
                    />
                    <Card
                        image="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
                        title="Latest Post 2"
                        date="Jan 1, 2024"
                        imgStyle="h-60"
                    />
                    <Card
                        image="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
                        title="Latest Post 3"
                        date="Jan 1, 2024"
                        imgStyle="h-60"
                    />
                    <Card
                        image="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
                        title="Latest Post 4"
                        date="Jan 1, 2024"
                        imgStyle="h-60"
                    />
                </div>
            </section>

        </div>
    )
}

export default Dashboard;