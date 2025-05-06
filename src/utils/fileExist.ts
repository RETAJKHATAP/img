import fs from 'fs';
import { existsSync } from 'fs';
export const fileExist = (path: string): boolean => existsSync(path);
