export default function Banner() {
    return (
        <div className="relative w-full h-[70vh] overflow-hidden">

            {/* Background Image */}
            <img
                src="https://t3.ftcdn.net/jpg/05/00/81/96/360_F_500819621_7bRfuKkKyaRYU6aJ1Sa9RBCPdscka6Iq.jpg"
                alt="CineScopeX Banner"
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

            {/* Text Content */}
            <div className="absolute top-20 left-6 md:left-10 text-white">
                <h2 className="text-3xl md:text-5xl font-extrabold drop-shadow-lg">
                    Welcome to CineScopeX
                </h2>
                <p className="text-gray-300 text-sm md:text-lg mt-2 drop-shadow">
                    Discover trending movies instantly.
                </p>
            </div>

        </div>
    );
}
