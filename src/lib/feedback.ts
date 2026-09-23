import feedback from '../data/feedback.json';
import { weekName } from './catalog';

export function feedbackGroup(week: number) {
  const entry = feedback.weeks.find(item => item.week === week);
  return {
    week,
    discussion: entry?.discussion,
    questions: entry ? feedback.questions.map(question => ({
      key: question.key,
      title: question.title,
      question: question.prompt.replace('{week}', weekName(week)),
      options: question.options,
    })) : [],
  };
}
