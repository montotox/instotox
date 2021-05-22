# Instotox

Visit the [Demo](https://instotox.netlify.app).

## Starting 🚀

_This is instructions permit you to obtain a copy for this project._

See **Deployment** to know how you run the project.

### Pre-requirements 📋

1. Clone this project
```
$ git clone https://github.com/montotox/instotox/
```
2. Install Node.
```
$ sudo apt-get install -y nodejs
```

### Installation 🔧

1. Enter in your folder .../instotox/server/.
2. Execute **npm run dev** for run the demon.
3. Enter in your folder .../instotox/client/.
4. In new terminal execute **npm start** for run the frontend.
5. You need the instance S3 in AWS and make a .env file with your credentials.
6. You need Mongo Atlas and add the credentials in the .env file to config mongoose.
7. Change the uri in client/config.js file.
```
const httpLink = createUploadLink({
  uri: "https://localhost:3000/",
});
```

## Execute test ⚙️

_You can test the conections trying login or signup a new user._

If you can't you should see errors in the terminal where you running your server.

### Posible problems 🔩

_Check your credentials._

- Bad credentials in your new .env file.
- Check that you are running the server and the client.

## Deployment 📦

_You can deploy the frontend in Netlify and the backend in Heroku._

1. Add the server folder in Heroku.
2. Change the uri in client/config.js file.
```
const httpLink = createUploadLink({
  uri: "https://{yourServer}.herokuapp.com/",
});
```
3. In .../instotos/client/ run ***npm build***.
4. Add the client/build folder in Netlify.
5. Enjoy your Instotox!🎉

## Autors ✒️

- **Ricardo Coronel** - _Initial work / Documentation_ - [montotox](https://github.com/montotox)

## Licencia 📄

Este proyecto está bajo la Licencia (GPL) - mira el archivo [LICENSE.md](LICENSE.md) para detalles

## Expressions of gratitude 🎁

- Comment with others about this project 📢
- Invite a beer 🍺 or a coffe ☕.
- Give thanks publicly 🤓.
- I'm coding with ❤️.

---
