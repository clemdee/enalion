# enalion

Source code of [enalion.fr](https://enalion.fr)

## Installation

```sh
git clone https://github.com/clemdee/enalion.git
cd enalion
pnpm install

# In case your repo is missing the LFS files, run
# git lfs pull
```

### Start dev server

```sh
pnpm dev

# Start and expose host to LAN for mobile testing
# pnpm dev --host
```

## Build for Production

```sh
pnpm build

# Test the build
# pnpm preview
```
