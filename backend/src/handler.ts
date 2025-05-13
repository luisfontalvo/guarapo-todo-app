export const hello = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hola desde Serverless con TypeScript!" }),
  };
};