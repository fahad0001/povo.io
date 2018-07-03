module.exports = function (shipit) {
  require('shipit-deploy')(shipit)
  require('shipit-yarn')(shipit)
  require('shipit-shared')(shipit)
  // require('shipit-pm2')(shipit)

  shipit.initConfig({
    default: {
      workspace: 'tmp/shipit',
      deployTo: '/home/deploy/povo',
      repositoryUrl: 'https://gitlab.com/surkov/povo',      
      ignores: ['.git', 'node_modules','tmp','.DS_Store','bower_components', 'out', 'dist'],
      rsync: ['--del'],
      keepReleases: 5,
      key: '~/.ssh/id_rsa',
      shallowClone: true,

      // shared: {
      //   overwrite: true,
      //   files: [
      //     'env-config.js',
      //     {
      //       path: 'env-config.js',
      //       overwrite: false,
      //       chmod: '755'
      //     }
      //   ]
      // }
    },

    production: {
      servers: 'deploy@138.197.35.62',
      branch: 'production'
    },
    staging: {
      servers: 'deploy@78.155.217.67',
      branch: 'master'
    }

  })

  shipit.task('build', function () {
    shipit.remote('cd ' + shipit.config.deployTo + '/current && ' + 'env NODE_ENV=\'production\' yarn run build', function () {
      shipit.emit('built')
    })
  })

  shipit.on('published', function () {
    shipit.start('build')
  })

}
