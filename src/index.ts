import { app } from './app';
import config from './config';

const PORT = 8000;

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}!`));
