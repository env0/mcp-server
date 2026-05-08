import { type JWTPayload, createRemoteJWKSet, jwtVerify } from 'jose';
import type { NextFunction, Request, Response } from 'express';

export interface BearerAuthConfig {
  jwksUri: string;
  issuer?: string | undefined;
  audience?: string | undefined;
}

let jwks: ReturnType<typeof createRemoteJWKSet> | null = null;

function getJWKS(jwksUri: string): ReturnType<typeof createRemoteJWKSet> {
  if (!jwks) {
    jwks = createRemoteJWKSet(new URL(jwksUri));
  }
  return jwks;
}

export function bearerAuth(config: BearerAuthConfig) {
  const verifyOptions: { issuer?: string; audience?: string } = {};
  if (config.issuer) verifyOptions.issuer = config.issuer;
  if (config.audience) verifyOptions.audience = config.audience;

  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Missing or invalid Authorization header' });
      return;
    }

    const token = authHeader.slice(7);

    try {
      const { payload } = await jwtVerify(token, getJWKS(config.jwksUri), verifyOptions);

      (req as Request & { auth?: JWTPayload }).auth = payload;
      next();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Token verification failed';
      console.error('Bearer auth failed:', message);
      res.status(401).json({ error: 'Invalid or expired token' });
    }
  };
}
