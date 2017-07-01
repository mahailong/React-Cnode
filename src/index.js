import dva from 'dva';
import createLoading from 'dva-loading';

// 1. Initialize
const app = dva();

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(require('./models/home'));
app.model(require('./models/article'));
app.model(require('./models/login'));
app.model(require('./models/message'));
app.model(require('./models/user'));
app.model(require('./models/publish'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
