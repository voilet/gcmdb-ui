import { Component } from 'react';
import dva from 'dva';
import createLoading from 'dva-loading';

let app = dva({
  history: window.g_history,
  
});

window.g_app = app;
app.use(createLoading());

app.model({ namespace: 'global', ...(require('/data/golang/src/gcmdbUi/src/models/global.js').default) });
app.model({ namespace: 'list', ...(require('/data/golang/src/gcmdbUi/src/models/list.js').default) });
app.model({ namespace: 'project', ...(require('/data/golang/src/gcmdbUi/src/models/project.js').default) });
app.model({ namespace: 'setting', ...(require('/data/golang/src/gcmdbUi/src/models/setting.js').default) });
app.model({ namespace: 'user', ...(require('/data/golang/src/gcmdbUi/src/models/user.js').default) });
app.model({ namespace: 'login', ...(require('/data/golang/src/gcmdbUi/src/pages/User/models/login.js').default) });
app.model({ namespace: 'register', ...(require('/data/golang/src/gcmdbUi/src/pages/User/models/register.js').default) });
app.model({ namespace: 'gdevice', ...(require('/data/golang/src/gcmdbUi/src/pages/gResource/models/gdevice.js').default) });
app.model({ namespace: 'ghardware', ...(require('/data/golang/src/gcmdbUi/src/pages/gResource/models/ghardware.js').default) });
app.model({ namespace: 'gidc', ...(require('/data/golang/src/gcmdbUi/src/pages/gResource/models/gidc.js').default) });
app.model({ namespace: 'gappmanage', ...(require('/data/golang/src/gcmdbUi/src/pages/gProject/models/gappmanage.js').default) });
app.model({ namespace: 'gproline', ...(require('/data/golang/src/gcmdbUi/src/pages/gProject/models/gproline.js').default) });
app.model({ namespace: 'error', ...(require('/data/golang/src/gcmdbUi/src/pages/Exception/models/error.js').default) });
app.model({ namespace: 'geographic', ...(require('/data/golang/src/gcmdbUi/src/pages/Account/Settings/models/geographic.js').default) });

class DvaContainer extends Component {
  render() {
    app.router(() => this.props.children);
    return app.start()();
  }
}

export default DvaContainer;
