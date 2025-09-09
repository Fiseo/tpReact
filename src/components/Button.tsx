
interface Props {
    children: React.ReactNode;
    rounded?: boolean;
}

export default function Button({children, rounded}: Props) {
    const radius = rounded ? '10px' : '0';

    return (
        <button style={{ borderRadius: radius }}>
            {children}
        </button>
    );
}
