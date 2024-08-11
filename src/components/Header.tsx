import Image from "next/image";

export default function Header() {

    const HEADER: React.CSSProperties = {
        backgroundColor: '#095947',
        display: 'flex',
        justifyContent: 'center',
        padding: '15px 0',
    }

    return (
        <header style={HEADER}>
            <Image src="/Frame-cópia.png" alt="" width={180} height={0} />
        </header>
    );
}