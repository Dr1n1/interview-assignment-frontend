import Papa from 'papaparse';
import type { User } from '../types';

export const parseCSV = async (filePath: string): Promise<User[]> => {
  try {
    const response = await fetch(filePath);
    const text = await response.text();
    
    return new Promise((resolve, reject) => {
      Papa.parse(text, {
        header: true,
        skipEmptyLines: true,
        transform: (value: string, field: string) => {
          if (field === 'id') {
            return parseInt(value, 10);
          }
          return value.trim();
        },
        complete: (results: Papa.ParseResult<User>) => {
          const users = results.data as User[];
          resolve(users);
        },
        error: (error: Error) => {
          reject(error);
        },
      });
    });
  } catch (error) {
    throw new Error(`Failed to parse CSV: ${error}`);
  }
};

