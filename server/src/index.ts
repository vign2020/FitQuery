import app from "./server";

const PORT = Number(process.env.PORT) || 5000;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT} !`);
});
