import { MOCK_ITEMS } from 'constants/mocks';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
const forceTestFailure = (routeUrl: string) => {
  it(`Please mock this route: '${routeUrl}' within your test`, () => {
    expect(true).toBe(false);
  });
};

const server = setupServer(
  rest.get(`https://frontend-tech-test-data.s3.eu-west-1.amazonaws.com/items.json`, (_req: any, res: any, ctx: any) => {
    return res(
      ctx.status(200),
      ctx.json({
        items: MOCK_ITEMS,
      }),
    );
  }),
  // Fallbacks
  rest.delete('*', (req, res, ctx) => {
    const route = req.url.toString();
    console.error(`No DELETE handler for ${req.url.toString()}`);
    forceTestFailure(route);
    return res(ctx.status(500));
  }),
  rest.get('*', (req, res, ctx) => {
    const route = req.url.toString();
    console.error(`No GET request handler for ${route}`);
    forceTestFailure(route);
    return res(ctx.status(500));
  }),
  rest.options('*', (req, res, ctx) => {
    const route = req.url.toString();
    console.error(`No OPTIONS request handler for ${route}`);
    forceTestFailure(route);
    return res(ctx.status(500));
  }),
  rest.patch('*', (req, res, ctx) => {
    const route = req.url.toString();
    console.error(`No PATCH handler for ${route}`);
    forceTestFailure(route);
    return res(ctx.status(500));
  }),
  rest.post('*', (req, res, ctx) => {
    const route = req.url.toString();
    console.error(`No POST handler for ${route}`);
    forceTestFailure(route);
    return res(ctx.status(500));
  }),
  rest.put('*', (req, res, ctx) => {
    const route = req.url.toString();
    console.error(`No PUT handler for ${route}`);
    forceTestFailure(route);
    return res(ctx.status(500));
  }),
);

beforeEach(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

export { rest, server };
