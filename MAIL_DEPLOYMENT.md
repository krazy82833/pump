# JSG Cloud Mail Deployment Notes

## Current status

- Cloud Mail source is cloned in `cloud-mail/`.
- Worker name: `jsgpump-mail`
- Production login URL: `https://mail.jsgpump.com`
- Temporary workers.dev URL has been disabled by the production deploy.
- D1 database: `jsgpump-mail`
- D1 database ID: `cb1ad905-4587-4b81-a781-81ab3e03bbf7`
- KV namespace binding: `kv`
- KV namespace ID: `313b360f9b3640ce9bf1d4176d8ff946`
- Database initialization returned `200 success`.
- Production custom domain deployment succeeded and Wrangler reported:
  - `mail.jsgpump.com (custom domain)`
- Initial accounts were created:
  - `admin@jsgpump.com`
  - `sales@jsgpump.com`
  - `info@jsgpump.com`
  - `rfq@jsgpump.com`
  - `support@jsgpump.com`
- Account passwords are stored locally in `cloud-mail/mail-worker/.jsg-mail-accounts.local`.
- JWT init secret is stored locally in `cloud-mail/mail-worker/.jsg-mail-secret.local`.

## Config files

- `cloud-mail/mail-worker/wrangler-jsg-workersdev.toml`
  - Deploys the current working system to workers.dev.
- `cloud-mail/mail-worker/wrangler-jsg.toml`
  - Production config for `mail.jsgpump.com`.
  - This will work after `jsgpump.com` is added to Cloudflare DNS.

## DNS status

`jsgpump.com` has been moved to Cloudflare public DNS:

- `alex.ns.cloudflare.com`
- `ollie.ns.cloudflare.com`

`mail.jsgpump.com` is served by Cloudflare and returns HTTP 200 when resolved to Cloudflare edge IPs.

Some local or ISP DNS resolvers may still cache old Vercel records for a short time. If `mail.jsgpump.com` still fails locally, flush DNS cache or wait for resolver propagation.

## Remaining DNS / email steps

1. Keep the current Vercel website records in Cloudflare:
   - `jsgpump.com` A/ALIAS records for Vercel
   - `www.jsgpump.com` CNAME for Vercel
   - any Vercel verification TXT/CNAME records
2. Enable Cloudflare Email Routing for `jsgpump.com`.
3. Route `sales@`, `info@`, `rfq@`, `support@`, `admin@`, and optional catch-all to the `jsgpump-mail` Worker.
4. Configure Resend for outbound mail and set its webhook to:

```text
https://mail.jsgpump.com/api/webhooks
```

## R2 note

R2 bucket creation failed because R2 is not enabled in the current Cloudflare account. The current deployment works without R2 and uses KV-backed storage. Enable R2 in the Cloudflare Dashboard before adding the `r2` binding for production attachments.
