import { ApiOperation, ApiResponse } from "@nestjs/swagger";

/**
 * Custom decorator for Swagger ApiResponse with status 201 (Created).
 * @param type - The response DTO type.
 */
export const ApiCreatedResponse = (type: any) =>
  ApiResponse({ status: 201, description: "Created", type });

/**
 * Custom decorator for Swagger ApiResponse with status 200 (OK).
 * @param type - The response DTO type.
 * @param options - Additional options for the ApiResponse.
 */
export const ApiOkResponse = (type: any, options?: { isArray?: boolean }) =>
  ApiResponse({
    status: 200,
    description: "OK",
    type,
    ...(options && { isArray: options.isArray }),
  });

/**
 * Custom decorator for Swagger ApiResponse with status 400 (Bad Request).
 */
export const ApiBadRequestResponse = () =>
  ApiResponse({ status: 400, description: "Bad Request" });

/**
 * Custom decorator for Swagger ApiResponse with status 404 (Not Found).
 */
export const ApiNotFoundResponse = () =>
  ApiResponse({ status: 404, description: "Not Found" });

/**
 * Custom decorator for Swagger ApiResponse with status 500 (Internal Server Error).
 */
export const ApiInternalServerErrorResponse = () =>
  ApiResponse({ status: 500, description: "Internal Server Error" });

/**
 * Custom decorator for Swagger ApiOperation with a summary.
 * @param summary - The operation summary text.
 */
export const ApiOperationSummary = (summary: string) =>
  ApiOperation({ summary });
