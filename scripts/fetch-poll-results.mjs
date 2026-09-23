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
for (const item of feedback.polls) {
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', Accept: 'application/vnd.github+json' },
    body: JSON.stringify({ query, variables: { owner, name, number: item.discussion } }),
  });
  if (!response.ok) throw new Error(`GitHub poll ${item.discussion}: HTTP ${response.status}`);
  const body = await response.json();
  if (body.errors?.length) throw new Error(`GitHub poll ${item.discussion}: ${body.errors.map(error => error.message).join('; ')}`);
  const discussion = body.data?.repository?.discussion;
  if (!discussion?.poll || discussion.number !== item.discussion) throw new Error(`Discussion ${item.discussion} has no poll.`);
  const options = discussion.poll.options.nodes;
  if (options.length !== item.options.length || options.some((option, index) => option.option !== item.options[index])) {
    throw new Error(`Discussion ${item.discussion} options do not match src/data/feedback.json.`);
  }
  polls.push({ discussion: item.discussion, total: discussion.poll.totalVoteCount, options: options.map(option => ({ label: option.option, votes: option.totalVoteCount })) });
}

await writeFile('src/data/poll-results.json', `${JSON.stringify({ week: feedback.week, updatedAt: new Date().toISOString(), polls }, null, 2)}\n`);
console.log(`Updated ${polls.length} public GitHub poll results.`);
