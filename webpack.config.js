const path = require('path');
const Encore = require('@symfony/webpack-encore');

if (!Encore.isRuntimeEnvironmentConfigured()) {
  Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

// Sortie dans Resources/public du bundle pour que assets:install copie vers public/bundles/keyboardmanfilemanager
Encore
  .setOutputPath('src/Resources/public/build/')
  .setPublicPath('/bundles/keyboardmanfilemanager/build')
  .setManifestKeyPrefix('build/')
  .addEntry('manager', './src/Resources/assets/js/manager.entry.js')
  .addEntry('picker', './src/Resources/assets/js/picker.entry.js')
  .disableSingleRuntimeChunk()
  .cleanupOutputBeforeBuild()
  .enableBuildNotifications(false)
  .enableSourceMaps(!Encore.isProduction())
  // Pas de versioning pour que le Twig puisse référencer manager.css / manager.js directement
  .enableVersioning(false)
  // React : support JSX
  .enableReactPreset();

module.exports = Encore.getWebpackConfig();
