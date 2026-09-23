import directory from '../data/contributors.json';
import weekCredits from '../data/week-credits.json';

export type Contributor = {
  name: string;
  github: string | null;
  roles: string[];
  type: string[];
  contributions: { label: string; href: string; type: 'content' | 'technical' }[];
};

export function contributorRecords(): Contributor[] {
  const people = new Map<string, Contributor>();
  for (const record of directory) {
    if (people.has(record.name)) throw new Error(`Duplicate contributor: ${record.name}`);
    const contributions = 'contributions' in record ? (record.contributions ?? []) : [];
    people.set(record.name, { name: record.name, github: record.github, roles: [...record.roles], type: [...record.type], contributions: [...contributions] as Contributor['contributions'] });
  }
  for (const credit of weekCredits) {
    for (const [names, role] of [[credit.organizers, 'Question Organization'], [credit.reviewers, 'Review']] as const) {
      for (const name of names) {
        const person = people.get(name);
        if (!person) throw new Error(`Missing contributor record for ${name}`);
        if (!person.roles.includes(role)) person.roles.push(role);
        person.contributions.push({ label: `第${credit.week}周 · ${role === 'Question Organization' ? '习题整理' : '习题审核'}`, href: `/week/${String(credit.week).padStart(2, '0')}/`, type: 'content' });
      }
    }
  }
  return [...people.values()];
}
