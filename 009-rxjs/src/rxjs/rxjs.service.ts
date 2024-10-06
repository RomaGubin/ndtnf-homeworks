import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import {
  firstValueFrom,
  toArray,
  from,
  map,
  mergeAll,
  take,
  Observable,
} from "rxjs";

@Injectable()
export class RxjsService {
  private readonly githubURL = "https://api.github.com/search/repositories?q=";
  private readonly gitlabURL = "https://gitlab.com/api/v4/projects?search=";

  constructor(private readonly httpService: HttpService) {}

  private getGithub(text: string, count: number): Observable<any> {
    return this.httpService.get(`${this.githubURL}${text}`).pipe(
      map((res) => res.data.items),
      mergeAll(),
      take(count)
    );
  }

  private getGitlab(text: string, count: number): Observable<any> {
    return this.httpService.get(`${this.gitlabURL}${text}`).pipe(
      map((res) => res.data),
      mergeAll(),
      take(count)
    );
  }

  async searchGithubRepositories(text: string): Promise<any> {
    const data$ = this.getGithub(text, 10).pipe(toArray());
    return await firstValueFrom(data$);
  }

  async searchGitlabProjects(text: string): Promise<any> {
    const data$ = this.getGitlab(text, 10).pipe(toArray());
    return await firstValueFrom(data$);
  }

  async searchBothPlatforms(text: string): Promise<any> {
    console.log(`Поиск по запросу: ${text}`);

    const githubData = await this.searchGithubRepositories(text);
    const gitlabData = await this.searchGitlabProjects(text);

    return {
      github: githubData,
      gitlab: gitlabData,
    };
  }
}
