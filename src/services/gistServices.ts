import { Octokit } from 'octokit';
import { IFile, IFileData, IGistBody } from '../types/types';

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

export const forkAGist = async (id: string) => {
  let token = '';
  if (localStorage.getItem('user') && localStorage.getItem('userToken')) {
    token = localStorage.getItem('userToken') || '';
  }
  const resp = await octokit.request('POST /gists/{gist_id}/forks', {
    gist_id: id,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
      Authorization: 'Bearer ' + token,
    },
  });
  return resp;
};

export const starAGist = async (id: string) => {
  let token = '';
  if (localStorage.getItem('user') && localStorage.getItem('userToken')) {
    token = localStorage.getItem('userToken') || '';
  }
  const resp = await octokit.request('PUT /gists/{gist_id}/star', {
    gist_id: id,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
      Authorization: 'Bearer ' + token,
    },
  });
  return resp;
};

export const addAGist = async (data: IGistBody) => {
  let token = '';
  if (localStorage.getItem('user') && localStorage.getItem('userToken')) {
    token = localStorage.getItem('userToken') || '';
  }
  const fileData: IFileData = {};
  data.files.forEach((file: IFile) => {
    fileData[file.fileName] = { content: file.content };
  });

  console.log(fileData);
  const res = await octokit.request('POST /gists', {
    description: data.description,
    public: false,
    files: fileData,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
      Authorization: 'Bearer ' + token,
    },
  });
  return res;
};

export const isGistStarred = async (id: string) => {
  let token = '';
  if (localStorage.getItem('user') && localStorage.getItem('userToken')) {
    token = localStorage.getItem('userToken') || '';
  }
  const res = await octokit.request('GET /gists/{gist_id}/star', {
    gist_id: id,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
      Authorization: 'Bearer ' + token,
    },
  });
  return res;
};
