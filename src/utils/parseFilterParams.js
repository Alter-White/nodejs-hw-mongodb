const parseType = (type) => {
  const validTypes = ['work', 'home', 'personal'];
  return validTypes.includes(type) ? type : undefined;
};

const parseNumber = (number) => {
  const parsedNumber = parseInt(number);
  return Number.isNaN(parsedNumber) ? undefined : parsedNumber;
};

const parseBoolean = (isFavourite) => {
  if (typeof isFavourite === 'boolean') {
    return isFavourite;
  }

  if (typeof isFavourite === 'string') {
    const lowerCaseValue = isFavourite.toLowerCase();
    if (lowerCaseValue === 'true') {
      return true;
    }
    if (lowerCaseValue === 'false') {
      return false;
    }
  }

  const parsedNumber = parseNumber(isFavourite);
  return typeof parsedNumber === 'number' ? parsedNumber === 1 : undefined;
};

export const parseFilterParams = (query) => {
  const { type, isFavourite } = query;

  const parsedType = parseType(type);
  const parsedIsFavourite = parseBoolean(isFavourite);

  return {
    type: parsedType,
    isFavourite: parsedIsFavourite,
  };
};
