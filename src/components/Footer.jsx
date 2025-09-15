import { Link } from "react-router-dom";
import {Instagram, Twitter, Github, Linkedin} from 'lucide-react';

const icons = [
    {
        name: 'instagram',
        icon: <Instagram size={20} />
    },
    {
        name: 'twitter',
        icon: <Twitter size={20} />
    },
    {
        name: 'github',
        icon: <Github size={20} />
    },
    {
        name: 'linkedin',
        icon: <Linkedin size={20} />
    }
]
const Footer = () => {
    return (
        <footer className="border-t border-gray-600 p-2 sticky boottom-0">
            <div className="flex justify-between items-center">
                <p>&copy; 2025 Blog App. All rights reserved.</p>
                <div className="flex gap-2">
                    {icons.map((item) => (
                        <Link 
                            to={`https://${item.name}.com`}
                            key={item.name}
                            className="text-gray-400 hover:text-white"
                        >
                            {item.icon}
                        </Link>
                    ))}
                </div>
            </div>
        </footer>
    );

}

export default Footer;