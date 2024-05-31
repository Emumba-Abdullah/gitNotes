import { Octokit } from 'octokit';
import { IGistsdata } from '../types/types';
import dayjs from 'dayjs';

const octokit = new Octokit({
  auth: localStorage.getItem('user') ? localStorage.getItem('userToken') : null,
});

export const getGistsApiCall = async (): Promise<IGistsdata[]> => {
  const res = await octokit.request('GET /gists', {
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });

  const gists = res.data;

  const updatedGists: IGistsdata[] = await Promise.all(
    gists.map(async (gist: any) => {
      const firstFile = Object.values(gist.files)[0];
      const fileContentRes = await octokit.request(`GET ${firstFile.raw_url}`);

      return {
        id: gist.id,
        fileContent: fileContentRes.data,
        ownerName: gist.owner.login,
        ownerImageURL: gist.owner.avatar_url,
        gistName: firstFile.filename,
        createdAt: dayjs(gist.created_at).format('DD-MM-YYYY'),
        gistDescription: gist.description,
      };
    }),
  );

  return updatedGists;
};
