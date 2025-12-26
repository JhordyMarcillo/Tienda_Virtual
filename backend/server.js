const app = require("./src/app");
const env = require('./src/config/env.js');

const PORT = process.env.PORT || env.PORT;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
