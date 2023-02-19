import { NextApiRequest, NextApiResponse } from 'next';
import APP_CONFIG from '../../../config';

const fetchSymbols = async () => {
  const response = await fetch(`${APP_CONFIG.XCHANGE_URL}/symbols`);
  const json = await response.json();
  return json;
};

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = await fetchSymbols();
    res.status(200).json(data);
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
