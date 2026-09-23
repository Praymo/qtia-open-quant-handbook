import directory from '../data/contributors.json';
import weekCredits from '../data/week-credits.json';

export type Contributor = {
  name: string;
  github: string | null;
  roles: string[];
  type: string[];
  technicalEvidence?: string;
  weeks: number[];
};

export function contributorRecords(): Contributor[] {
  const people = new Map<string, Contributor>();
  for (const record of directory) {
    if (people.has(record.name)) throw new Error(`Duplicate contributor: ${record.name}`);
    people.set(record.name, { ...record, roles: [...record.roles], type: [...record.type], weeks: [] });
  }
  for (const credit of weekCredits) {
    for (const [names, role] of [[credit.organizers, 'Question Organization'], [credit.reviewers, 'Review']] as const) {
      for (const name of names) {
        const person = people.get(name);
        if (!person) throw new Error(`Missing contributor record for ${name}`);
        if (!person.roles.includes(role)) person.roles.push(role);
        if (!person.weeks.includes(credit.week)) person.weeks.push(credit.week);
      }
    }
  }
  return [...people.values()];
}
