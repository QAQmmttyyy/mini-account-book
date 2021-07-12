import { useApiStore } from "./store/api.store";
import { NO_CATEGORY_TEXT } from "./constants";
import { ExtraCategoryId } from "./enums";

export function useCategoryIdToNameMap() {
  const billCategories = useApiStore((state) => state.billCategories);
  const categoryIdToNameMap = billCategories.reduce(
    (prevMap, category) => prevMap.set(category.id, category.name),
    new Map<string, string>()
  );
  categoryIdToNameMap.set(ExtraCategoryId.NO, NO_CATEGORY_TEXT);
  return categoryIdToNameMap;
}
