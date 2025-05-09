

export default function Background({ children }: { children: React.ReactNode }) {

    return (
        <>
        <div className="w-full h-full bg-[url('/images/background.jpg')] bg-cover bg-center bg-no-repeat bg-fixed">
           {children}
        </div>
           

        </>
    )

}

