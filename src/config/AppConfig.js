class AppConfig {
    static NAME = 'PWA Application';
    static VERSION = '1.0';
    static USER = null;

    static setTitle(title) {
        document.title = (!title) ? AppConfig.NAME : `${AppConfig.NAME} | ${title}`;
    }

}


export default AppConfig;