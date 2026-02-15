# Publishing Guide

This guide walks you through the process of publishing a new version of the UI Library to npm.

## Prerequisites

1. **npm Account**: Create an account at [npmjs.com](https://www.npmjs.com/)
2. **npm 2FA**: Enable two-factor authentication for additional security
3. **Repository Access**: You must be a maintainer with publish rights
4. **npm Token**: Set up `NPM_TOKEN` secret in GitHub repository settings

## Pre-Publish Checklist

Before publishing, ensure:

- [ ] All tests pass (`npm test`)
- [ ] Code is linted (`npm run lint`)
- [ ] TypeScript compiles (`npm run typecheck`)
- [ ] Build succeeds (`npm run build`)
- [ ] Storybook builds (`npm run build-storybook`)
- [ ] CHANGELOG.md is updated
- [ ] Version is bumped in package.json
- [ ] All changes are committed

## Versioning

This project follows [Semantic Versioning](https://semver.org/):

- **MAJOR** (1.0.0): Breaking changes
- **MINOR** (0.1.0): New features (backward compatible)
- **PATCH** (0.0.1): Bug fixes (backward compatible)

### Version Bump

Use npm's built-in versioning:

```bash
# Patch release (0.1.0 → 0.1.1)
npm version patch

# Minor release (0.1.1 → 0.2.0)
npm version minor

# Major release (0.2.0 → 1.0.0)
npm version major
```

Or manually update `package.json`:

```json
{
  "version": "1.2.3"
}
```

## Publishing Methods

### Method 1: Automated (Recommended)

The library uses GitHub Actions for automated publishing.

1. **Update version** using `npm version`
2. **Push the tag** to GitHub:

```bash
npm version minor  # Creates git tag automatically
git push origin main --follow-tags
```

3. **GitHub Actions** will automatically:
   - Run tests
   - Build the library
   - Publish to npm with provenance

### Method 2: Manual Publishing

If you need to publish manually:

1. **Ensure you're logged in to npm**:

```bash
npm whoami
# If not logged in:
npm login
```

2. **Run the full verification**:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

3. **Publish with provenance**:

```bash
npm publish --access public --provenance
```

## Post-Publish Steps

After successful publishing:

1. **Verify the package** on [npmjs.com](https://www.npmjs.com/package/@your-org/ui-library)
2. **Test installation** in a fresh project:

```bash
mkdir test-install
cd test-install
npm init -y
npm install @your-org/ui-library
```

3. **Update documentation** if needed
4. **Announce the release** on relevant channels
5. **Create GitHub Release**:
   - Go to [Releases](https://github.com/your-org/ui-library/releases)
   - Create new release from tag
   - Add release notes

## Package Provenance

The library uses [npm provenance](https://docs.npmjs.com/generating-provenance-statements) for supply chain security.

### Benefits

- Verifiable build process
- Links package to source code
- Increases trust in the package

### Requirements

- Publish from GitHub Actions
- Use `--provenance` flag
- OIDC token permission in workflow

This is already configured in `.github/workflows/publish.yml`.

## npm 2FA

For additional security, enable 2FA:

```bash
npm profile enable-2fa auth-and-writes
```

This requires OTP for:

- Publishing packages
- Changing package settings
- Managing team members

## Troubleshooting

### "You do not have permission to publish"

- Ensure you're logged in: `npm whoami`
- Check organization membership
- Verify package name is available
- Check npm access level

### "Version already exists"

- Bump version in package.json
- Use `npm version` command
- Check existing versions: `npm view @your-org/ui-library versions`

### Build Failures

- Clean and rebuild: `rm -rf dist && npm run build`
- Check for TypeScript errors
- Verify all dependencies are installed

### GitHub Action Failures

- Check NPM_TOKEN secret is set
- Verify workflow permissions
- Check Node version compatibility

## Distribution Files

After build, the following files are published:

```
dist/
├── index.es.js       # ES module
├── index.cjs.js      # CommonJS module
├── index.d.ts        # Type declarations
├── index.d.ts.map    # Source map for types
└── style.css         # Component styles
```

## Package.json Configuration

Key fields for publishing:

```json
{
  "name": "@your-org/ui-library",
  "version": "0.1.0",
  "main": "./dist/index.cjs.js",
  "module": "./dist/index.es.js",
  "types": "./dist/index.d.ts",
  "files": ["dist", "README.md", "LICENSE"],
  "publishConfig": {
    "access": "public",
    "provenance": true
  }
}
```

## Security Best Practices

1. ✅ Enable npm 2FA
2. ✅ Use provenance
3. ✅ Publish from CI/CD
4. ✅ Audit dependencies regularly (`npm audit`)
5. ✅ Use Dependabot for updates
6. ✅ Review package before publishing (`npm pack`)

## Dry Run

Test the publish process without actually publishing:

```bash
npm publish --dry-run
```

This shows what would be published without sending to npm.

## Unpublishing

⚠️ **Use with extreme caution!**

You can unpublish within 72 hours:

```bash
npm unpublish @your-org/ui-library@1.0.0
```

After 72 hours, you cannot unpublish (npm policy).

## Beta Releases

For pre-release versions:

```bash
# Version as beta
npm version 1.0.0-beta.1

# Publish with beta tag
npm publish --tag beta

# Users install with:
npm install @your-org/ui-library@beta
```

## Getting Help

- npm documentation: https://docs.npmjs.com/
- GitHub Actions docs: https://docs.github.com/en/actions
- Open an issue: https://github.com/your-org/ui-library/issues
