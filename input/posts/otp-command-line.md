---
title: "OTP from the command line (AKA ditch your smartphone)"
tags: ["linux", "digital autonomy"]
layout: "pages/post.njk"
category: linux
date: 2024-06-06
---

I'm in the middle of an experiment to ditch my smartphone for a month.

Anyway, i've found new resolve and i'm just using my Nokia dumbphone now, but a problem occurred today at work - how do I manage all my OTP needs? Usually I get a text or open up the Google Authenticator app to get access to systems.

Enter `pass` and `pass otp`.

<!-- excerpt -->

## Command line password managment & OTP

Turns out you can access all your OTP codes from the command line pretty easily if you're using a unix system.

Fire up your terminal, first you need to install `pass`, which is the [standard local password manager](https://www.passwordstore.org/) for unix systems. We need pass in order to use pass otp, which is a pass plugin.

For MacOS you can install using brew:

```console
$ brew install pass
```

Now you need to initialise pass, which uses one of your gpg keys to encrypt the password file on your local machine:

If you don't know how to setup a gpg key, follow [this guide](https://dev.to/zemse/setup-gpg-on-macos-2iib), but it's basically:

```console
$ brew install gpg
```

```console
$ gpg --gen-key
```

Then init pass:

```console
$ pass init "GPG key ID"
```

Now we need to install `pass otp`, [which is an extension](https://formulae.brew.sh/formula/pass-otp) of `pass` and will allow us to get one time passwords for all our logins. You can't have one without the other.

```console
$ brew install pass-otp
```

We also need to install `zbar` (more on that in a moment):

```console
$ brew install zbar
```

Once that's done, we're good to go.

## Setting up your first OTP

When you setup OTP for a website, you get given the QR code for your authenticator app to scan. To setup OTP from the command line we take the following steps:

- Download the QR image
- Use `zbarimg` to decode the URI of the QR code
- Pass the URI to `pass otp`
- OTP generation can now be done locally

First, grab the QR code provided by whatever system you're logging in to, download it and `cd` into the directory with that image.

Decode the QR code URI:

```console
$ zbarimg download.png
```

This will output a URI that looks something like this (using Soundclound QR code as an example)

```
QR-Code:otpauth://totp/SoundCloud?secret={RANDOMALPHANUMERICSTRING}
```

We need to rip everything after `QR-Code:`, so: `otpauth://totp/SoundCloud?secret={RANDOMALPHANUMERICSTRING}`.

We now need to run our OTP command:

```console
$ pass otp add soundcloud
```

`soundcloud` here is the name of our OTP entry for this service.

We will be prompted to add our `otpath:// URI`, add the URI from before.

Done!

Now anytime we are prompted by Soundcloud to add our OTP we simply run:

```console
$ pass otp soundcloud
```

We'll get back a six digit OTP.

You could also automate this process with a shell script, i've created one over [here](https://github.com/JeremyJamesL/shell-scripts/blob/main/2fa-creater.sh).

No smartphone, no problem. This actually has a benefit of not pulling you out of your workflow and being distracted while working / doing whatever.
