import React from 'react';
import { Router, Route } from 'dva/router';
import Home from './routes/home';
import Article from './routes/article';
import User from './routes/user';
import Login from './routes/login';
import Publish from './routes/publish';
import Message from './routes/message';
import About from './routes/about';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={Home} />
      <Route path="/article/:id" component={Article} />
      <Route path="/user/:name" component={User} />
      <Route path="/login" component={Login} />
      <Route path="/publish(/:id)" component={Publish} />
      <Route path="/message" component={Message} />
      <Route path="/about" component={About} />
    </Router>
  );
}

export default RouterConfig;
