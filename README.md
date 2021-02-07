# Node-JWT-Auth-server
A Nodejs API that implements JSON Web Token Authentication.

# Security Features:
1) JSON Web Token Cookie authentication.
2) Hashed passwords.
3) Checking logged in status at every page route.
4) Logging out users automatically if suspicious activity detected by checking cookies.
5) Session period of 24 hrs. You won't have to login even if you close the browser. However, the user has to login again after the session period expires.

# HTTP Requests:
<b>post /login</b>
<pre>
valid:
{
	"user": "601ead5d230dde3cc8efde29"
}

not valid password:
{
    "errors": {
        "email": "",
        "password": "This password is incorrect"
    }
}

not valid user:
{
    "errors": {
        "email": "This email is not registered",
        "password": ""
    }
}
</pre>
<b>post /signup</b>
<pre>
min pass len:
{
    "errors": {
        "email": "",
        "password": "Minimum password length is 6 characters"
    }
}

valid:
{
    "user": "601f89c54b75d227902b547e"
}


invalid/already regis:
{
    "errors": {
        "email": "This email is already registered.",
        "password": ""
    }
}
</pre>
<b>get /logout</b>

  user redirected to home

<b>Suspicious activity or cookie invalid</b>

  user redirected to /login
