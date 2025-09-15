/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommitData } from "@/shared/api/github/types/ICommitData";
import { Repo } from "@/shared/api/github/types/IRepo";
import { UserStats } from "@/shared/api/github/types/IUserStats";

// Fetch top repositories
export const fetchTopRepositories = async (
  username: string,
  limit: number = 3
): Promise<Repo[]> => {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos?sort=stars&per_page=${limit}`
  );
  if (!response.ok) throw new Error(`GitHub API Error: ${response.statusText}`);

  const data = await response.json();
  return data.map((repo: any) => formatRepo(repo));
};

// Fetch all repositories
export const fetchAllRepositories = async (
  username: string
): Promise<Repo[]> => {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=100`
  );
  if (!response.ok) throw new Error(`GitHub API Error: ${response.statusText}`);

  const data = await response.json();
  return data.map((repo: any) => formatRepo(repo));
};

// Fetch user statistics
export const fetchUserStats = async (username: string): Promise<UserStats> => {
  if (!username) throw new Error("Username is required to fetch user stats.");

  const userResponse = await fetch(`https://api.github.com/users/${username}`);
  if (!userResponse.ok)
    throw new Error(`GitHub API Error: ${userResponse.statusText}`);
  const userData = await userResponse.json();

  const repoResponse = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`
  );
  if (!repoResponse.ok)
    throw new Error(`GitHub API Error: ${repoResponse.statusText}`);
  const repos = await repoResponse.json();

  const formattedRepos = repos.map((repo: any) => formatRepo(repo));
  const totalStars = formattedRepos.reduce(
    (sum: any, repo: { stargazers_count: any }) => sum + repo.stargazers_count,
    0
  );
  const totalForks = formattedRepos.reduce(
    (sum: any, repo: { forks_count: any }) => sum + repo.forks_count,
    0
  );

  return {
    totalStars,
    totalForks,
    followers: userData.followers,
    following: userData.following,
    publicRepos: userData.public_repos,
    repos: formattedRepos,
  };
};

// Fetch commit data
export const fetchCommitData = async (
  username: string,
  repoName: string
): Promise<CommitData[]> => {
  const response = await fetch(
    `https://api.github.com/repos/${username}/${repoName}/commits?per_page=100`
  );
  if (!response.ok) throw new Error(`GitHub API Error: ${response.statusText}`);

  const data = await response.json();
  return data.map((commit: any) => ({
    date: commit.commit.author.date,
    message: commit.commit.message,
  }));
};

// Fetch organization repositories
export const fetchOrgRepositories = async (
  orgName: string
): Promise<Repo[]> => {
  const response = await fetch(`https://api.github.com/orgs/${orgName}/repos`);
  if (!response.ok) throw new Error(`GitHub API Error: ${response.statusText}`);

  const data = await response.json();
  return data.map((repo: any) => formatRepo(repo));
};

const formatRepo = (repo: any): Repo => ({
  id: repo.id,
  name: repo.name,
  full_name: repo.full_name,
  html_url: repo.html_url,
  description: repo.description,
  created_at: repo.created_at,
  updated_at: repo.updated_at,
  pushed_at: repo.pushed_at,
  homepage: repo.homepage,
  size: repo.size,
  stargazers_count: repo.stargazers_count,
  watchers_count: repo.watchers_count,
  language: repo.language,
  forks_count: repo.forks_count,
  archived: repo.archived,
  open_issues_count: repo.open_issues_count,
  license: repo.license ? repo.license.name : "No License",
  visibility: repo.visibility,
  default_branch: repo.default_branch,
  topics: repo.topics || [],
});
