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

app.model({ namespace: 'global', ...(require('/home/share/src/models/global.js').default) });
app.model({ namespace: 'list', ...(require('/home/share/src/models/list.js').default) });
app.model({ namespace: 'project', ...(require('/home/share/src/models/project.js').default) });
app.model({ namespace: 'setting', ...(require('/home/share/src/models/setting.js').default) });
app.model({ namespace: 'user', ...(require('/home/share/src/models/user.js').default) });
app.model({ namespace: 'login', ...(require('/home/share/src/pages/User/models/login.js').default) });
app.model({ namespace: 'register', ...(require('/home/share/src/pages/User/models/register.js').default) });
app.model({ namespace: 'gappmanage', ...(require('/home/share/src/pages/gProject/models/gappmanage.js').default) });
app.model({ namespace: 'gproline', ...(require('/home/share/src/pages/gProject/models/gproline.js').default) });
app.model({ namespace: 'gdevice', ...(require('/home/share/src/pages/gResource/models/gdevice.js').default) });
app.model({ namespace: 'ghardware', ...(require('/home/share/src/pages/gResource/models/ghardware.js').default) });
app.model({ namespace: 'gidc', ...(require('/home/share/src/pages/gResource/models/gidc.js').default) });
app.model({ namespace: 'gresource', ...(require('/home/share/src/pages/gPower/models/gresource.js').default) });
app.model({ namespace: 'grole', ...(require('/home/share/src/pages/gPower/models/grole.js').default) });
app.model({ namespace: 'guser', ...(require('/home/share/src/pages/gPower/models/guser.js').default) });
app.model({ namespace: 'user', ...(require('/home/share/src/pages/gPower/models/user.js').default) });
app.model({ namespace: 'error', ...(require('/home/share/src/pages/Exception/models/error.js').default) });
app.model({ namespace: 'geographic', ...(require('/home/share/src/pages/Account/Settings/models/geographic.js').default) });
