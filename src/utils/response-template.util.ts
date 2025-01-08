export function ResponseTemplate(
    status: number, data: any, message: string = ""
) {
    return {
        data,
        statusCode: status,
        message
    };
}
  