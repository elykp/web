export const getIconByFileType = (fileType: string) => {
	const set = new Map([
		['application/pdf', 'bi bi-filetype-pdf'],
		[
			'application/vnd.openxmlformats-officedocument.presentationml.presentation',
			'bi bi-filetype-ppt'
		],
		[
			'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
			'bi bi-filetype-docx'
		],
		['application/msword', 'bi bi-filetype-doc'],
		['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'bi bi-filetype-xls'],
		['text/plain', 'bi bi-filetype-txt']
	]);

	return isImage(fileType) ? undefined : set.get(fileType) ?? 'bi bi-file-earmark';
};

export const isImage = (fileType: string) => {
	return fileType.startsWith('image/');
};

export const isValidFileType = (fileType: string, accept: string) =>
	accept.split('/')[0] === fileType.split('/')[0];

export const isFileExceedLimit = (fileSize: number, limitMb: number) =>
	fileSize > limitMb * 1000 * 1000;

export const validateFileList = (fileList: FileList, limit: number, accept?: string | null) => {
	for (const file of fileList) {
		if (accept && !isValidFileType(file.type, accept)) {
			throw new Error('Uploaded file is not supported');
		}
		if (isFileExceedLimit(file.size, limit)) {
			throw new Error(
				`Uploaded file (${bToMB(file.size).toFixed(
					1
				)}MB) exceeds the maximum file-size (${limit}MB)`
			);
		}
	}
};

export const bToMB = (bytes: number) => bytes / 1000 / 1000;
