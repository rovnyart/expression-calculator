/* eslint-disable no-underscore-dangle */

import { createMocks } from 'node-mocks-http';
import type { NextApiRequest, NextApiResponse } from 'next';

import handler, { Errors } from '../pages/api/calculate';

describe('/api/calculate', () => {
  const mockedReqRes = () => {
    const {
      req,
      res,
    }: { req: NextApiRequest; res: NextApiResponse & { _getJSONData: () => any } } = createMocks({ method: 'POST' });
    return { req, res };
  };

  it('should return 400 on wrong payload', async () => {
    const { req, res } = mockedReqRes();
    req.body = { foo: 'bar' };

    await handler(req, res);

    expect(res.statusCode).toBe(400);
    expect(res._getJSONData().error).toEqual(Errors.PAYLOAD);
  });

  it('should return 400 on parsing error', async () => {
    const { req, res } = mockedReqRes();
    req.body = { expression: '-+98' };

    await handler(req, res);

    expect(res.statusCode).toBe(400);
    expect(res._getJSONData().error).toEqual(Errors.PARSING);
  });

  it('should return 400 on division by zero', async () => {
    const { req, res } = mockedReqRes();
    req.body = { expression: '8 + 8/0 - 7' };

    await handler(req, res);

    expect(res.statusCode).toBe(400);
    expect(res._getJSONData().error).toEqual(Errors.DIVISION_BY_ZERO);
  });

  it('should return 200 with correct result on valid expression', async () => {
    const { req, res } = mockedReqRes();
    req.body = { expression: '8 + 8/1 - 7* 2' };

    await handler(req, res);

    expect(res.statusCode).toBe(200);
    expect(res._getJSONData().result).toEqual(2);
  });
});
