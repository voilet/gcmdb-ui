import dva from 'dva';
import createLoading from 'dva-loading';

const runtimeDva = window.g_plugins.mergeConfig('dva');
let app = dva({
  history: window.g_history,
  
  ...(runtimeDva.config || {}),
});

window.g_app = app;
app.use(createLoading());
(runtimeDva.plugins || []).forEach(plugin => {
  app.use(plugin);
});

app.model({ namespace: 'global', ...(require('/Users/voilet/antd/gcmdbUi/src/models/global.js').default) });
app.model({ namespace: 'list', ...(require('/Users/voilet/antd/gcmdbUi/src/models/list.js').default) });
app.model({ namespace: 'project', ...(require('/Users/voilet/antd/gcmdbUi/src/models/project.js').default) });
app.model({ namespace: 'setting', ...(require('/Users/voilet/antd/gcmdbUi/src/models/setting.js').default) });
app.model({ namespace: 'user', ...(require('/Users/voilet/antd/gcmdbUi/src/models/user.js').default) });
app.model({ namespace: 'login', ...(require('/Users/voilet/antd/gcmdbUi/src/pages/User/models/login.js').default) });
app.model({ namespace: 'register', ...(require('/Users/voilet/antd/gcmdbUi/src/pages/User/models/register.js').default) });
app.model({ namespace: 'gdevice', ...(require('/Users/voilet/antd/gcmdbUi/src/pages/gResource/models/gdevice.js').default) });
app.model({ namespace: 'ghardware', ...(require('/Users/voilet/antd/gcmdbUi/src/pages/gResource/models/ghardware.js').default) });
app.model({ namespace: 'gidc', ...(require('/Users/voilet/antd/gcmdbUi/src/pages/gResource/models/gidc.js').default) });
app.model({ namespace: 'gappmanage', ...(require('/Users/voilet/antd/gcmdbUi/src/pages/gProject/models/gappmanage.js').default) });
app.model({ namespace: 'gproline', ...(require('/Users/voilet/antd/gcmdbUi/src/pages/gProject/models/gproline.js').default) });
app.model({ namespace: 'gresource', ...(require('/Users/voilet/antd/gcmdbUi/src/pages/gPower/models/gresource.js').default) });
app.model({ namespace: 'grole', ...(require('/Users/voilet/antd/gcmdbUi/src/pages/gPower/models/grole.js').default) });
app.model({ namespace: 'guser', ...(require('/Users/voilet/antd/gcmdbUi/src/pages/gPower/models/guser.js').default) });
app.model({ namespace: 'user', ...(require('/Users/voilet/antd/gcmdbUi/src/pages/gPower/models/user.js').default) });
app.model({ namespace: 'error', ...(require('/Users/voilet/antd/gcmdbUi/src/pages/Exception/models/error.js').default) });
app.model({ namespace: 'geographic', ...(require('/Users/voilet/antd/gcmdbUi/src/pages/Account/Settings/models/geographic.js').default) });
