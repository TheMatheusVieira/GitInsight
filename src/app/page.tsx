import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="text-center flex flex-col justify-center">
          <h1 className="font-semibold mb-1">
            Enter a GitHub username to start exploring!
          </h1>
          <p className="font-light mb-5">
            Discover insights about GitHub users.
          </p>

          <input type="text" className="bg-[#EEF1F6] w-120 h-10 rounded-md " />
        </div>

        <div className="bg-[#EAECF1] w-280 h-140 rounded-lg shadow-sm shadow-gray-400">
          <div className="bg-[#3A4068] w-140 h-140 rounded-lg">
            <h1 className="font-semibold">User Profile</h1>
            <img
              src="#"
              alt="Imagem do usuário"
              className="bg-amber-50 w-20 h-20 rounded-full"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
