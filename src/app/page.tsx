"use client"
// app/page.tsx ou pages/index.tsx
import Image from "next/image";

import logotipo from "../../public/GitInsight_Logotipo.png";
import { Github } from "lucide-react";

import { getGitHubUser, getGitHubUserRepos } from "./services/githubService";
import { useState } from "react";

export default function Home() {
  //Estados para gerenciar a entrada do usuáriuo e os dados da API
  const [username, setUsername] = useState(""); // Armazena o nome de utilizador digitado
  //O que é o useState e use client
  //explicar linha const [userData, setUserData] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null); // Armazena os dados do perfil do usuário (objeto GitHubUser)
  //explicar linha const [reposData, setReposData] = useState<any[]>([]);
  const [reposData, setReposData] = useState<any[]>([]); // Armazena os dados dos repositórios (array de GitHubRepo)
  const [loading, setLoading] = useState(false); // Indica se uma requisição está em andamento
  // explicar linha const [error, setError] = useState<string | null> (null);
  const [error, setError] = useState<string | null>(null); // Armazena mensagens de erro, se houver

  // Função assíncrona que é acionada quando o usuário clica em "Procurar" ou pressiona Enter
  const handleSearch = async () => {
    //Validação: verifica se o campo de nome do usuário não está vazio
    if (!username.trim()) {
      // Explicar  if(!username.trim())
      setError("Por favor, digite um nome de usuário do GitHub.");
      setUserData(null); // Limpa dados anteriores
      setReposData([]); //Limpa dados anteriores
      return; // Sai da função se o campo estiver vazio
    }

    setLoading(true); // Ativa o estado de carregamento
    setError(null); // Limpa qualquer erro anterior
    setUserData(null); // Limpa dados de usuários anteriores para uma nova busca
    setReposData([]); // Limpa dados de repositórios anteriores para uma nova busca

    try {
      //CHAMA AS FUNÇÕES DO SERVIÇO (gitHubService.ts) PARA BUSCAR OS DADOS
      // Await garante que esperamos a Promise resolver antes de continuar
      const user = await getGitHubUser(username);
      setUserData(user); //ATUALIZA O ESTADO com os dados do usuário

      const repos = await getGitHubUserRepos(username);
      setReposData(repos); //ATUALIZA O ESTADO com os dados dos repositórios
    } catch (err: any) {
      //Captura qualquer erro que possa ter sido lançado pelas funções do serviço
      console.error("Erro na procura:", err);
      setError(err.message || "Ocorreu um erro desconhecido."); // Define a mensagem de erro
    } finally {
      setLoading(false); // Desativa o estado de carregamento, apesar do resultado
    }
  };

  return (
    <div className="min-h-screen bg-[#1E1F3C] text-white flex flex-col items-center px-4 py-10 sm:py-20 gap-16">
      {/* Header */}
      <header className="w-full max-w-5xl flex items-center gap-3">
        <Image
          src={logotipo}
          className="w-46 absolute left-20"
          alt="logotipo"
        />
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
            placeholder="Insert a user..."
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Atualiza o estado 'username' conforme o input
            onKeyPress={(e) => {  // Permite acionar a busca ao pressionar Enter
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
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
          <h2 className="text-lg font-semibold">
            Top 5 most recent repositories
          </h2>
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-md shadow p-3 flex items-center justify-between"
            >
              <span>Repository {i + 1}</span>
              <span>
                <Github></Github>
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
