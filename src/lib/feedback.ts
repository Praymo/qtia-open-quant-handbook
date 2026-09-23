import feedback from '../data/feedback.json';
import { weekName } from './catalog';

export function feedbackGroup(week: number) {
  const entry = feedback.weeks.find(item => item.week === week);
  return {
    week,
    polls: entry ? feedback.questions.map(question => ({
      title: question.title,
      question: question.prompt.replace('{week}', weekName(week)),
      options: question.options,
      discussion: entry.discussions[question.key as keyof typeof entry.discussions],
    })) : [],
  };
}
