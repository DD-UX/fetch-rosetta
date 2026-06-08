/**
 * Shared entity models for every data-layer variant.
 * Add API-specific models here (e.g. Rick and Morty characters,
 * DummyJSON products) so all matrix cells consume identical types.
 */

export interface Paginated<T> {
  items: T[];
  page: number;
  totalPages: number;
  totalItems: number;
}
