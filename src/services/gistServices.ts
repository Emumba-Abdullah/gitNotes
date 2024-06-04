import { Octokit } from 'octokit';

const octokit = new Octokit({
  auth: localStorage.getItem('user') ? localStorage.getItem('userToken') : null,
});

export const getGistsApiCall = async () => {
  const res = await octokit.request('GET /gists', {
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });

  return res.data;
};

export const getAGist = async (id: string) => {
  const response = await octokit.request('GET /gists/{gist_id}', {
    gist_id: id,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });
  return response.data;
};
