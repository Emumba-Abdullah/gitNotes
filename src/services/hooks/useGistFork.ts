import { useMutation } from '@tanstack/react-query';
import { forkAGist } from '../gists';
import { toast } from 'react-toastify';

export const useGistFork = (id: string, isAuthenticated: boolean) => {
  const mutation = useMutation({
    mutationFn: () => forkAGist(id),
    onSuccess: (data) => {
      if (data.status === 201) {
        toast.success('Forked successfully!');
      } else if (data.status === 403) {
        toast.error('Request Forbidden');
      } else if (data.status === 404) {
        toast.error('Resource not found!');
      } else if (data.status === 422) {
        toast.error('Endpoint spammed');
      }
    },
    onError: (error) => {
      if (error.response?.status === 403) {
        toast.error('Sorry, cannot fork your own gist');
      } else {
        toast.error('An error occurred while forking the gist');
      }
    },
  });

  const handleForkClick = () => {
    if (isAuthenticated) {
      mutation.mutate();
    } else {
      toast.info('Please log in to your account first!');
    }
  };

  return {
    handleForkClick,
  };
};
