import { error } from '@sveltejs/kit';
import { posts } from '../data';

interface ServerParams {
  params: {
    slug: string
  }
}

export function load({ params }: ServerParams) {
  const post = posts.find((post) => post.slug === params.slug);

  if (!post) throw error(404);

  return {
    post
  };
}
