import fs from 'fs';
import Util from './Util';
import FileException from '../exception/FileException';


export default class File {

    static validationAndWriteFile(dataBinary: any, fileType: string): any {

        const IMAGE_VALIDA_TYPE = [
                '.png',
                '.jpg',
                '.gif',
                '.jpeg',
                '.webp',
                '.bmp'
            ],
            ROOT_PROJECT_FOLDER = '../../../../../',
            isValidFileType = IMAGE_VALIDA_TYPE.includes(fileType);

        if (!isValidFileType)
            return false;

        let url = `http://${process.env.IP}`,
            fileFormat = fileType.toLowerCase(),
            randomFileName = Util.getFileHashName(),
            getFileData = (pathDir: string) => {
                try {
                    pathDir = 'cache/' + pathDir + randomFileName + fileFormat;
                    fs.writeFileSync(ROOT_PROJECT_FOLDER + pathDir, dataBinary);

                    const BYTE_SIZE_FOR_FILE = fs.statSync(ROOT_PROJECT_FOLDER + pathDir).size,
                        FILE_SIZE = Util.formatBytes(BYTE_SIZE_FOR_FILE);

                    return {
                        fileUrl: url + '/' + pathDir,
                        fileSize: FILE_SIZE
                    };
                } catch (e) {
                    FileException(e);
                }
            };

        return getFileData(`img/`);
    }

    static getFileFormat(fileName: string): string {
        return fileName.match(/\.[0-9a-z]+$/i)[0].toLowerCase();
    }

}