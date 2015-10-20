export const ERR_NO_SUCH_COMPONENT = 'No such component';
export const ERR_NO_URL_FOUND = 'No URL pattern defined for this page name';

export function reportError(errCode) {
    console.log(errCode);
    throw new Error(errCode);
}
