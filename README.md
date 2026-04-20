# DemandFirst foundation scaffold

This repository now contains the first production-grade foundation for:
- local authentication/session model (auth-provider-ready)
- company + membership model
- role-aware progressive onboarding (buyer/supplier/expert)
- protected dashboard access
- initial server-side authorization policies

## Runbook
1. Install deps: `npm install`
2. Copy env: `cp .env.example .env`
3. Generate client: `npx prisma generate`
4. Create migration: `npx prisma migrate dev --name foundation_auth_company_onboarding`
5. Run app: `npm run dev`
6. Run tests: `npm test`
