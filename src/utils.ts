function getDynamicTypeValue(originalValue: string): string | number | boolean {
  if (!isNaN(Number(originalValue))) {
    return Number(originalValue);
  }

  if (originalValue === "true") {
    return true;
  } else if (originalValue === "false") {
    return false;
  }

  return originalValue;
}

export function csvToArray<T = any>(csvContent: string): T[] {
  const lines = csvContent.split(/\r?\n/);
  const headline = lines[0];
  const fieldNames = headline.split(",");
  const result = [] as T[];

  for (let i = 1; i < lines.length; i++) {
    const fieldValues = lines[i].split(",");
    const data = {} as any;
    for (let j = 0; j < fieldNames.length; j++) {
      const fieldName = fieldNames[j];
      const fieldValue = fieldValues[j];
      data[fieldName] = getDynamicTypeValue(fieldValue);
    }
    result.push(data);
  }

  return result;
}

export function isInvalidDate(date: Date) {
  return date.toString() === "Invalid Date";
}
