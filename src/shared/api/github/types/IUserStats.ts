import { Repo } from "./IRepo";

export interface UserStats {
  totalStars: number;
  totalForks: number;
  followers: number;
  following: number;
  publicRepos: number;
  repos: Repo[];
}
