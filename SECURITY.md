# Security Policy

## Reporting Security Vulnerabilities

We take the security of the UI Library seriously. If you discover a security vulnerability, please report it responsibly.

### How to Report

**DO NOT** open a public GitHub issue for security vulnerabilities.

Instead, please report security issues to:

- **Email**: security@your-org.com
- **Security Advisory**: Use GitHub's [Security Advisories](https://github.com/your-org/ui-library/security/advisories)

### What to Include

Please include the following information:

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if available)
- Your contact information

### Response Timeline

- **Initial Response**: Within 48 hours
- **Status Update**: Within 7 days
- **Fix Timeline**: Depends on severity (critical issues within 7-14 days)

## Security Best Practices

### For Library Maintainers

#### 1. Dependency Management

- **Audit regularly**:

  ```bash
  npm audit
  npm audit fix
  ```

- **Use Dependabot**: Automatically configured in `.github/dependabot.yml`
- **Review dependency updates**: Don't blindly accept all updates
- **Pin critical dependencies**: Consider exact versions for security-critical packages

#### 2. npm Publishing Security

- **Enable 2FA**: Required for all maintainers

  ```bash
  npm profile enable-2fa auth-and-writes
  ```

- **Use Provenance**: Already configured in `package.json`

  ```json
  {
    "publishConfig": {
      "provenance": true
    }
  }
  ```

- **Publish from CI/CD**: Use GitHub Actions instead of local machines
- **Review before publish**:
  ```bash
  npm pack --dry-run
  ```

#### 3. Code Security

- **TypeScript strict mode**: Catch potential bugs at compile time
- **ESLint rules**: Configured with security-focused rules
- **Input validation**: Always validate and sanitize user inputs
- **XSS Prevention**: React's JSX escapes by default, but be cautious with `dangerouslySetInnerHTML`

#### 4. Access Control

- **Limit npm publishers**: Only trusted maintainers
- **GitHub branch protection**: Required reviews on `main`
- **Secrets management**: Use GitHub Secrets, never commit credentials

### For Library Users

#### 1. Installation

- **Verify package integrity**:

  ```bash
  npm install @your-org/ui-library --check-integrity
  ```

- **Check provenance**:

  ```bash
  npm view @your-org/ui-library --json
  ```

- **Use lock files**: Commit `package-lock.json` or `yarn.lock`

#### 2. Updates

- **Review changelogs**: Before updating versions
- **Test before deploying**: Don't update directly in production
- **Use version ranges carefully**: Consider `~` (patch) or `^` (minor) updates

```json
{
  "dependencies": {
    "@your-org/ui-library": "^1.2.0" // Allows 1.x.x updates
  }
}
```

#### 3. Content Security Policy (CSP)

If using CSP, allow styles from the library:

```html
<meta
  http-equiv="Content-Security-Policy"
  content="style-src 'self' 'unsafe-inline'"
/>
```

_Note: `'unsafe-inline'` is needed for Tailwind CSS. Consider using a build process to extract CSS._

## Known Security Considerations

### 1. Modal Component

- **Focus Trap**: Prevents keyboard navigation outside modal
- **Escape Key**: Always provides a way to close
- **Body Scroll Lock**: Prevents background scrolling

### 2. Input Component

- **Type Validation**: Use appropriate `type` attribute
- **Sanitization**: Library does NOT sanitize input (your responsibility)
- **Error Messages**: Don't expose sensitive information in error messages

### 3. CSS Injection

- **className Prop**: Be cautious with user-provided classNames
- **Style Props**: Not supported to prevent inline style injection

## Dependency Audit

Run regular security audits:

```bash
# Check for vulnerabilities
npm audit

# Fix fixable issues
npm audit fix

# Generate audit report
npm audit --json > audit-report.json
```

### Automated Audits

The CI pipeline runs `npm audit` on every push. Check the [Actions tab](https://github.com/your-org/ui-library/actions) for results.

## Vulnerability Disclosure Timeline

1. **Day 0**: Vulnerability reported
2. **Day 1-2**: Initial triage and response
3. **Day 3-7**: Investigation and fix development
4. **Day 7-14**: Testing and review
5. **Day 14**: Public disclosure and patch release

_Timeline may vary based on severity and complexity._

## Security Hall of Fame

We recognize security researchers who responsibly disclose vulnerabilities:

<!-- Add researchers who report security issues -->

## Supported Versions

| Version | Supported              |
| ------- | ---------------------- |
| 1.x.x   | ✅ Active support      |
| 0.x.x   | ⚠️ Security fixes only |

## Security Updates

Subscribe to security updates:

- **GitHub Watch**: Watch repository for security advisories
- **npm Notifications**: Enable email notifications
- **RSS Feed**: Subscribe to releases

## Compliance

This library aims to comply with:

- **WCAG 2.1 Level AA**: Accessibility standards
- **OWASP Top 10**: Web application security risks
- **npm Security Best Practices**: Package security guidelines

## Additional Resources

- [npm Security Documentation](https://docs.npmjs.com/security)
- [GitHub Security Features](https://github.com/features/security)
- [OWASP React Security](https://owasp.org/www-project-react-security/)
- [Snyk Vulnerability Database](https://snyk.io/vuln/)

## Questions?

For security-related questions (non-vulnerabilities):

- Open a [GitHub Discussion](https://github.com/your-org/ui-library/discussions)
- Email: security@your-org.com

---

**Thank you for helping keep the UI Library secure!**
