import { useQuery, useMutation } from '@tanstack/react-query';
import { useEffect, useState, useCallback } from 'react';
import { isGistStarred, starAGist } from '../gists';
import { toast } from 'react-toastify';

export const useStarGist = (id: string, isAuthenticated: boolean) => {
  const [isStarred, setIsStarred] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['gistStar', id],
    queryFn: () => isGistStarred(id),
    enabled: !!isAuthenticated,
  });

  useEffect(() => {
    if (data) {
      if (data.status === 204) {
        setIsStarred(true);
      } else {
        setIsStarred(false);
      }
    }
    if (isError) {
      toast.error('Error checking current gist star');
    }
  }, [data, isError]);

  const mutation = useMutation({
    mutationFn: starAGist,
    onSuccess: () => {
      setIsStarred(true);
      toast.success('Starred successfully!');
    },
    onError: (error) => {
      if (error.response?.status === 304) {
        toast.error('Action not done');
      } else if (error.response?.status === 404) {
        toast.error('Resource not found!');
      } else if (error.response?.status === 403) {
        toast.error('Request Forbidden');
      } else {
        toast.error('Action not performed');
      }
    },
  });

  const handleStarClick = useCallback(() => {
    if (isAuthenticated && id) {
      mutation.mutate(id);
    } else {
      toast.info('Please authenticate first');
    }
  }, [id, isAuthenticated, mutation]);

  return {
    isStarred,
    isLoading: isLoading || mutation.isLoading,
    isError: isError || mutation.isError,
    handleStarClick,
  };
};
