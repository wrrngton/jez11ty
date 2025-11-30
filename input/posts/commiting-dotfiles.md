---
title: "Why you should commit dotfiles, and a smart way to do it"
description: "Here is why you should commit your dotfiles, and an easy way to do it."
layout: "pages/post.njk"
tags: ["dotfiles"]
category: dotfiles
date: "2025-11-30"
modified: "2025-11-30"
---

Whether you switch laptops for work, or you have a bunch of devices that you use at home, replicating environments can be a pain if you don't have an automated way to do it.

If you rely heavily on tools that require config files (for me it's vim, taskwarrior, skhd, tmux etc) then having to recreate new config files when a new computer arrives isn't ideal.

So we commit them to version control, of course. But it's not that simple with dotfiles that usually live in our home directory or in the `.config` directory, as these directoried usually contain a bunch of other files we don't want to commit to version control.

To get around this, we can use the power of symlinks.

<!-- excerpt -->

## Using symlinks for dotfile version control

Symlinks are symbolic links that can be thought of pointers to other files or directories that don't duplicate the target symlink's content.

In our case, in our home directory we will create a directory that symlinks to our dotfiles in the home directory.

First create a new directory in your home directory:

```console
mkdir dotfiles
```
We will store all our configs in `~/dotfiles`.

Let's add a few dotfiles to this directory:

```console
cd dotfiles 
touch .vimrc .skhdrc .taskrc .tmux.conf
```
You'll notice we haven't added anything to our home directory. Instead we will create symlinks for each file and point to our home directory:

```console
ln -s ~/dotfiles/.vimrc ~/.vimrc
ln -s ~/dotfiles/.skhdrc ~/.skhdrc
ln -s ~/dotfiles/.taskrc ~/.taskrc
ln -s ~/dotfiles/.tmux.conf ~/.tmux.conf
```
If you `ls -a` in your home directory, you should see the symlink files there. These files can still be read by the programs you are using.

## Commit dotfiles to version control

Now we can just commit the files in `/dotfiles` to version control like we would any other project.

```console
git init
git add . 
git commit -m "first commit"
git remote add origin <remote_url>
git push -u origin main
```
Now, when setting up a new machine, it's just a matter of pulling your repo locally into your `$HOME/dotfiles`, installing the tools and you're back to working in the way you're familiar with.
