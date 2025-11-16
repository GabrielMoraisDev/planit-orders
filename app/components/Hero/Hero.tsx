import Image from 'next/image';
export default function Hero() {
    return (
        <div className="w-full -mt-7 pt-10 h-72 relative text-white bg-primary-00">
            <div className="absolute -translate-1/2 left-1/2 top-1/2 w-full flex flex-col justify-center items-center z-20">
            <Image src='/logo-home.png' alt="Logotype" width={130} height={130}></Image>
            <h1 className="text-2xl font-semibold text-center mx-5 mt-2">O melhor açaí da cidade!</h1>
            <p className="text-base font-light text-center mx-3 mt-1">
                Peça agora e receba em seu endereço! 
                <br /> 
                Mais sabor, mais Viterbo.
            </p>
            </div>
            <svg
            className="w-full h-24 md:h-36 absolute -bottom-8 text-primary-00"
            viewBox="0 0 2149 623"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            aria-hidden="true"
            >
            <path
                d="M1514.5 442.111C1094.5 442.111 436 695.99 0 602.209V0.669865L2149 0V527.291C1980 478.391 1850.5 442.111 1514.5 442.111Z"
                fill="currentColor"
            />
            </svg>
        </div>
    );
}