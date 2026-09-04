# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| main    | :white_check_mark: |
| others  | :x:                |

## Reporting a Vulnerability

**Please do not open public GitHub issues for security vulnerabilities.**

Email security concerns to: **mahessatransholiday@gmail.com**

Include:
- Description of the issue
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

We will respond within 48 hours and aim to patch critical issues within 7 days.

## Security Measures

- ✅ Cloudflare Turnstile on admin login
- ✅ Supabase Row Level Security (RLS) on all tables
- ✅ SECURITY DEFINER functions locked to trigger-only execution
- ✅ `search_path = public` on all database functions
- ✅ Push protection enabled (blocks secrets in commits)
- ✅ Dependabot alerts + auto security updates
- ✅ CodeQL static analysis on every push
- ✅ 2FA required on admin accounts
