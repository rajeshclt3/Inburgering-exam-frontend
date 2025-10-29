
import { PracticeQuestion } from './types';

export const PRACTICE_QUESTIONS: PracticeQuestion[] = [
  {
    id: 1,
    type: 'short_answer',
    prompt: 'Wat ga je in het weekend doen?',
    context: 'Je vriend vraagt wat je plannen zijn voor het weekend. Schrijf een kort antwoord.'
  },
  {
    id: 2,
    type: 'email',
    prompt: 'Schrijf een e-mail naar je docent.',
    context: 'Je kunt morgen niet naar de les komen omdat je naar de tandarts moet. Schrijf een e-mail naar je docent. Vertel waarom je niet kunt komen en vraag wat het huiswerk is.'
  },
  {
    id: 3,
    type: 'short_answer',
    prompt: 'Wat is je favoriete eten?',
    context: 'Een nieuwe collega vraagt naar je favoriete eten. Beschrijf het en vertel waarom je het lekker vindt.'
  },
  {
    id: 4,
    type: 'form',
    prompt: 'Je wilt lid worden van een sportclub. Vul het formulier in.',
    context: 'Schrijf een kort bericht aan de sportclub. Vertel wie je bent, welke sport je wilt doen en vraag wanneer je kunt beginnen.'
  },
  {
    id: 5,
    type: 'email',
    prompt: 'Schrijf een e-mail naar de huisarts.',
    context: 'Je voelt je niet goed en je wilt een afspraak maken bij de huisarts. Schrijf een e-mail. Leg uit wat je klachten zijn en vraag om een afspraak.'
  }
];
