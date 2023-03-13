import crypto from 'crypto';
import multer from 'multer';
import { resolve } from 'path';

// Assistir aulas 76 e 77 Curso Udemy - Matheus Fraga
export default {
  upload(folder: string) {
    return {
      storage: multer.diskStorage({
        destination: resolve(__dirname, '..', '..', folder),
        filename: (request, file, callback) => {
          const fileHash = crypto.randomBytes(16).toString("hex");
          const fileName = `${fileHash} - ${file.originalname}`

          return callback(null, fileName);
        }
      })
    }
  }
}