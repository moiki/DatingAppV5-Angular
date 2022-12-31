import {HttpErrorResponse} from "@angular/common/http";

export const ParseResponseError = (errorObject: HttpErrorResponse): string => {
  const errors = Object.entries(errorObject.error?.errors || {});
  if (errors.length < 1) return `<ul><li>Error: ${errorObject.error.message}</li></ul>` || `<ul><li>Error: Unexpected Api Error</li></ul>`;
  const textErrorDetails = errors.map((entry: any[]) => `<li>${entry[0]}: ${entry[1]?.shift()}</li>`).join("\n");
  return  `<ul>${textErrorDetails}</ul>`
}
