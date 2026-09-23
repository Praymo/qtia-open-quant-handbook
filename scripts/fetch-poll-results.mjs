import { readFile, writeFile } from 'node:fs/promises';

const feedback = JSON.parse(await readFile('src/data/feedback.json', 'utf8'));
const token = process.env.GITHUB_TOKEN;
if (!token) {
  console.log('No GITHUB_TOKEN: keeping the local poll snapshot.');
  process.exit(0);
}

const repository = process.env.GITHUB_REPOSITORY || 'Praymo/qtia-open-quant-handbook';
const [owner, name] = repository.split('/');
if (!owner || !name) throw new Error('GITHUB_REPOSITORY must be owner/name.');
const query = `query($owner:String!, $name:String!, $number:Int!) {
  repository(owner:$owner, name:$name) {
    discussion(number:$number) {
      number
      poll { totalVoteCount options(first:20, orderBy:{field:AUTHORED_ORDER, direction:ASC}) {
        nodes { option totalVoteCount }
      } }
    }
  }
}`;

const polls = [];
for (const { week, discussions: weekDiscussions } of feedback.weeks) for (const question of feedback.questions) {
  const number = weekDiscussions[question.key];
  if (!Number.isInteger(number) || number < 1) throw new Error(`Week ${week} is missing the ${question.key} poll.`);
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', Accept: 'application/vnd.github+json' },
    body: JSON.stringify({ query, variables: { owner, name, number } }),
  });
  if (!response.ok) throw new Error(`GitHub poll ${number}: HTTP ${response.status}`);
  const body = await response.json();
  if (body.errors?.length) throw new Error(`GitHub poll ${number}: ${body.errors.map(error => error.message).join('; ')}`);
  const discussion = body.data?.repository?.discussion;
  if (!discussion?.poll || discussion.number !== number) throw new Error(`Discussion ${number} has no poll.`);
  const options = discussion.poll.options.nodes;
  if (options.length !== question.options.length || options.some((option, index) => option.option !== question.options[index])) {
    throw new Error(`Discussion ${number} options do not match src/data/feedback.json.`);
  }
  polls.push({ week, discussion: number, total: discussion.poll.totalVoteCount, options: options.map(option => ({ label: option.option, votes: option.totalVoteCount })) });
}

const discussionQuery = `query($owner:String!, $name:String!) {
  repository(owner:$owner, name:$name) {
    discussions(first:10, orderBy:{field:UPDATED_AT, direction:DESC}) {
      nodes { number title url category { name } comments(last:2) {
        totalCount nodes { bodyText createdAt url author { login } }
      } }
    }
  }
}`;
const discussionResponse = await fetch('https://api.github.com/graphql', {
  method: 'POST',
  headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', Accept: 'application/vnd.github+json' },
  body: JSON.stringify({ query: discussionQuery, variables: { owner, name } }),
});
if (!discussionResponse.ok) throw new Error(`GitHub discussions: HTTP ${discussionResponse.status}`);
const discussionBody = await discussionResponse.json();
if (discussionBody.errors?.length) throw new Error(`GitHub discussions: ${discussionBody.errors.map(error => error.message).join('; ')}`);
const discussions = discussionBody.data?.repository?.discussions?.nodes.map(discussion => ({
  number: discussion.number,
  title: discussion.title,
  url: discussion.url,
  category: discussion.category.name,
  commentCount: discussion.comments.totalCount,
  comments: discussion.comments.nodes.map(comment => ({ author: comment.author?.login ?? 'GitHub 用户', body: comment.bodyText.slice(0, 500), url: comment.url, createdAt: comment.createdAt })),
})) ?? [];

const updatedAt = new Date().toISOString();
await writeFile('src/data/poll-results.json', `${JSON.stringify({ updatedAt, polls }, null, 2)}\n`);
await writeFile('src/data/discussion-results.json', `${JSON.stringify({ updatedAt, discussions }, null, 2)}\n`);
console.log(`Updated ${polls.length} public GitHub poll results.`);
