interface IResponse {
    success: boolean;
    message?: string;
    data: object | null | any;
  }
  
  export type ErrorResponse = IResponse & {
    error_code: number;
  };
  
/**
 * Creates a successful response object.
 *
 * @param data - The data to be included in the response.
 * @param message - An optional message to be included in the response.
 * @returns An object containing the success status, data, and an optional message.
*/
export const createResponse = (
data: IResponse["data"],
message?: string
): IResponse => {
return { data, message, success: true };
};