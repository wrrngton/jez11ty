---
title: "How to deploy a Flask project to your linux server with Nginx"
layout: "pages/post.njk"
tags: ["flask", "python", "linux"]
category: python
date: "2024-02-03"
modified: "2025-02-03"
---

> This guide is written solely for me, I know there are a lot of tutorials online to do this, but writing this helps solidify my understanding for this exact process. The original guide I used is [here](https://www.digitalocean.com/community/tutorials/how-to-serve-flask-applications-with-gunicorn-and-nginx-on-ubuntu-22-04) and is a very helpful resource

I went through the process of deploying a flask app to a VPS running an Nginx server recently and I wanted to document the process I took.

**The task**: deploy a Flask app to a VPS running Debian 11 and an Nginx server. At the end of this we will be able to go to a subdomain, e.g [flask.jezl.xyz](https://flask-demo.jezl.xyz) and view a running Flask application.

- Build an application locally with Python dependencies in a python virtual environment
- Push the application to a linux server
- Recreate the virtual environment and depencies on the server
- Run the application on the server on a localhost port using Gunicorn
- Create a server process using `systemd` to keep the application running persistently
- Spin up a subdomain using Nginx to server the application

## Building locally

Let's create a new project locally:

```console
mkdir flask-demo && cd flask-demo
```

Create a new file called `app.py`, which will serve as the main entry point to our application.

We will start with a barebones "Hello world" application in Flask.

```console
vim app.py
```

```python
from flask import Flask
app = Flask(__name__)

@app.route("/")
def greet():
    return "<h1>Hello world!</h1>"

if __name__ == "__main__":
    app.run(host="0.0.0.0")
```

`host="0.0.0.0"` listens on any IP addresses.

Now create a [virtual environment](https://docs.python.org/3/library/venv.html) to handle dependencies. Venv allows us to package our Python project with isolated dependencies that won't conflict with global dependencies.

```console
python3 -m venv venv
```

We have to source the virtual environment in order to activate it:

```console
source venv/bin/activate
```

You should now be in the virtual environment.

We will install a few packages that will help us serve our app.

```console
pip install flask gunicorn
```

Flask is obviously the framework we need, while we don't need gunicorn right, installing it now ensures that we can include it in the dependencies we bundle with the project in production.

```console
python3 app.py
```

Run the app and go to [http://127.0.0.1:5000/](http://127.0.0.1:5000/) and you should see your app running.

## Push the application to Linux server

I'll be pushing this app to my server using `rsync`. I assume you can already SSH into a linux server running Nginx and that your html directory is at `/var/www/`.

First close the server with `ctrl + c` and then run

```console
pip freeze > requirements.txt
```

`pip freeze` outputs a list of installed Python packages and their exact versions in the current environment.

Outside of `flask-demo` run the following command:

```console
rsync -rvz --progress --exclude venv flask-demo user@your-remote-server:/var/www/
```

This will upload the project folder into `/var/www/` on the remote server. We skip the `venv` folder because we will build that on the remote server.

## Setup the app on the remote server

Now we have the application on our remote server, we will build and serve the app on our server.

On the server cd into the project folder:

```console
cd /var/www/flask-demo
```

Build and source the virtual environment.

```console
python3 -m venv venv
source venv/bin/activate
```

Your terminal should show something like `(venv) root@your-remote-server:/var/www/flask-demo#` now, meaning the virtual environment is active.

Install dependencies from `requirements.txt`:

```console
pip install -r requirements.txt
```

Now we can open up port `5000` to serve our app from (this is just a temporary measure and we will close the port shortly). This is assuming you are already using [uncomplicated firewall](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-firewall-with-ufw-on-ubuntu)

```console
ufw allow 5000
```

And start the app:

```console
python3 app.py
```

The app should be viewable on [your-server-ip:5000](your-server-ip:5000)

## Configure Gunicorn

Exit the flask server with `ctrl+c` and confirm the app is dead by going back to the URL.

We want to Gunicorn to serve as our interface between our app and our users to allow for multithreading and other cool stuff. Let's test that out really quickly.

```console
gunicorn --bind 0.0.0.0:5000 app:app
```

Here we are starting Gunicorn and binding it to port `5000` so it's available to the outside world. `app:app` refers to the file that is out app entry point (`app.py`) and the `app` function itself within the file (basically our Flask app).

Open back up the URL and you should still see the application running.

Now we've confirmed it's working, let's close the Gunicorn process `ctrl -c` and exit the virtual environment with `deactivate`.

Remove the firewall rule as we don't want it open anymore, and we should always keep ports closed for server security purposes.

## Setup systemd process to serve our app

This is the most complicated process of serving our app, and to be honest, when I first ran into this I was unfamiliar with systemd in linux, but it's been good to get exposure to it.

Essentially, systemd is a service manager that can start up user processes, such as serving out app. This ensures that the serving of our app is managed by our server's service manager. If the server reboots, then systemd will take care of rebooting our application for us.

Systemd processes are stored in `.service` files that live in `/etc/systemd/system`. Let's create a new service for our app:

```console
vim /etc/systemd/system/flaskdemo.service
```

Add the following to the file:

```text
[Unit]
Description=Flask demo app service
After=network.target

[Service]
User=root
Group=www-data
WorkingDirectory=/var/www/flask-demo
Environment="PATH=/var/www/flask-demo/venv/bin"
ExecStart=/var/www/flask-demo/venv/bin/gunicorn --workers 3 --bind unix:flaskdemo.sock -m 007 app:app

[Install]
WantedBy=multi-user.target
```

Now if we start the service and check it's status:

```console
systemctl start flaskdemo
systemctl enable flaskdemo
systemctl status flaskdemo
```

We should see the following output:

```console
● flaskdemo.service - Flask demo app service
     Loaded: loaded (/etc/systemd/system/flaskdemo.service; enabled; vendor preset: enabled)
     Active: active (running) since Wed 2025-03-26 16:03:52 UTC; 1min ago
```

## Serve the app to the world on your own domain

Now we have systemd serving our project continuously, even on system reboot we can serve our app to the world using a our domain.

Create a new nginx config file:

```console
$ vim /etc/nginx/sites-avaialable/flaskdemo
```

And add the following to the file:

```text
server {
	listen 80;
	listen [::]:80;

	server_name flaskdemo.yourdomain.com www.flaskdemo.yourdomain.com;

	location / {
		include proxy_params;
		proxy_pass http://unix:/var/www/flask-demo/flaskdemo.sock;
	}
}
```

Here we are listening for incoming requests on the standard TCP port, and then proxying the request on a unix domain socket (`unix:` is the directive for this). `/var/www/flask-demo/flaskdemo.sock` is in our project file and is th socket that the server is listening on.

Check server config is ok and restart the server:

```console
nginx -t
systemctl reload nginx
```

Go to http://flaskdemo.yourdomain.com and if everything went well then you should see your application!

To serve the app over https run:

```console
certbot --nginx -d flaskdemo.yourdomain.com -d www.flaskdemo.yourdomain.com
```

To install the right SSL certificates.

That's it 🎉. You'll notice that even if you restart your server now, systemd will reboot the application.

I hope you found this informative and helpful.
