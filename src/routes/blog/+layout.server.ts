import { posts } from './data';

export function load() {
  const data = {
    summaries: posts.map(post => ({
      slug: post.slug,
      title: post.title,
    }))
  };

  return data
}
