import type { PageSlug } from "../App";

interface Props {
    onNavClick: (page: PageSlug) => void;
}

export default function Header({onNavClick}: Props) {
    return (
        <header>
            <nav>
            <button onClick={() => onNavClick('home')}>Accueil</button>
            <button onClick={() => onNavClick('software')}>Logiciels</button>
            </nav>
        </header>
    );
}