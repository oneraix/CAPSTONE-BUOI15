import express from 'express'
import rootRouter from './src/routers/root.router.js'
import handleError from './src/common/helpers/handleError.helper.js';
import cors from 'cors';

const app = express()

app.use(express.static("."));
app.use(express.json());
app.use(cors({origin:'*'}));

app.use(rootRouter)
app.use(handleError)


app.listen(3000, () => {
  console.log(`Example app listening on port 3000`)
})

//-----------khởi tạo mysql trong docker--------------
//docker run -p 3307:3306 --name capstone-express-orm -e MYSQL_ROOT_PASSWORD=1234 -e  -d mysql:latest