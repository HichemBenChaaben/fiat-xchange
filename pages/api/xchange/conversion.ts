import { NextApiRequest, NextApiResponse } from 'next';
import APP_CONFIG from '../../../config';
import { objectToSearchString } from 'serialize-query-params';
var mcache = require('memory-cache');

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  const cacheKey = objectToSearchString(_req.query);
  let cacheBody = await mcache.get(cacheKey);
  if (cacheBody) {
    res.setHeader('macache-hit', 'Hit!');
    return res.send(cacheBody);
  }
  try {
    const queryString = objectToSearchString(_req.query);
    const response = await fetch(
      `${APP_CONFIG.XCHANGE_URL}/convert?${queryString}`,
    );
    const data = await response.json();
    mcache.put(cacheKey, JSON.stringify(data));
    res.setHeader('macache-hit', 'Miss!');
    res.status(200).json(data);
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
