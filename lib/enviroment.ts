export const hostEnviroment = () => {
  if (process.env.ENV === 'dev') return 'http://localhost:3000';
  return process.env.HOST;
};
