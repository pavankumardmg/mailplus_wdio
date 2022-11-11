import { plainToInstance } from 'class-transformer';
import RestClient from 'restClient';
import loadash from 'lodash';

export default class CoffeeBreak {
  private coffeBreak: CoffeeBreakMapper;

  async load() {
    let api = new RestClient('https://static-platypuzz.s3.amazonaws.com');
    await api.get('/dev/coffeebreak/bundles/20211002/mail-plus-preview/data/coffeebreak.js');
    this.coffeBreak = CoffeeBreakMapper.parse(api.lastResponse.data as string);
  }
  private get getData() {
    return this.coffeBreak;
  }

  filterGamesByTitle(value: string) {
    return loadash.find(this.getData.games, { title: value });
  }
}
export class CoffeeBreakMapper {
  version: string;
  published: boolean;
  publication: string;
  date: Date;
  singleGamePage: boolean;
  categories: Category[];
  games: Game[];

  static parse(data: string) {
    return plainToInstance(CoffeeBreakMapper, JSON.parse(data.replace('var coffeebreak_data =', '')));
  }
}

export interface Category {
  categoryId: number;
  title: string;
  competitions: boolean;
  sorted: boolean;
  order: number;
  games: number[];
}

export interface Game {
  gameId: number;
  uniqueId: number;
  title: string;
  short_desc: string;
  thumbnail: string;
  template: string;
  style: string;
  expiry: number | string;
  countdown: boolean;
  hint_available: boolean;
  competition: boolean;
  competition_expiry: number;
  rating: Rating;
  promoGame: boolean;
  howToPlay: HowToPlay[];
  taxonomy: string;
  data: Data;
}

export interface Data {
  rows?: number | string;
  cols?: number | string;
  initial?: string[];
  initial_start?: string[];
  solution?: Array<{ [key: string]: string } | string> | string;
  hor?: Hor[];
  ver?: Hor[];
  clue?: string[] | ClueClass | string;
  start?: number;
  end?: number;
  blocks?: Block[];
  question_answer?: QuestionAnswer[];
  pictures?: string[];
  cells?: number;
  inwards?: Ward[];
  outwards?: Ward[];
  intersections?: number[];
  width?: number;
  height?: number;
  inside_letter?: string;
  outside_letter?: string[];
  nineletter_word_clue?: string;
  average_level?: number;
  good_level?: number;
  very_good_level?: number;
  excellent_level?: number;
  solution_word?: string[];
  puzzle?: string;
  links?: string;
  puzzleNumber?: string;
  puzzleID?: number;
  packIndex?: number;
}

export interface Block {
  basecell?: string;
  basenumber?: number | string;
  operator?: Operator;
  cell: string;
}

export enum Operator {
  Empty = '-',
  Fluffy = '+',
  Operator = '*',
  Purple = '/',
}

export interface ClueClass {
  position: number;
  letter: string;
}

export interface Hor {
  nb: number;
  r: number;
  c: number;
  question: string;
  quickQuestion: string;
  len: string;
  answer: string;
  picture?: number;
}

export interface Ward {
  nb: number;
  c: number;
  question: string;
  len: number;
  answer: string;
}

export interface QuestionAnswer {
  question: string;
  options: string[];
  options_key: string[];
  answer: number;
}

export interface HowToPlay {
  selector: string;
  text: string;
  above?: boolean;
}

export enum Rating {
  Challenging = 'Challenging',
  Diabolical = 'Diabolical',
  Difficult = 'Difficult',
  Easy = 'Easy',
  Elementary = 'Elementary',
}
