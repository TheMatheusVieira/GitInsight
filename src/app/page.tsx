// app/page.tsx ou pages/index.tsx
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#1E1F3C] text-white flex flex-col items-center px-4 py-10 sm:py-20 gap-16">
      {/* Header */}
      <header className="w-full max-w-5xl flex items-center gap-3">
        <div className="w-10 h-10 bg-white text-[#1E1F3C] font-bold rounded-full flex items-center justify-center text-xl">
          G
        </div>
        <span className="font-semibold text-xl">GitInsight</span>
      </header>

      {/* Input e descrição */}
      <main className="flex flex-col items-center text-center gap-4">
        <h1 className="text-xl font-semibold">
          Enter a GitHub username to start exploring!
        </h1>
        <p className="text-sm text-[#CBD5E1]">
          Discover insights about GitHub users.
        </p>
        <div className="flex">
          <input
            type="text"
            placeholder="octocat"
            className="px-4 py-2 rounded-l-md bg-[#EEF1F6] text-black w-72 sm:w-96 outline-none"
          />
          <button className="px-6 py-2 bg-[#3A4068] text-white rounded-r-md hover:brightness-110">
            Search
          </button>
        </div>
      </main>

      {/* Card Principal */}
      <section className="w-full max-w-5xl bg-white rounded-xl shadow-md flex flex-col sm:flex-row overflow-hidden">
        {/* Profile */}
        <div className="bg-[#3A4068] text-white w-full sm:w-1/2 p-6 flex flex-col gap-4">
          <h2 className="text-lg font-semibold">User profile</h2>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gray-400"></div>
            <div>
              <p className="text-base font-medium">Username</p>
              <p className="text-sm">Full Name</p>
              <a href="#" className="text-xs underline text-blue-200">
                (Link)
              </a>
            </div>
          </div>
          <p className="font-semibold text-lg mt-2">Octocat</p>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-[#5D638C] rounded-md p-2 text-center">
              <p className="text-xs">followers</p>
              <p className="text-lg font-bold">488</p>
            </div>
            <div className="bg-[#5D638C] rounded-md p-2 text-center">
              <p className="text-xs">following</p>
              <p className="text-lg font-bold">3558</p>
            </div>
            <div className="bg-[#5D638C] rounded-md p-2 text-center">
              <p className="text-xs">Public repository</p>
              <p className="text-lg font-bold">4243</p>
            </div>
            <div className="bg-[#5D638C] rounded-md p-2 text-center">
              <p className="text-xs">Favorites</p>
              <p className="text-lg font-bold">3220</p>
            </div>
          </div>
        </div>

        {/* Repositories */}
        <div className="w-full sm:w-1/2 bg-[#F1F2F6] text-black p-6 flex flex-col gap-4">
          <h2 className="text-lg font-semibold">Top 5 most recent repositories</h2>
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-md shadow p-3 flex items-center justify-between"
            >
              <span>Repository {i + 1}</span>
              <Image
                src="/github-icon.svg" // substitua com ícone real
                alt="GitHub"
                width={20}
                height={20}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
