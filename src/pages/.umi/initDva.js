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
