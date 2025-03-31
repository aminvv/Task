import { Transform } from 'class-transformer';

export function ToNull() {
  return Transform(({ value }) => (value === '' ? null : value));
}