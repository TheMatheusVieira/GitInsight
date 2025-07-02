"use client"
import { useState } from "react";
import Image from "next/image";
import { Github } from "lucide-react";

import logotipo from "../../public/GitInsight_Logotipo.png";
import { getGitHubUser, getGitHubUserRepos, getGitHubStarredRepos } from "./services/githubService";

export default function Home() {
  //Estados para gerenciar a entrada do usuáriuo e os dados da API
  const [username, setUsername] = useState(""); // Armazena o nome de utilizador digitado
  const [userData, setUserData] = useState<any>(null); // Armazena os dados do perfil do usuário (objeto GitHubUser)
  const [reposData, setReposData] = useState<any[]>([]); // Armazena os dados dos repositórios (array de GitHubRepo)
  const [loading, setLoading] = useState(false); // Indica se uma requisição está em andamento
  const [error, setError] = useState<string | null>(null); // Armazena mensagens de erro, se houver
  const [starredRepos, setStarredRepos] = useState<number | null>(null); // Armazena os favoritos se existir

  // Função assíncrona acionada quando o usuário clica em "Procurar" ou pressiona Enter
  const handleSearch = async () => {
    //Validação: verifica se o campo de nome do usuário não está vazio
    if (!username.trim()) {
      setError("Por favor, digite um nome de usuário do GitHub.");
      setUserData(null); // Limpa dados anteriores
      setReposData([]); //Limpa dados anteriores
      setStarredRepos(null); //Limpa dados anteriores
      return; // Sai da função se o campo estiver vazio
    }

    setLoading(true); // Ativa o estado de carregamento
    setError(null); // Limpa qualquer erro anterior
    setUserData(null); // Limpa dados de usuários anteriores para uma nova busca
    setStarredRepos(null); // Limpa dados dos favoritos
    setReposData([]); // Limpa dados de repositórios anteriores para uma nova busca

    try {
      //CHAMA AS FUNÇÕES DO SERVIÇO (gitHubService.ts) PARA BUSCAR OS DADOS
      // Await garante que esperamos a Promise resolver antes de continuar
      const user = await getGitHubUser(username);
      setUserData(user); //ATUALIZA O ESTADO com os dados do usuário

      const starred = await getGitHubStarredRepos(username);
      setStarredRepos(starred.length); // Armazena a contagem dos favoritos

      const repos = await getGitHubUserRepos(username);
      setReposData(repos); //ATUALIZA O ESTADO com os dados dos repositórios

    } catch (err: any) {
      //Captura qualquer erro que possa ter sido lançado pelas funções do serviço
      console.error("Erro na procura:", err);
      setError(err.message || "Ocorreu um erro desconhecido."); // Define a mensagem de erro
    } finally {
      setLoading(false); // Desativa o estado de carregamento independente do resultado
    }
  };

  return (
    <div className="min-h-screen bg-[#1E1F3C] text-white flex flex-col items-center sm:py-18 gap-16">
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
            spellCheck="false"
            onChange={(e) => setUsername(e.target.value)} // Atualiza o estado 'username' conforme o input
            onKeyUp={(e) => {  // Permite acionar a busca ao pressionar Enter
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
            className="px-4 py-2 rounded-l-md bg-[#EEF1F6] text-black w-72 sm:w-96 outline-none"
          />
          <button
            onClick={handleSearch} // Aciona handleSearch ao clicar 
            disabled={loading} // Desabilita o botão enquanto estiver carregando
            className="px-6 py-2 bg-[#3A4068] text-white rounded-r-md hover:brightness-110">
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>

        {error && (
          <p className="text-red-400 mt-4 text-sm font-medium">{error}</p>
        )}

      </main>

      {/* Renderização condicional do cartão principal e mensagens de Estado */}
      {loading && (
        <section className="mt-8 text-lg text-[#CBD5E1]">Loading data from GitHub...</section>
      )}

      {/* Só irá renderizar se não estiver em loading, sem erros e encontrar os dados */}
      {!loading && !error && userData && (
        <section className="w-full max-w-5xl bg-white rounded-xl shadow-md flex flex-col sm:flex-row overflow-hidden">

          {/* Perfil do usuário */}
          <div className="bg-[#3A4068] text-white w-full sm:w-1/2 p-6 flex flex-col gap-4">
            <h2 className="text-lg font-semibold">User profile</h2>
            <div className="flex items-center gap-4">
              <div className="w-18 h-18 rounded-full overflow-hidden border-2 border-white" >
                {/* Exibe a imagem do usuário, com um URL de fallback caso o avatar_url falhe */}
                <img src={userData.avatar_url || 'https://placehold.co/64x64/gray/white?text=Avatar'}
                  alt={`${userData.login}'s perfil`}
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    // Fallback para imagem caso a URL de avatar falhe
                    e.currentTarget.src = 'https://placehold.co/64x64/gray/white?text=Avatar';
                  }}
                />
              </div>
              <div>
                <p className="text-base font-medium">{userData.login}</p>
                <p className="text-sm">{userData.name || 'Name not available'}</p>
                <a href={userData.html_url} target="_blank" rel="noopener noreferrer" className="text-xs underline text-blue-200 hover:text-blue-400">
                  Access profile on GitHub
                </a>
              </div>
            </div>

            <p className="font-semibold text-lg mt-2">Highlights</p>
            <div className="grid grid-cols-2 gap-2">

              <div className="bg-[#5D638C] rounded-md p-2 text-center">
                <p className="text-xs">Followers</p>
                <p className="text-lg font-bold">{userData.followers}</p>
              </div>

              <div className="bg-[#5D638C] rounded-md p-2 text-center">
                <p className="text-xs">Following</p>
                <p className="text-lg font-bold">{userData.following}</p>
              </div>

              <div className="bg-[#5D638C] rounded-md p-2 text-center">
                <p className="text-xs">Public repository</p>
                <p className="text-lg font-bold">{userData.public_repos}</p>
              </div>

              <div className="bg-[#5D638C] rounded-md p-2 text-center">
                <p className="text-xs">Favorites</p>
                <p className="text-lg font-bold">{starredRepos}</p>
              </div>

            </div>
          </div>

          {/* Repositórios */}
          <div className="w-full sm:w-1/2 bg-[#F1F2F6] text-black p-6 flex flex-col gap-4">
            <h2 className="text-lg font-semibold">
              Top 5 most recent repositories
            </h2>

            {reposData.length > 0 ? (
              reposData.map((repo) => (
                <a
                  key={repo.id}
                  className="bg-white rounded-md shadow p-3 flex items-center justify-between cursor-pointer"
                  href={repo.html_url}
                  target="_blank" rel="noopener noreferrer"
                >
                  <span className="font-medium text-gray-800 hover:text-[#3A4068]">
                    {repo.name}
                  </span>
                  <span>
                    <Github></Github>
                  </span>
                </a>
              ))
            ) : (
              <p className="text-gray-600 text-sm">No recent repository found for this user.</p>
            )}
          </div>
        </section>
      )}
      {/* Mensagem inicial exibida quando não existir dados */}
      {!loading && !error && !userData && (
        <section className="mt-8 text-lg text-[#CBD5E1] text-center">
          <p>Search for a GitHub user in the search bar!</p>
        </section>
      )}

      <span className="absolute font-extralight font-serif bottom-2 right-5 text-[#3A4068]">DEV: Matheus Vieira</span>
    </div>
  );
}
