import {HttpErrorResponse} from "@angular/common/http";

export const ParseResponseError = (errorObject: HttpErrorResponse): string => {
  const isArray = Array.isArray(errorObject.error)
  const errors = isArray ?
    errorObject.error : Object.entries(errorObject.error?.errors || {});
  if (errors.length < 1) return `<ul><li>Error: ${errorObject.error.message}</li></ul>` || `<ul><li>Error: Unexpected Api Error</li></ul>`;
  const textErrorDetails = errors.map((entry: any[]) => {
    const errorContent = isArray ? entry: entry[1]?.shift();
    const errorMessage = typeof errorContent === 'string' ?
      errorContent
      : Object.entries(errorContent).map(entry => `${entry[0]}: ${entry[1]}`)
    return `<li>${entry[0] || 'Error'}: ${errorMessage}</li>`
  }).join("\n");
  return `<ul>${textErrorDetails}</ul>`
}

export const ParseExpectedErrorResponse = (errorObject: HttpErrorResponse): string => {
  const errorMessage = typeof errorObject.error === 'string' ?
    errorObject.error
    : Object.entries(errorObject.error).map(entry => `<li>${entry[0] || 'Error'}: ${entry[1]}</li>`).join("")
  return `<ul>${errorMessage}</ul>`
}
