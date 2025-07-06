import 'next';

declare module 'next' {
  export interface NextApiRouteHandler {
    (
      req: Request,
      context: { params: Record<string, string> } // Remove Promise wrapper
    ): Promise<Response> | Response;
  }
}