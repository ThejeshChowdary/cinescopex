import "./globals.css";

interface LocaleLayoutProps {
    children: React.ReactNode;
}

export const metadata = {
    title: "CineScopeX",
    description: "Explore movies with style",
};

export default async function LocaleLayout({ children }: LocaleLayoutProps) {
    return (
        <html lang="en">
            <body className="bg-black text-white">
                {children}
            </body>
        </html>
    );
}
