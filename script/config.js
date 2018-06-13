
(function(window) {
    var u = {};
    u.config = {
        config:{
            isdevelopment:true,
            development:'https://3bi.io/api/index.php/spider/',
            production:'https://3bi.io/api/index.php/spider/',
            loginpower:[],
        },
        md5:{
            md5_brfore:'loveMDN',
            md5_after:'mdn'
        },
        url:function () {
            if(u.config.config.isdevelopment){
                return u.config.config.development;
            } else {
                return u.config.config.production;
            }
        },
        copyright:''
    };
    window.$config = u;
})(window);
