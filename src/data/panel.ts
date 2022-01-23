import { v4 as uuid } from 'uuid';

// Class names can't start with a number so add an underscore
export const dragClassName = `_${uuid()}`;
