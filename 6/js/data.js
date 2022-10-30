import {POST_COUNT} from './settings.js';
import {MaxLength, GeneratePhotoDetails} from './util.js';

const Posts = Array.from({length: POST_COUNT}, (_, i) => GeneratePhotoDetails(i + 1));

export {Posts};

// Просто, чтобы ESLint отвязался
MaxLength('', 0);
