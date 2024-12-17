import { TypographyVariant, TypographySize } from '../interface';

export const getFontFamily = (variant: TypographyVariant): string => {
  switch (variant) {
    case 'Poppins':
      return 'font-Poppins';
    default:
      throw new Error(`Unsupported Typography variant: ${variant}`);
  }
};

export const getFontSize = (size: TypographySize): string => {
  /**
   * Returns the corresponding CSS class name for the given typography size.
   *
   * @param {TypographySize} size - The typography size variant.
   * @returns {string} The CSS class name associated with the given size.
   * @throws Will throw an error if the size is not a recognized typography size.
   */
  switch (size) {
    case 'h1':
      return 'text-h1';
    case 'h2':
      return 'text-h2';
    case 'h3':
      return 'text-h3';
    case 'h4':
      return 'text-h4';
    case 'h5':
      return 'text-h5';
    case 'h6':
      return 'text-h6';
    case 'body':
      return 'text-body';
    case 'caption':
      return 'text-caption';
    default:
      throw new Error(`Unsupported Typography size: ${size}`);
  }
};
