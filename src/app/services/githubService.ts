interface GitHubUser {
  "login": string;
  "id": number;
  "node_id": string;
  "avatar_url": string;
  "gravatar_id": string;
  "url": string;
  "html_url": string;
  "followers_url": string;
  "following_url": string;
  "gists_url": string;
  "starred_url": string;
  "subscriptions_url": string;
  "organizations_url": string;
  "repos_url": string;
  "events_url": string;
  "received_events_url": string; 
  "type": string;
  "site_admin": boolean;
  "name": string | null;
  "company": string | null;
  "blog": string | null;
  "location": string | null;
  "email": string | null;
  "hireable": boolean | null;
  "bio": string | null;
  "twitter_username": string | null;
  "public_repos": number;
  "public_gists": number;
  "followers": number;
  "following": number;
  "created_at": string;
  "updated_at": string;
}

interface GitHubRepo {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  owner: {
    login: string;
    id: number
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  html_url: string;
  description: string | null;
  fork: boolean;
  url: string;
  forks_url: string;
  keys_url: string;
  collaborators_url: string;
  teams_url: string;
  hooks_url: string;
  issue_events_url: string;
  events_url: string;
  assignees_url: string;
  branches_url: string;
  tags_url: string;
  blobs_url: string;
  git_tags_url: string;
  git_refs_url: string;
  trees_url: string;
  statuses_url: string;
  languages_url: string;
  stargazers_url: string;
  contributors_url: string;
  subscribers_url: string;
  subscription_url: string;
  commits_url: string;
  git_commits_url: string;
  comments_url: string;
  issue_comment_url: string;
  contents_url: string;
  compare_url: string;
  merges_url: string;
  archive_url: string;
  downloads_url: string;
  issues_url: string;
  pulls_url: string;
  milestones_url: string;
  notifications_url: string;
  labels_url: string;
  releases_url: string;
  deployments_url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  git_url: string;
  ssh_url: string;
  clone_url: string;
  svn_url: string;
  homepage: string | null;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string | null;
  has_issues: boolean;
  has_projects: boolean;
  has_downloads: boolean;
  has_wiki: boolean;
  has_pages: boolean;
  has_discussions: boolean;
  forks_count: number;
  mirror_url: string | null;
  archived: boolean;
  disabled: boolean;
  open_issues_count: number;
  license: {
    key: string;
    name: string;
    spdx_id: string;
    url: string;
    node_id: string;
  } | null;
  allow_forking: boolean;
  is_template: boolean;
  web_commit_signoff_required: boolean;
  topics: string[];
  visibility: string;
  forks: number;
  open_issues: number;
  watchers: number;
  default_branch: string;
  temp_clone_token: string | null;
  network_count: number;
  subscribers_count: number;
}

//Acessando a URL base da API do GitHub em .env.local
//Caso a variável seja nula uso um fallback direto para 'https://api.github.com'
const GITHUB_API_BASE_URL = process.env.NEXT_PUBLIC_GITHUB_API_BASE_URL || 'https://api.github.com';


//@throws Erro se a requisição falhar ou o utilizador não for encontrado.
export async function getGitHubUser(username: string): Promise<GitHubUser>{
    const headers: HeadersInit = {
        'Accept': 'application/vnd.github.v3+json',
    };

const response = await fetch(`${GITHUB_API_BASE_URL}/users/${username}`, {headers});

if(!response.ok) {
    if (response.status === 404){
        throw new Error(`Usuário '${username}' não encontrado`);
    }
    throw new Error(`Erro ao procurar usuário: ${response.status} ${response.statusText}`);
}

return response.json();
}


export async function getGitHubUserRepos(username: string, limit: number = 5): Promise<GitHubRepo[]> {
    const headers: HeadersInit = {
        'Accept': 'application/vnd.github.v3+json',
        };

        const response = await fetch(`${GITHUB_API_BASE_URL}/users/${username}/repos?sort=updated&per_page=${limit}`, {headers});

        if (!response.ok){
            throw new Error(`Erro ao procurar repositórios: ${response.status} ${response.statusText}`);
        }
    
        return response.json();
}

 