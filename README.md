# ASUS Router CLI

A cli to control a local ASUS router.

## Install

Clone the project, then from the project directory run:

```sh
yarn setup
```

Add login credentials as environment variables to your `.zshrc` or other shell profile:

```sh
# ASUS Router Login Credentials
export ASUS_USERNAME=admin
export ASUS_PASSWORD=admin
```

## Usage

Toggle Wifi

```sh
asus on   # turns wifi on
```

```sh
asus off  # turns wifi off
```

Made with ❤️ by Matt Black
